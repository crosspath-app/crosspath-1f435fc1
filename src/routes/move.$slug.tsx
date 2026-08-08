import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarClock, CheckCircle2, ListChecks, MoveRight, HelpCircle } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { getRouteLanding } from "@/lib/route-landings";
import { getGuide } from "@/lib/guides-data";
import { relatedForRoute } from "@/lib/related-links";
import { RelatedLinks } from "@/components/borderless/RelatedLinks";
import { saveTrip } from "@/lib/trip-store";

export const Route = createFileRoute("/move/$slug")({
  head: ({ params }) => {
    const r = getRouteLanding(params.slug);
    if (!r) return {};
    const url = `https://crosspath.site/move/${r.slug}`;
    return {
      meta: [
        { title: `${r.metaTitle} | Crosspath.move` },
        { name: "description", content: r.metaDescription },
        { property: "og:title", content: r.metaTitle },
        { property: "og:description", content: r.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: r.metaTitle },
        { name: "twitter:description", content: r.metaDescription },
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
                name: `${r.fromName} to ${r.toName} for ${r.reasonLabel.toLowerCase()}`,
                description: r.metaDescription,
                url,
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                inLanguage: "en",
                publisher: { "@type": "Organization", name: "Crosspath.move", url: "https://crosspath.site" },
                step: r.preview.map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s.title,
                  text: s.note,
                  url: `${url}#step-${i + 1}`,
                })),
              },
              {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                name: `${r.fromName} to ${r.toName} — frequently asked questions`,
                url,
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                inLanguage: "en",
                mainEntity: r.faq.map((f) => ({
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
                  { "@type": "ListItem", position: 2, name: "Routes", item: "https://crosspath.site/move" },
                  { "@type": "ListItem", position: 3, name: `${r.fromName} to ${r.toName}`, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    if (!getRouteLanding(params.slug)) throw notFound();
    return null;
  },
  component: RouteLandingPage,
});

function RouteLandingPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const r = getRouteLanding(slug);
  if (!r) return null;
  const guide = r.guideSlug ? getGuide(r.guideSlug) : undefined;
  const related = relatedForRoute(r.slug);

  function startPlan() {
    if (!r) return;
    saveTrip(r.from, r.to, r.reason);
    navigate({ to: "/checklist" });
  }

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/move" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> Popular routes
        </Link>
      </div>

      <PageHeader
        eyebrow={`${r.fromFlag} ${r.fromName} → ${r.toFlag} ${r.toName}`}
        title={`${r.fromName} to ${r.toName} for ${r.reasonLabel.toLowerCase()}`}
        subtitle={r.visaLine}
      />

      <div className="px-6 pb-12 space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{r.intro}</p>

        <button
          onClick={startPlan}
          className="flex w-full items-center justify-between rounded-2xl border border-primary bg-card p-4 text-left transition-colors hover:bg-primary/5"
        >
          <span>
            <span className="block text-sm font-semibold text-foreground">Generate my full checklist</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Pre-filled for {r.fromName} → {r.toName}, {r.reasonLabel.toLowerCase()}. Tracked, with deadlines.
            </span>
          </span>
          <MoveRight className="h-4 w-4 shrink-0 text-primary" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          {r.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-border bg-card p-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{f.label}</p>
              <p className="mt-1 text-xs font-medium text-foreground">{f.value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Checklist preview</h2>
          </div>
          <ol className="mt-3 space-y-2">
            {r.preview.map((s, i) => (
              <li key={s.title} id={`step-${i + 1}`} className="rounded-xl border border-border bg-background p-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary text-[9px] text-primary font-mono">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
                    {s.local && <p className="mt-0.5 text-[11px] italic text-primary">{s.local}</p>}
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.note}</p>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <CalendarClock className="h-3 w-3" /> {s.when}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <button onClick={startPlan} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
            See all steps <ArrowRight className="h-3 w-3" />
          </button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Next steps</h2>
          </div>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {r.nextSteps.map((s, i) => (
              <li key={s} className="flex items-start gap-2">
                <span className="text-primary font-mono text-xs">{i + 1}.</span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Frequently asked questions</h2>
          </div>
          <div className="mt-3 space-y-3">
            {r.faq.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-medium text-foreground">{f.q}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {guide && (
          <Link
            to="/guides/$slug"
            params={{ slug: guide.slug }}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover:border-primary"
          >
            <span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-primary font-mono">Deep dive</span>
              <span className="mt-1 block text-sm font-medium text-foreground">{guide.title} — full guide</span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        )}

        <RelatedLinks
          groups={[
            { heading: "Destination hub", links: related.hub ? [related.hub] : [] },
            { heading: "Similar routes", links: related.routes },
            { heading: "In-depth guides", links: related.guides },
            { heading: "Tools for this move", links: related.tools },
          ]}
        />

        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Information, not legal advice. Rules change — confirm with the relevant embassy or an accredited lawyer. See our{" "}
          <Link to="/methodology" className="text-primary hover:underline">methodology and sources</Link>.
        </p>
      </div>
    </AppShell>
  );
}
