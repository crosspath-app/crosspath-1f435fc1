import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Globe2, MapPin, Briefcase, GraduationCap, Heart, Mail, Instagram } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Founder — Crosspath" },
      { name: "description", content: "Meet the person behind Crosspath — a mission-driven project to simplify global relocation for students, workers, and nomads." },
      { property: "og:title", content: "About the Founder — Crosspath" },
      { property: "og:description", content: "Meet the person behind Crosspath — a mission-driven project to simplify global relocation for students, workers, and nomads." },
      { property: "og:url", content: "https://crosspath.lovable.app/about" },
      { property: "og:type", content: "profile" },
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
            jobTitle: "Founder, Crosspath",
            url: "https://crosspath.lovable.app/about",
            worksFor: {
              "@type": "Organization",
              name: "Crosspath",
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
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-mono">Founder & Builder, Crosspath</p>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
            <p>
              I built Crosspath because I have seen too many smart, ambitious people get stuck in immigration paperwork instead of starting their new life. Whether it is a student moving for a semester abroad, a developer taking a remote job in Portugal, or a family reuniting across borders — the process should not feel like a full-time job.
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

        {/* Why Crosspath */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Why Crosspath exists</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most relocation advice is scattered across forums, outdated blogs, and dense government PDFs. Crosspath brings it all into one place: country-specific checklists, real deadlines, plain-language explanations, and tools that actually save you time.
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
              href="mailto:hello@crosspath.lovable.app"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:bg-accent transition"
            >
              <Mail className="h-4 w-4 text-primary" strokeWidth={1.8} />
              hello@crosspath.lovable.app
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
