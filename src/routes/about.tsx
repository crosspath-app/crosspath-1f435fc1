import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Globe2, MapPin, Briefcase, Heart, Mail, Instagram, GraduationCap, Scale, BookMarked, Gavel, FileDown } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { downloadPortfolioPdf } from "@/lib/portfolio-pdf";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Founder — Crosspath.move Relocation App" },
      { name: "description", content: "Meet Maria Banyś, founder of Crosspath.move — a free relocation and visa planning app for international students, remote workers and digital nomads." },
      { property: "og:title", content: "About the Founder — Crosspath.move Relocation App" },
      { property: "og:description", content: "Meet Maria Banyś, founder of Crosspath.move — a free relocation and visa planning app for students, workers and nomads." },
      { property: "og:url", content: "https://crosspath.lovable.app/about" },
      { property: "og:type", content: "profile" },
      { name: "twitter:title", content: "About the Founder — Crosspath.move" },
      { name: "twitter:description", content: "Meet Maria Banyś, founder of the free relocation and visa planning app Crosspath.move." },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/about" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: "Maria Banyś",
            jobTitle: "Founder, Crosspath.move",
            url: "https://crosspath.lovable.app/about",
            worksFor: {
              "@type": "Organization",
              name: "Crosspath.move",
              url: "https://crosspath.lovable.app",
            },
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono"
        >
          <ArrowLeft className="h-3 w-3" /> Home
        </Link>
      </div>
      <PageHeader
        eyebrow="Team"
        title="About the Founder"
        subtitle="One person, one mission: make moving abroad as simple as booking a flight."
      />

      <div className="px-6 pb-12 space-y-5">
        {/* Founder card */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Maria Banyś</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-mono">Founder & Builder, Crosspath.move</p>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
            <p>
              I built Crosspath.move because I have seen too many smart, ambitious people get stuck in immigration paperwork instead of starting their new life. Whether it is a student moving for a semester abroad, a developer taking a remote job in Portugal, or a family reuniting across borders — the process should not feel like a full-time job.
            </p>
            <p>
              This project is independent, ad-free, and built with care. Every checklist, every deadline calculator, every plain-language explanation comes from real research into embassy requirements, immigration portals, and the actual experiences of people who have been through it.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> Based in Poland
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] text-muted-foreground">
              <Briefcase className="h-3 w-3" /> Full-stack developer
            </span>
          </div>
        </div>

        {/* Why Crosspath.move */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Why Crosspath.move exists</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most relocation advice is scattered across forums, outdated blogs, and dense government PDFs. Crosspath.move brings it all into one place: country-specific checklists, real deadlines, plain-language explanations, and tools that actually save you time.
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "No ads, no tracking, no selling your data.",
              "Open to feedback: every country guide can be improved by the community.",
              "Designed for the real world: students, remote workers, families, and refugees.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mission stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard number="65+" label="Countries covered" />
          <StatCard number="8" label="Languages supported" />
          <StatCard number="6" label="Move purposes" />
          <StatCard number="0€" label="Cost to use" />
        </div>

        {/* Academic / portfolio section */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Academic focus</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Crosspath.move is also a research project on how international and EU migration law is experienced by the people it governs. Country requirements are traced back to primary sources — EU directives, national statutes, and treaty instruments — and translated into plain language without losing the underlying rule.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2">
            <Link to="/methodology" className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 hover:border-primary">
              <BookMarked className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Methodology &amp; Sources</p>
                <p className="text-xs text-muted-foreground">Primary and secondary sources, update cadence, limitations.</p>
              </div>
            </Link>
            <Link to="/rights" className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 hover:border-primary">
              <Scale className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Know Your Rights</p>
                <p className="text-xs text-muted-foreground">Border and in-country protections with legal basis.</p>
              </div>
            </Link>
            <Link to="/case-law" className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 hover:border-primary">
              <Gavel className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Landmark Case Law</p>
                <p className="text-xs text-muted-foreground">Leading ECtHR and CJEU judgments in plain language.</p>
              </div>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => downloadPortfolioPdf()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            <FileDown className="h-4 w-4" strokeWidth={1.8} />
            Download PDF report
          </button>
          <p className="mt-2 text-[11px] text-muted-foreground text-center">
            One-page portfolio summary — methodology, sample outputs, sources.
          </p>
        </div>

        {/* Contact / CTA */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Get in touch</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Have a question, found an outdated requirement, or want a new country added? I read every message.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="mailto:crosspath.support@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:bg-accent transition"
            >
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.8} />
              crosspath.support@gmail.com
            </a>
            <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground">
              <Instagram className="h-4 w-4 text-primary" strokeWidth={1.8} />
              @joincrosspath
            </span>
          </div>
        </div>

      </div>
    </AppShell>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <p className="font-mono text-xl font-semibold text-primary">{number}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
