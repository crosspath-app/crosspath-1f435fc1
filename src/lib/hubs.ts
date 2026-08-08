import { GUIDES, type Guide } from "@/lib/guides-data";
import { ROUTE_LANDINGS, type RouteLanding } from "@/lib/route-landings";

/** Country + purpose tags for each editorial guide (shared with related-links). */
export const GUIDE_TAGS: Record<string, { country: string; reason: string }> = {
  "erasmus-germany": { country: "DE", reason: "study" },
  "work-visa-germany": { country: "DE", reason: "work" },
  "digital-nomad-spain": { country: "ES", reason: "nomad" },
};

export type Hub = {
  slug: string;
  country: string;
  countryName: string;
  flag: string;
  reason: string;
  reasonLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  routes: RouteLanding[];
  guides: Guide[];
  facts: { label: string; value: string }[];
  faq: { q: string; a: string }[];
};

const REASON_NOUN: Record<string, string> = {
  study: "study",
  work: "work",
  nomad: "remote work",
  refuge: "international protection",
};

/** Optional editorial copy per country+purpose. Anything missing is generated from the route data. */
const HUB_COPY: Record<string, { intro?: string; faq?: { q: string; a: string }[] }> = {
  "DE-study": {
    intro:
      "Germany hosts more international students than any other non-English-speaking country, and the paperwork is the same for almost all of them: admission letter, proof of funds, health insurance, Anmeldung, then enrolment. What changes is whether you need a national visa first. Everything below is grouped by where you are coming from.",
    faq: [
      { q: "Do I need a visa to study in Germany?", a: "EU, EEA and Swiss citizens do not. Most other nationalities need a national (D) visa for study purposes before travelling, typically processed in 6–12 weeks." },
      { q: "What is the Anmeldung and when is it due?", a: "It is the compulsory address registration under the Bundesmeldegesetz, due within 14 days of moving in. Your tax ID, bank account and often enrolment depend on it." },
    ],
  },
  "DE-work": {
    intro:
      "Germany's skilled-worker route runs on recognition of your qualification plus a salary threshold — the EU Blue Card being the fastest track. Below are the country corridors and the full guide, with the recognition and visa steps in the order the authorities expect them.",
  },
  "ES-nomad": {
    intro:
      "Spain's digital nomad visa under the Startup Law lets remote workers live in Spain while working for foreign clients or employers, with a favourable tax regime. Requirements centre on proof of remote income, a clean criminal record and private health cover.",
  },
  "PT-work": {
    intro:
      "Portugal combines a comparatively accessible work-visa route with the NIF/NISS registration chain that every new resident has to complete. Here are the corridors we cover and what each nationality needs first.",
  },
  "PL-refuge": {
    intro:
      "Poland hosts one of Europe's largest protection populations. Temporary protection and the asylum procedure are separate tracks with different rights — this hub keeps the routes, the legal instruments and the reception conditions in one place.",
  },
  "CA-study": {
    intro:
      "A Canadian study permit hinges on a provincial attestation letter, an accepted designated learning institution and proof of funds. Processing times vary sharply by country of application, so the corridors below are grouped by origin.",
  },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function build(): Hub[] {
  const map = new Map<string, Hub>();

  for (const r of ROUTE_LANDINGS) {
    const key = `${r.to}-${r.reason}`;
    if (!map.has(key)) {
      const slug = `${slugify(r.toName)}-${r.reason}`;
      const noun = REASON_NOUN[r.reason] ?? r.reasonLabel.toLowerCase();
      map.set(key, {
        slug,
        country: r.to,
        countryName: r.toName,
        flag: r.toFlag,
        reason: r.reason,
        reasonLabel: r.reasonLabel,
        h1: `Moving to ${r.toName} for ${noun}`,
        metaTitle: `Moving to ${r.toName} for ${noun} — Visas, Documents & Checklists`,
        metaDescription: `Everything needed to move to ${r.toName} for ${noun}: visa rules by nationality, required documents, deadlines, costs and step-by-step checklists with official sources.`,
        intro:
          HUB_COPY[key]?.intro ??
          `Every ${noun} move to ${r.toName} shares the same backbone: entry permission, proof of means, health cover and local registration. The routes below break it down by where you are coming from, and the guides go step by step.`,
        routes: [],
        guides: [],
        facts: [],
        faq: HUB_COPY[key]?.faq ?? [],
      });
    }
    map.get(key)!.routes.push(r);
  }

  for (const hub of map.values()) {
    hub.guides = GUIDES.filter((g) => {
      const t = GUIDE_TAGS[g.slug];
      return t && t.country === hub.country && t.reason === hub.reason;
    });

    // Aggregate the most useful facts across the routes in this hub.
    const seen = new Set<string>();
    for (const r of hub.routes) {
      for (const f of r.facts) {
        if (seen.has(f.label)) continue;
        seen.add(f.label);
        hub.facts.push({ label: hub.routes.length > 1 ? `${f.label} · ${r.fromName}` : f.label, value: f.value });
      }
    }
    hub.facts = hub.facts.slice(0, 6);

    // Aggregate route FAQs when the hub has no editorial ones.
    if (!hub.faq.length) {
      hub.faq = hub.routes.flatMap((r) => r.faq).slice(0, 4);
    } else {
      hub.faq = [...hub.faq, ...hub.routes.flatMap((r) => r.faq)].slice(0, 5);
    }
  }

  return [...map.values()].sort((a, b) => a.countryName.localeCompare(b.countryName));
}

export const HUBS: Hub[] = build();

export function getHub(slug: string): Hub | undefined {
  return HUBS.find((h) => h.slug === slug);
}

/** Other purposes covered for the same destination country. */
export function siblingHubs(hub: Hub): Hub[] {
  return HUBS.filter((h) => h.country === hub.country && h.slug !== hub.slug);
}

/** The hub a given move route or guide belongs to. */
export function hubForRoute(slug: string): Hub | undefined {
  const r = ROUTE_LANDINGS.find((x) => x.slug === slug);
  return r ? HUBS.find((h) => h.country === r.to && h.reason === r.reason) : undefined;
}

export function hubForGuide(slug: string): Hub | undefined {
  const t = GUIDE_TAGS[slug];
  return t ? HUBS.find((h) => h.country === t.country && h.reason === t.reason) : undefined;
}
