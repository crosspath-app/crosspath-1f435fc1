import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { ROUTE_LANDINGS } from "@/lib/route-landings";

export const Route = createFileRoute("/move/")({
  head: () => ({
    meta: [
      { title: "Popular Relocation Routes — Country-to-Country Checklists | Crosspath.move" },
      { name: "description", content: "Checklists for the most searched relocation routes: Poland to Germany for study, India to Germany for work, US to Spain as a digital nomad and more." },
      { property: "og:title", content: "Popular Relocation Routes — Crosspath.move" },
      { property: "og:description", content: "Country-to-country relocation checklists with documents, deadlines and next steps." },
      { property: "og:url", content: "https://crosspath.site/move" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Popular Relocation Routes — Crosspath.move" },
      { name: "twitter:description", content: "Country-to-country relocation checklists with documents, deadlines and next steps." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.site/move" }],
  }),
  component: MoveIndex,
});

function MoveIndex() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Popular routes"
        title="Country-to-country routes"
        subtitle="The moves people search for most, each with a checklist preview and clear next steps."
      />
      <div className="px-6 pb-12 space-y-3">
        {ROUTE_LANDINGS.map((r) => (
          <Link
            key={r.slug}
            to="/move/$slug"
            params={{ slug: r.slug }}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-sm">
              {r.fromFlag}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-[0.25em] text-primary font-mono">{r.reasonLabel}</p>
              <h2 className="mt-1 text-sm font-semibold text-foreground">
                {r.fromName} → {r.toName} {r.toFlag}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.visaLine}</p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
        <Link to="/guides" className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-primary">
          <span className="text-sm font-medium text-foreground">Browse in-depth relocation guides</span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </Link>
      </div>
    </AppShell>
  );
}
