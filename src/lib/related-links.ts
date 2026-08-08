import { GUIDES } from "@/lib/guides-data";
import { ROUTE_LANDINGS } from "@/lib/route-landings";
import { GUIDE_TAGS, hubForGuide, hubForRoute, type Hub } from "@/lib/hubs";

export type RelatedLink = {
  key: string;
  href: string;
  label: string;
  note: string;
  prefix?: string;
};

const REASON_NEIGHBOURS: Record<string, string[]> = {
  study: ["study", "work"],
  work: ["work", "nomad"],
  nomad: ["nomad", "work"],
  refuge: ["refuge", "study"],
};

function score(a: { country: string; reason: string }, b: { country: string; reason: string }) {
  let s = 0;
  if (a.country === b.country) s += 3;
  if (a.reason === b.reason) s += 2;
  else if (REASON_NEIGHBOURS[a.reason]?.includes(b.reason)) s += 1;
  return s;
}

function guideLink(slug: string): RelatedLink | null {
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) return null;
  return {
    key: `guide-${g.slug}`,
    href: `/guides/${g.slug}`,
    label: `${g.flag} ${g.title}`,
    note: g.eyebrow,
    prefix: "Guide",
  };
}

function hubLink(hub?: Hub): RelatedLink | null {
  if (!hub) return null;
  return {
    key: `hub-${hub.slug}`,
    href: `/destinations/${hub.slug}`,
    label: `${hub.flag} ${hub.h1}`,
    note: `${hub.routes.length} routes and ${hub.guides.length} guides in one hub`,
    prefix: "Hub",
  };
}

function moveLink(slug: string): RelatedLink | null {
  const r = ROUTE_LANDINGS.find((x) => x.slug === slug);
  if (!r) return null;
  return {
    key: `move-${r.slug}`,
    href: `/move/${r.slug}`,
    label: `${r.fromFlag} ${r.fromName} → ${r.toFlag} ${r.toName}`,
    note: `${r.reasonLabel} route`,
    prefix: "Route",
  };
}

const TOOL_LINKS: Record<string, RelatedLink> = {
  compare: { key: "tool-compare", href: "/compare", label: "Compare destinations", note: "Visa difficulty, healthcare, tax and residency timelines side by side", prefix: "Tool" },
  cost: { key: "tool-cost", href: "/cost", label: "Relocation cost estimator", note: "Fees, insurance, translations and apostilles for your route", prefix: "Tool" },
  rights: { key: "tool-rights", href: "/rights", label: "Your rights on this route", note: "Directive-level entitlements and remedies if a decision goes wrong", prefix: "Reference" },
  asylum: { key: "tool-asylum", href: "/asylum", label: "International protection", note: "Qualification, procedures and reception conditions", prefix: "Reference" },
  caselaw: { key: "tool-caselaw", href: "/case-law", label: "Landmark case law", note: "CJEU and ECtHR judgments shaping cross-border mobility", prefix: "Reference" },
  deadlines: { key: "tool-deadlines", href: "/deadlines", label: "Deadline reminders", note: "Track visa, permit and insurance expiry dates by email", prefix: "Tool" },
};

function toolsFor(reason: string): RelatedLink[] {
  if (reason === "refuge") return [TOOL_LINKS.asylum, TOOL_LINKS.rights, TOOL_LINKS.caselaw];
  if (reason === "nomad") return [TOOL_LINKS.cost, TOOL_LINKS.compare, TOOL_LINKS.deadlines];
  if (reason === "study") return [TOOL_LINKS.compare, TOOL_LINKS.cost, TOOL_LINKS.rights];
  return [TOOL_LINKS.compare, TOOL_LINKS.rights, TOOL_LINKS.deadlines];
}

function rank<T extends { slug: string }>(
  items: T[],
  tagOf: (i: T) => { country: string; reason: string },
  self: { country: string; reason: string },
  excludeSlug: string,
  limit: number,
) {
  return items
    .filter((i) => i.slug !== excludeSlug)
    .map((i) => ({ i, s: score(self, tagOf(i)) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.i.slug);
}

/** Contextual links shown on a /guides/$slug page. */
export function relatedForGuide(slug: string): { routes: RelatedLink[]; guides: RelatedLink[]; tools: RelatedLink[]; hub: RelatedLink | null } {
  const self = GUIDE_TAGS[slug] ?? { country: "", reason: "study" };
  const routes = rank(ROUTE_LANDINGS, (r) => ({ country: r.to, reason: r.reason }), self, "", 3)
    .map(moveLink)
    .filter(Boolean) as RelatedLink[];
  const guides = rank(GUIDES, (g) => GUIDE_TAGS[g.slug] ?? { country: "", reason: "" }, self, slug, 2)
    .map(guideLink)
    .filter(Boolean) as RelatedLink[];
  const hub = hubLink(hubForGuide(slug));
  return { routes, guides, tools: toolsFor(self.reason), hub };
}

/** Contextual links shown on a /move/$slug page. */
export function relatedForRoute(slug: string): { guides: RelatedLink[]; routes: RelatedLink[]; tools: RelatedLink[]; hub: RelatedLink | null } {
  const r = ROUTE_LANDINGS.find((x) => x.slug === slug);
  const self = { country: r?.to ?? "", reason: r?.reason ?? "study" };
  const guides = rank(GUIDES, (g) => GUIDE_TAGS[g.slug] ?? { country: "", reason: "" }, self, "", 2)
    .map(guideLink)
    .filter(Boolean) as RelatedLink[];
  const routes = rank(ROUTE_LANDINGS, (x) => ({ country: x.to, reason: x.reason }), self, slug, 3)
    .map(moveLink)
    .filter(Boolean) as RelatedLink[];
  const hub = hubLink(hubForRoute(slug));
  return { guides, routes, tools: toolsFor(self.reason), hub };
}

/** Contextual links shown on a /destinations/$slug hub page. */
export function relatedForHub(_country: string, reason: string): { tools: RelatedLink[] } {
  return { tools: toolsFor(reason) };
}
