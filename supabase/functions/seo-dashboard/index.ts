import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");

const TRACKED_URLS = [
  "https://crosspath.site/",
  "https://crosspath.site/guides",
  "https://crosspath.site/guides/erasmus-germany",
  "https://crosspath.site/guides/work-visa-germany",
  "https://crosspath.site/guides/digital-nomad-spain",
  "https://crosspath.site/move",
  "https://crosspath.site/move/poland-to-germany-study",
  "https://crosspath.site/move/india-to-germany-work",
  "https://crosspath.site/move/usa-to-spain-nomad",
  "https://crosspath.site/move/uk-to-portugal-work",
  "https://crosspath.site/move/ukraine-to-poland-refuge",
  "https://crosspath.site/move/nigeria-to-canada-study",
];

const TARGET = new URL("https://crosspath.site/");

const gatewayHeaders = {
  Authorization: `Bearer ${LOVABLE_API_KEY}`,
  "X-Connection-Api-Key": GSC_KEY ?? "",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

async function gcs(path: string, init?: RequestInit) {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: { ...gatewayHeaders, "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const details = await res.text();
    console.error(`Search Console request failed [${res.status}] ${path}: ${details}`);
    throw new Error(`[${res.status}] ${details}`);
  }
  return res.json();
}

async function resolveSite(selected?: string) {
  const data = await gcs("/webmasters/v3/sites");
  const entries: { siteUrl: string; permissionLevel?: string }[] = data.siteEntry ?? [];
  const matches = entries.filter(
    (e) => e.permissionLevel !== "siteUnverifiedUser" && coversTarget(e.siteUrl, TARGET),
  );
  if (selected) {
    const hit = matches.find((m) => m.siteUrl === selected);
    if (!hit) throw new Error("Selected property is not verified for this site");
    return { status: "selected" as const, siteUrl: hit.siteUrl };
  }
  if (matches.length === 0) throw new Error("No verified Search Console property covers crosspath.site");
  if (matches.length === 1) return { status: "selected" as const, siteUrl: matches[0].siteUrl };
  return { status: "selection_required" as const, candidates: matches.map((m) => m.siteUrl) };
}

function isoDaysAgo(days: number) {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY || !GSC_KEY) return json({ error: "Search Console connection is not configured" }, 500);

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const selectedSiteUrl = typeof body.siteUrl === "string" ? body.siteUrl : undefined;
    const refresh = body.refresh !== false;

    const resolution = await resolveSite(selectedSiteUrl);
    if (resolution.status === "selection_required") return json(resolution, 409);
    const siteUrl = resolution.siteUrl;
    const encoded = encodeURIComponent(siteUrl);

    // 28-day totals per page
    const perPage = await gcs(`/webmasters/v3/sites/${encoded}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDaysAgo(30),
        endDate: isoDaysAgo(2),
        dimensions: ["page"],
        rowLimit: 500,
      }),
    });

    // daily site totals for the trend chart
    const daily = await gcs(`/webmasters/v3/sites/${encoded}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDaysAgo(30),
        endDate: isoDaysAgo(2),
        dimensions: ["date"],
        rowLimit: 60,
      }),
    });

    const topQueries = await gcs(`/webmasters/v3/sites/${encoded}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: isoDaysAgo(30),
        endDate: isoDaysAgo(2),
        dimensions: ["query"],
        rowLimit: 15,
      }),
    });

    const metricsByPage = new Map<string, { clicks: number; impressions: number; ctr: number; position: number }>();
    for (const row of perPage.rows ?? []) {
      const key = (row.keys?.[0] ?? "").replace(/\/$/, "") || "https://crosspath.site/";
      metricsByPage.set(key, {
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      });
    }

    const pages = [] as Record<string, unknown>[];
    for (const url of TRACKED_URLS) {
      let inspection: Record<string, unknown> = {};
      try {
        const res = await gcs("/v1/urlInspection/index:inspect", {
          method: "POST",
          body: JSON.stringify({ inspectionUrl: url, siteUrl }),
        });
        inspection = res?.inspectionResult?.indexStatusResult ?? {};
      } catch (e) {
        console.error(`Inspection failed for ${url}: ${(e as Error).message}`);
      }
      const key = url.replace(/\/$/, "") || url;
      const m = metricsByPage.get(key) ?? metricsByPage.get(url) ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      pages.push({
        url,
        verdict: inspection.verdict ?? null,
        coverage_state: inspection.coverageState ?? null,
        indexing_state: inspection.indexingState ?? null,
        google_canonical: inspection.googleCanonical ?? null,
        last_crawl_time: inspection.lastCrawlTime ?? null,
        ...m,
      });
    }

    if (refresh) {
      const today = new Date().toISOString().slice(0, 10);
      const { error: upsertErr } = await admin.from("seo_url_snapshots").upsert(
        pages.map((p) => ({
          url: p.url,
          captured_on: today,
          verdict: p.verdict,
          coverage_state: p.coverage_state,
          indexing_state: p.indexing_state,
          google_canonical: p.google_canonical,
          last_crawl_time: p.last_crawl_time,
          clicks: Math.round(Number(p.clicks) || 0),
          impressions: Math.round(Number(p.impressions) || 0),
          ctr: Number(p.ctr) || 0,
          position: Number(p.position) || null,
        })),
        { onConflict: "url,captured_on" },
      );
      if (upsertErr) console.error("Snapshot upsert failed:", upsertErr.message);
    }

    return json({
      status: "ok",
      siteUrl,
      range: { start: isoDaysAgo(30), end: isoDaysAgo(2) },
      pages,
      daily: (daily.rows ?? []).map((r: Record<string, never[]>) => ({
        date: r.keys?.[0],
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        position: r.position ?? 0,
      })),
      queries: (topQueries.rows ?? []).map((r: Record<string, never[]>) => ({
        query: r.keys?.[0],
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        position: r.position ?? 0,
      })),
    });
  } catch (e) {
    const message = (e as Error).message;
    console.error("seo-dashboard error:", message);
    return json({ error: message }, 500);
  }
});
