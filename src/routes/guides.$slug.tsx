import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, AlertTriangle, Scale, CalendarClock, Coins, ExternalLink, HelpCircle } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { getGuide } from "@/lib/guides-data";
import { relatedForGuide } from "@/lib/related-links";
import { RelatedLinks } from "@/components/borderless/RelatedLinks";

export const Route = createFileRoute("/guides/$slug")({
  head: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) return {};
    const url = `https://crosspath.site/guides/${guide.slug}`;
    return {
      meta: [
        { title: guide.metaTitle },
        { name: "description", content: guide.metaDescription },
        { property: "og:title", content: guide.metaTitle },
        { property: "og:description", content: guide.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: guide.metaTitle },
        { name: "twitter:description", content: guide.metaDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                "@id": `${url}#howto`,
                name: guide.h1,
                description: guide.metaDescription,
                url,
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                inLanguage: "en",
                publisher: { "@type": "Organization", name: "Crosspath.move", url: "https://crosspath.site" },
                step: guide.steps.map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s.title,
                  text: s.detail,
                  url: `${url}#step-${i + 1}`,
                })),
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                name: `${guide.h1} — frequently asked questions`,
                url,
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                inLanguage: "en",
                mainEntity: guide.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://crosspath.site/" },
                  { "@type": "ListItem", position: 2, name: "Guides", item: "https://crosspath.site/guides" },
                  { "@type": "ListItem", position: 3, name: guide.h1, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const guide = getGuide(slug);
  if (!guide) return null;
  const related = relatedForGuide(guide.slug);

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/guides" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> Guides
        </Link>
      </div>
      <PageHeader eyebrow={`${guide.flag} ${guide.eyebrow}`} title={guide.h1} subtitle={guide.route} />

      <div className="px-6 pb-12 space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{guide.intro}</p>

        <div className="grid grid-cols-2 gap-2">
          {guide.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-border bg-card p-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{f.label}</p>
              <p className="mt-1 text-xs font-medium text-foreground">{f.value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Step-by-step checklist</h2>
          <ol className="mt-4 space-y-3">
            {guide.steps.map((s, i) => (
              <li key={s.title} id={`step-${i + 1}`} className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary text-[10px] text-primary font-mono">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
                    {s.local && <p className="mt-0.5 text-[11px] italic text-primary">{s.local}</p>}
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground font-mono">
                      <span className="inline-flex items-center gap-1"><CalendarClock className="h-3 w-3" /> {s.timing}</span>
                      {s.cost && <span className="inline-flex items-center gap-1"><Coins className="h-3 w-3" /> {s.cost}</span>}
                    </div>
                    {s.link && (
                      <a href={s.link.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:underline">
                        {s.link.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">What people forget</h2>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {guide.mistakes.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Legal basis</h2>
          </div>
          <ul className="mt-3 space-y-2">
            {guide.legalBasis.map((l) => (
              <li key={l.label} className="rounded-xl border border-border bg-background p-3">
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary">
                  {l.label}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">{l.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Frequently asked questions</h2>
          </div>
          <div className="mt-3 space-y-3">
            {guide.faq.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-medium text-foreground">{f.q}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <Link to="/" className="flex items-center justify-between rounded-2xl border border-primary bg-card p-4">
          <span className="text-sm font-medium text-foreground">Build this as a tracked personal checklist</span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </Link>

        <RelatedLinks
          groups={[
            { heading: "Destination hub", links: related.hub ? [related.hub] : [] },
            { heading: "Country routes covered in detail", links: related.routes },
            { heading: "Related guides", links: related.guides },
            { heading: "Tools for this move", links: related.tools },
          ]}
        />

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Information, not legal advice. Requirements change — always confirm with the relevant embassy or an accredited lawyer. See our{" "}
          <Link to="/methodology" className="text-primary hover:underline">methodology and sources</Link>.
        </p>
      </div>
    </AppShell>
  );
}