import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Gavel, ExternalLink } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/case-law")({
  head: () => ({
    meta: [
      { title: "Landmark Migration Case Law — ECtHR, CJEU & UN" },
      { name: "description", content: "Short summaries of leading judgments on migration and asylum: Hirsi Jamaa, M.S.S., N.D. and N.T., Zambrano, Chakroun and more." },
      { property: "og:title", content: "Landmark Migration Case Law — Crosspath.move" },
      { property: "og:description", content: "European and international judgments that shape the rights of migrants and refugees." },
      { property: "og:url", content: "https://crosspath.lovable.app/case-law" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: "Landmark Migration Case Law — Crosspath.move" },
      { name: "twitter:description", content: "Leading ECtHR and CJEU judgments on migration and asylum, in plain language." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/case-law" }],
  }),
  component: CaseLawPage,
});

type Case = {
  name: string;
  citation: string;
  court: "ECtHR" | "CJEU" | "UN" | "National";
  year: number;
  issue: string;
  holding: string;
  matters: string;
  url: string;
};

const CASES: Case[] = [
  {
    name: "Hirsi Jamaa and Others v. Italy",
    citation: "App. no. 27765/09",
    court: "ECtHR",
    year: 2012,
    issue: "Interception and pushback of migrants at sea to Libya.",
    holding: "Violation of ECHR Art. 3 and Art. 4 of Protocol No. 4 — the prohibition of collective expulsion applies extraterritorially on the high seas.",
    matters: "Foundational for the extraterritorial reach of non-refoulement in maritime operations.",
    url: "https://hudoc.echr.coe.int/eng?i=001-109231",
  },
  {
    name: "M.S.S. v. Belgium and Greece",
    citation: "App. no. 30696/09",
    court: "ECtHR",
    year: 2011,
    issue: "Dublin transfer of an asylum seeker to Greece.",
    holding: "Both Belgium (for transferring) and Greece (for conditions) violated ECHR Art. 3 and Art. 13. Presumption of safety under Dublin is rebuttable.",
    matters: "Reshaped the Dublin system and led to the recast Dublin III Regulation.",
    url: "https://hudoc.echr.coe.int/eng?i=001-103050",
  },
  {
    name: "N.D. and N.T. v. Spain",
    citation: "App. nos. 8675/15 and 8697/15",
    court: "ECtHR",
    year: 2020,
    issue: "Immediate return of migrants who scaled the Melilla border fence.",
    holding: "No violation on the facts, but the Court reaffirmed that collective expulsion requires an individual assessment where legal entry channels are genuinely accessible.",
    matters: "Sets a controversial standard for 'hot returns' and access to procedures.",
    url: "https://hudoc.echr.coe.int/eng?i=001-201353",
  },
  {
    name: "Ruiz Zambrano v. ONEm",
    citation: "C-34/09",
    court: "CJEU",
    year: 2011,
    issue: "Residence and work rights of a third-country parent of EU-citizen children.",
    holding: "Member States cannot deprive EU citizens of the genuine enjoyment of the substance of their rights — parents get derived residence rights.",
    matters: "Anchors derivative rights of third-country family members of static EU citizens.",
    url: "https://curia.europa.eu/juris/liste.jsf?num=C-34/09",
  },
  {
    name: "Chakroun v. Minister van Buitenlandse Zaken",
    citation: "C-578/08",
    court: "CJEU",
    year: 2010,
    issue: "Income requirements for family reunification under Directive 2003/86/EC.",
    holding: "Member States must apply the directive individually; blanket income thresholds that hinder reunification are unlawful.",
    matters: "Limits how strictly states can gate family reunification.",
    url: "https://curia.europa.eu/juris/liste.jsf?num=C-578/08",
  },
  {
    name: "Soering v. United Kingdom",
    citation: "App. no. 14038/88",
    court: "ECtHR",
    year: 1989,
    issue: "Extradition to a country where the applicant faced death-row conditions.",
    holding: "Removal engages Art. 3 where there is a real risk of inhuman or degrading treatment abroad.",
    matters: "Origin of the modern non-refoulement doctrine in ECHR case law.",
    url: "https://hudoc.echr.coe.int/eng?i=001-57619",
  },
];

function CaseLawPage() {
  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> Tools
        </Link>
      </div>
      <PageHeader
        eyebrow="Case law"
        title="Landmark Judgments"
        subtitle="European and international decisions that shape migration law today."
      />

      <div className="px-6 pb-12 space-y-3">
        {CASES.map((c) => (
          <article key={c.name} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">{c.name}</h2>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                  {c.court} · {c.year} · {c.citation}
                </p>
              </div>
              <Gavel className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Issue" value={c.issue} />
              <Row label="Holding" value={c.holding} />
              <Row label="Why it matters" value={c.matters} />
            </dl>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Read the judgment <ExternalLink className="h-3 w-3" />
            </a>
          </article>
        ))}

        <p className="rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
          Summaries are simplified for study use. For citation in academic work, always consult the original judgment and cross-reference with a reporter such as ECHR Reports, ECR, or CMLR.
        </p>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{label}</dt>
      <dd className="mt-0.5 text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
