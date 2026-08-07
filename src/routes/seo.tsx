import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-role";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { Activity, Loader2, Lock, RefreshCw, Search, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/seo")({
  head: () => ({
    meta: [
      { title: "Search Console dashboard — Crosspath.move" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SeoPage,
});

type PageRow = {
  url: string;
  verdict: string | null;
  coverage_state: string | null;
  indexing_state: string | null;
  google_canonical: string | null;
  last_crawl_time: string | null;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type Payload = {
  siteUrl: string;
  range: { start: string; end: string };
  pages: PageRow[];
  daily: { date: string; clicks: number; impressions: number; position: number }[];
  queries: { query: string; clicks: number; impressions: number; position: number }[];
};

type Snapshot = {
  url: string;
  captured_on: string;
  verdict: string | null;
  clicks: number;
  impressions: number;
  position: number | null;
};

const label = (url: string) => url.replace("https://crosspath.site", "") || "/";

function verdictTone(verdict: string | null, coverage: string | null) {
  if (verdict === "PASS") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
  if (coverage?.toLowerCase().includes("not found") || verdict === "FAIL")
    return "bg-destructive/10 text-destructive border-destructive/30";
  return "bg-amber-500/10 text-amber-600 border-amber-500/30";
}

function Stat({ label: l, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{l}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Sparkline({ data }: { data: { date: string; clicks: number; impressions: number }[] }) {
  if (data.length < 2) return <p className="text-xs text-muted-foreground">Not enough days of data yet.</p>;
  const max = Math.max(1, ...data.map((d) => d.impressions));
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${40 - (d.impressions / max) * 36}`)
    .join(" ");
  const clickMax = Math.max(1, ...data.map((d) => d.clicks));
  const clickPoints = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${40 - (d.clicks / clickMax) * 36}`)
    .join(" ");
  return (
    <div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-24 w-full">
        <polyline points={points} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <polyline points={clickPoints} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground font-mono">
        <span>{data[0].date}</span>
        <span>impressions · clicks</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );
}

function SeoPage() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [data, setData] = useState<Payload | null>(null);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [candidates, setCandidates] = useState<string[] | null>(null);
  const [siteUrl, setSiteUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  const load = useCallback(
    async (selected?: string) => {
      setBusy(true);
      setError(null);
      const { data: res, error: err } = await supabase.functions.invoke("seo-dashboard", {
        body: { refresh: true, siteUrl: selected },
      });
      if (err) {
        let details = err.message;
        const ctx = (err as { context?: Response }).context;
        if (ctx && typeof ctx.text === "function") {
          const raw = await ctx.text();
          try {
            const parsed = JSON.parse(raw);
            if (parsed.status === "selection_required") {
              setCandidates(parsed.candidates);
              setBusy(false);
              return;
            }
            details = parsed.error ?? raw;
          } catch {
            details = raw || details;
          }
        }
        setError(details);
      } else {
        setData(res as Payload);
        setCandidates(null);
      }

      const { data: snaps } = await supabase
        .from("seo_url_snapshots")
        .select("url, captured_on, verdict, clicks, impressions, position")
        .order("captured_on", { ascending: false })
        .limit(400);
      setHistory((snaps as Snapshot[]) ?? []);
      setBusy(false);
    },
    [],
  );

  useEffect(() => {
    if (roleLoading) return;
    if (!isAdmin) {
      setBusy(false);
      return;
    }
    void load();
  }, [isAdmin, roleLoading, load]);

  if (authLoading || roleLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center px-6 py-24 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!isAdmin) {
    return (
      <AppShell>
        <PageHeader eyebrow="Restricted" title="No access" subtitle="This area is limited to the site operator." />
        <div className="px-6 pb-16">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Lock className="h-5 w-5 text-primary" strokeWidth={1.8} />
            <p className="mt-3 text-sm text-muted-foreground">
              {user
                ? "Your account does not have administrator permissions."
                : "Sign in with an administrator account to continue."}
            </p>
            <Link to={user ? "/" : "/auth"} className="mt-4 inline-block text-sm text-primary hover:underline">
              {user ? "Back to the planner" : "Go to sign in"}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const totals = data?.pages.reduce(
    (acc, p) => ({
      clicks: acc.clicks + p.clicks,
      impressions: acc.impressions + p.impressions,
      indexed: acc.indexed + (p.verdict === "PASS" ? 1 : 0),
    }),
    { clicks: 0, impressions: 0, indexed: 0 },
  );

  const daysTracked = new Set(history.map((h) => h.captured_on)).size;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Operator only"
        title="Search visibility"
        subtitle="Google Search Console performance and indexing status for the guide and route pages."
      />
      <div className="space-y-6 px-6 pb-16">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            {data ? `${data.siteUrl} · ${data.range.start} → ${data.range.end}` : "Not loaded"}
          </p>
          <button
            onClick={() => void load(siteUrl)}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Refresh
          </button>
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{error}</p>
        )}

        {candidates && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-foreground">Several verified properties cover this site. Pick one:</p>
            <div className="mt-3 flex flex-col gap-2">
              {candidates.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSiteUrl(c);
                    void load(c);
                  }}
                  className="rounded-xl border border-border px-3 py-2 text-left text-xs text-foreground hover:bg-accent font-mono"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {busy && !data && (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {data && totals && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Clicks · 28d" value={totals.clicks} />
              <Stat label="Impressions · 28d" value={totals.impressions} />
              <Stat label="Indexed pages" value={`${totals.indexed}/${data.pages.length}`} />
              <Stat label="Snapshot days" value={daysTracked} hint="History stored for trends" />
            </div>

            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <h2 className="text-sm font-semibold text-foreground">Daily performance</h2>
              </div>
              <div className="mt-4">
                <Sparkline data={data.daily} />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <h2 className="text-sm font-semibold text-foreground">Pages</h2>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                      <th className="pb-2 pr-3">Page</th>
                      <th className="pb-2 pr-3">Status</th>
                      <th className="pb-2 pr-3 text-right">Clicks</th>
                      <th className="pb-2 pr-3 text-right">Impr.</th>
                      <th className="pb-2 text-right">Pos.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pages.map((p) => {
                      const prev = history.find(
                        (h) => h.url === p.url && h.captured_on < new Date().toISOString().slice(0, 10),
                      );
                      const delta = prev ? p.impressions - prev.impressions : null;
                      return (
                        <tr key={p.url} className="border-t border-border/60">
                          <td className="py-2 pr-3">
                            <span className="text-foreground font-mono">{label(p.url)}</span>
                            <span className="block text-[10px] text-muted-foreground">
                              {p.coverage_state ?? "Unknown to Google"}
                              {p.last_crawl_time
                                ? ` · crawled ${new Date(p.last_crawl_time).toISOString().slice(0, 10)}`
                                : ""}
                            </span>
                          </td>
                          <td className="py-2 pr-3">
                            <span
                              className={`inline-block rounded-full border px-2 py-0.5 text-[10px] ${verdictTone(p.verdict, p.coverage_state)}`}
                            >
                              {p.verdict === "PASS" ? "Indexed" : p.verdict ?? "Unknown"}
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-right text-foreground font-mono">{p.clicks}</td>
                          <td className="py-2 pr-3 text-right text-foreground font-mono">
                            {p.impressions}
                            {delta !== null && delta !== 0 && (
                              <span className={delta > 0 ? "ml-1 text-emerald-600" : "ml-1 text-destructive"}>
                                {delta > 0 ? "+" : ""}
                                {delta}
                              </span>
                            )}
                          </td>
                          <td className="py-2 text-right text-muted-foreground font-mono">
                            {p.position ? p.position.toFixed(1) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <h2 className="text-sm font-semibold text-foreground">Top queries</h2>
              </div>
              {data.queries.length === 0 ? (
                <p className="mt-3 text-xs text-muted-foreground">No query data reported yet.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {data.queries.map((q) => (
                    <li key={q.query} className="flex items-center justify-between gap-3 text-xs">
                      <span className="truncate text-foreground">{q.query}</span>
                      <span className="shrink-0 text-muted-foreground font-mono">
                        {q.clicks} / {q.impressions} · {q.position.toFixed(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Search Console data lags roughly two days. Each refresh stores a dated snapshot, so page-level impression
              changes appear once at least two days of history exist.
            </p>
          </>
        )}
      </div>
    </AppShell>
  );
}
