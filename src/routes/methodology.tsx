import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, ShieldCheck, RefreshCw, AlertTriangle, Library } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology & Sources — Crosspath.move" },
      { name: "description", content: "How Crosspath.move researches immigration requirements: primary EU and national legal sources, update cadence, editorial policy and disclaimers." },
      { property: "og:title", content: "Methodology & Sources — Crosspath.move" },
      { property: "og:description", content: "Primary sources, editorial policy and limitations behind Crosspath.move's country guides." },
      { property: "og:url", content: "https://crosspath.lovable.app/methodology" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: "Methodology & Sources — Crosspath.move" },
      { name: "twitter:description", content: "How the country guides on Crosspath.move are researched and maintained." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/methodology" }],
  }),
  component: MethodologyPage,
});

const PRIMARY_SOURCES: { label: string; url: string; note: string }[] = [
  { label: "EUR-Lex", url: "https://eur-lex.europa.eu/", note: "Consolidated EU treaties, directives and regulations." },
  { label: "EU Immigration Portal", url: "https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal_en", note: "Official European Commission overview of migration routes." },
  { label: "EUAA (formerly EASO)", url: "https://euaa.europa.eu/", note: "EU Agency for Asylum — country-of-origin and procedure information." },
  { label: "UNHCR Refworld", url: "https://www.refworld.org/", note: "International refugee and human-rights instruments and case law." },
  { label: "HCCH Apostille Section", url: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille", note: "Status list for the 1961 Hague Apostille Convention." },
  { label: "IOM World Migration Report", url: "https://worldmigrationreport.iom.int/", note: "Cross-country migration statistics and analysis." },
];

const SECONDARY: { label: string; url: string }[] = [
  { label: "Migration Policy Institute (MPI)", url: "https://www.migrationpolicy.org/" },
  { label: "European Migration Network (EMN)", url: "https://home-affairs.ec.europa.eu/networks/european-migration-network-emn_en" },
  { label: "OECD International Migration Outlook", url: "https://www.oecd.org/migration/international-migration-outlook-1999124x.htm" },
  { label: "ELENA (European Legal Network on Asylum)", url: "https://ecre.org/our-work/elena/" },
];

function MethodologyPage() {
  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/about" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> About
        </Link>
      </div>
      <PageHeader
        eyebrow="Research"
        title="Methodology & Sources"
        subtitle="How country guides are researched, cited, and kept honest."
      />

      <div className="px-6 pb-12 space-y-4">
        <Section icon={BookMarked} title="Primary sources">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every requirement traces back to a primary legal instrument or an official government portal. When EU law applies, the directive is cited (e.g. Directive 2016/801 for students and researchers). National rules cite the underlying act (e.g. Germany's <em>AufenthG</em>, France's <em>CESEDA</em>).
          </p>
          <ul className="mt-3 space-y-2">
            {PRIMARY_SOURCES.map((s) => (
              <li key={s.label} className="rounded-xl border border-border bg-background p-3">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary">
                  {s.label}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Library} title="Secondary sources">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cross-checked against reputable research institutions and legal networks.
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-2">
            {SECONDARY.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-background p-3 text-sm text-foreground hover:border-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={RefreshCw} title="Update cadence">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Country data is reviewed on a rolling basis. Rules that change frequently (fees, income thresholds, quotas) are flagged for quarterly review; treaty status and directive numbers are reviewed annually. Where a rule is time-sensitive, the checklist links to the official portal so users always have the source of truth.
          </p>
        </Section>

        <Section icon={ShieldCheck} title="Editorial policy">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Information, not legal advice. For binding advice, consult a qualified immigration lawyer.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Plain language first — bureaucratic phrasing appears only alongside a translation.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> No paid placement, no ads, no affiliate links.</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Comparative framing: rules are shown in context, not as a single "correct" answer.</li>
          </ul>
        </Section>

        <Section icon={AlertTriangle} title="Limitations">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Immigration law changes without warning. Individual circumstances (dual nationality, prior overstays, criminal record, family status) can override generic guidance. Always confirm current requirements with the destination country's embassy or an accredited lawyer before making irreversible decisions.
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

function Section({ icon: Icon, title, children }: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
