import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { HUBS } from "@/lib/hubs";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destination Hubs — Move Abroad by Country & Purpose | Crosspath.move" },
      { name: "description", content: "Country hubs for moving abroad: study in Germany, work in Germany or Portugal, remote work in Spain, protection in Poland, study in Canada — routes, guides and checklists in one place." },
      { property: "og:title", content: "Destination Hubs — Crosspath.move" },
      { property: "og:description", content: "Every route, guide and checklist for a destination and purpose, grouped in one place." },
      { property: "og:url", content: "https://crosspath.site/destinations" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Destination Hubs — Crosspath.move" },
      { name: "twitter:description", content: "Every route, guide and checklist for a destination and purpose, grouped in one place." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.site/destinations" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://crosspath.site/destinations#page",
          name: "Destination hubs",
          url: "https://crosspath.site/destinations",
          inLanguage: "en",
          hasPart: HUBS.map((h) => ({
            "@type": "WebPage",
            name: h.h1,
            url: `https://crosspath.site/destinations/${h.slug}`,
          })),
        }),
      },
    ],
  }),
  component: DestinationsIndex,
});

function DestinationsIndex() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Destinations"
        title="Destination hubs"
        subtitle="Pick a country and a reason for moving — every route, guide and checklist we cover for it sits on one page."
      />
      <div className="px-6 pb-12 space-y-3">
        {HUBS.map((h) => (
          <Link
            key={h.slug}
            to="/destinations/$slug"
            params={{ slug: h.slug }}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-lg">{h.flag}</div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-[0.25em] text-primary font-mono">{h.reasonLabel}</p>
              <h2 className="mt-1 text-sm font-semibold text-foreground">{h.h1}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.metaDescription}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                {h.routes.length} route{h.routes.length === 1 ? "" : "s"} · {h.guides.length} guide{h.guides.length === 1 ? "" : "s"}
              </p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Somewhere else in mind?</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Build a personalised checklist for any nationality, destination and reason for moving.
          </p>
          <Link to="/" className="mt-3 inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
            Start my plan <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
