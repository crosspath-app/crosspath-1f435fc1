import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, HelpCircle, Layers } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { getHub, siblingHubs } from "@/lib/hubs";
import { RelatedLinks } from "@/components/borderless/RelatedLinks";
import { relatedForHub } from "@/lib/related-links";

export const Route = createFileRoute("/destinations/$slug")({
  head: ({ params }) => {
    const hub = getHub(params.slug);
    if (!hub) return {};
    const url = `https://crosspath.site/destinations/${hub.slug}`;
    return {
      meta: [
        { title: hub.metaTitle },
        { name: "description", content: hub.metaDescription },
        { property: "og:title", content: hub.metaTitle },
        { property: "og:description", content: hub.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: hub.metaTitle },
        { name: "twitter:description", content: hub.metaDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${url}#page`,
                name: hub.h1,
                description: hub.metaDescription,
                url,
                inLanguage: "en",
                publisher: { "@type": "Organization", name: "Crosspath.move", url: "https://crosspath.site" },
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: [
                    ...hub.routes.map((r, i) => ({
                      "@type": "ListItem",
                      position: i + 1,
                      name: `${r.fromName} → ${r.toName} (${r.reasonLabel})`,
                      url: `https://crosspath.site/move/${r.slug}`,
                    })),
                    ...hub.guides.map((g, i) => ({
                      "@type": "ListItem",
                      position: hub.routes.length + i + 1,
                      name: g.title,
                      url: `https://crosspath.site/guides/${g.slug}`,
                    })),
                  ],
                },
              },
              ...(hub.faq.length
                ? [
                    {
                      "@type": "FAQPage",
                      "@id": `${url}#faq`,
                      url,
                      inLanguage: "en",
                      mainEntity: hub.faq.map((f) => ({
                        "@type": "Question",
                        name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                      })),
                    },
                  ]
                : []),
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://crosspath.site/" },
                  { "@type": "ListItem", position: 2, name: "Destinations", item: "https://crosspath.site/destinations" },
                  { "@type": "ListItem", position: 3, name: hub.h1, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    if (!getHub(params.slug)) throw notFound();
    return null;
  },
  component: HubPage,
});

function HubPage() {
  const { slug } = Route.useParams();
  const hub = getHub(slug);
  if (!hub) return null;
  const siblings = siblingHubs(hub);
  const related = relatedForHub(hub.country, hub.reason);

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/destinations" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> Destinations
        </Link>
      </div>
      <PageHeader eyebrow={`${hub.flag} ${hub.countryName} · ${hub.reasonLabel}`} title={hub.h1} subtitle={hub.intro} />

      <div className="px-6 pb-12 space-y-4">
        {hub.facts.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {hub.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-3">
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{f.label}</p>
                <p className="mt-1 text-xs font-medium text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        )}

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Routes by nationality</h2>
          <div className="mt-3 space-y-2">
            {hub.routes.map((r) => (
              <Link
                key={r.slug}
                to="/move/$slug"
                params={{ slug: r.slug }}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">
                    {r.fromFlag} {r.fromName} → {r.toFlag} {r.toName}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{r.visaLine}</span>
                </span>
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        {hub.guides.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">In-depth guides</h2>
            <div className="mt-3 space-y-2">
              {hub.guides.map((g) => (
                <Link
                  key={g.slug}
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary"
                >
                  <span className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-primary font-mono">{g.eyebrow}</span>
                    <span className="mt-0.5 block text-sm font-medium text-foreground">{g.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{g.steps.length} steps · {g.faq.length} FAQs</span>
                  </span>
                  <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {siblings.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <h2 className="text-sm font-semibold text-foreground">Other reasons to move to {hub.countryName}</h2>
            </div>
            <div className="mt-3 space-y-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  to="/destinations/$slug"
                  params={{ slug: s.slug }}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-3 hover:border-primary"
                >
                  <span className="text-sm font-medium text-foreground">{s.h1}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {hub.faq.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <h2 className="text-sm font-semibold text-foreground">Frequently asked questions</h2>
            </div>
            <div className="mt-3 space-y-3">
              {hub.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="text-sm font-medium text-foreground">{f.q}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <Link to="/" className="flex items-center justify-between rounded-2xl border border-primary bg-card p-4">
          <span className="text-sm font-medium text-foreground">Build a tracked checklist for this move</span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </Link>

        <RelatedLinks groups={[{ heading: "Tools for this move", links: related.tools }]} />

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Information, not legal advice. Requirements change — always confirm with the relevant embassy or an accredited lawyer. See our{" "}
          <Link to="/methodology" className="text-primary hover:underline">methodology and sources</Link>.
        </p>
      </div>
    </AppShell>
  );
}
