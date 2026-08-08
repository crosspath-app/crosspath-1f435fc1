import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Map } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { GUIDES } from "@/lib/guides-data";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Relocation Guides — Visa & Move Checklists | Crosspath.move" },
      { name: "description", content: "Free step-by-step relocation guides: Erasmus to Germany, the German skilled-worker visa and the Spanish digital nomad visa — documents, deadlines, costs and official links." },
      { property: "og:title", content: "Relocation Guides — Visa & Move Checklists" },
      { property: "og:description", content: "Step-by-step visa and relocation checklists with legal basis, timings and official links." },
      { property: "og:url", content: "https://crosspath.site/guides" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Relocation Guides — Crosspath.move" },
      { name: "twitter:description", content: "Visa and relocation checklists with real deadlines and official sources." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.site/guides" }],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Guides"
        title="Relocation guides"
        subtitle="Complete checklists for the moves people ask about most — with timings, costs and the law behind each step."
      />
      <div className="px-6 pb-12 space-y-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            to="/guides/$slug"
            params={{ slug: g.slug }}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-lg">
              {g.flag}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-[0.25em] text-primary font-mono">{g.eyebrow}</p>
              <h2 className="mt-1 text-sm font-semibold text-foreground">{g.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.metaDescription}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                {g.steps.length} steps · {g.faq.length} FAQs
              </p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Need a different route?</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Browse popular country-to-country routes, or build a personalised checklist for any nationality, destination and reason for moving.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/move" className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
              Popular routes <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to="/destinations" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Destination hubs <ArrowRight className="h-3 w-3" />
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
              Start my plan <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}