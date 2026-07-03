import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LifeBuoy, Scale, ExternalLink, ShieldAlert, BookOpen } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/asylum")({
  head: () => ({
    meta: [
      { title: "Asylum & Protection Guide — Crosspath.move" },
      { name: "description", content: "Plain-language guide to asylum, subsidiary protection and temporary protection in Europe: rights during the procedure, work access and where to find free legal help." },
      { property: "og:title", content: "Asylum & Protection Guide — Crosspath.move" },
      { property: "og:description", content: "Asylum, subsidiary and temporary protection explained — with rights during the procedure and free-legal-aid contacts." },
      { property: "og:url", content: "https://crosspath.lovable.app/asylum" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: "Asylum & Protection Guide — Crosspath.move" },
      { name: "twitter:description", content: "How asylum, subsidiary and temporary protection work in Europe, in plain language." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/asylum" }],
  }),
  component: AsylumPage,
});

const PROTECTIONS = [
  {
    name: "Refugee status",
    basis: "1951 Refugee Convention, Art. 1A(2); EU Qualification Directive 2011/95/EU, Art. 2(d).",
    who: "Someone with a well-founded fear of persecution on grounds of race, religion, nationality, political opinion or membership of a particular social group.",
    duration: "Typically 3–5 years, renewable; leads to long-term residence.",
  },
  {
    name: "Subsidiary protection",
    basis: "EU Qualification Directive 2011/95/EU, Art. 15.",
    who: "People who don't meet the refugee definition but would face a real risk of serious harm (death penalty, torture, indiscriminate violence in armed conflict) if returned.",
    duration: "Usually 1–3 years, renewable.",
  },
  {
    name: "Temporary protection",
    basis: "EU Temporary Protection Directive 2001/55/EC (activated for Ukraine in 2022 by Council Decision 2022/382).",
    who: "Groups displaced by mass influx — a fast-track collective status that skips individual assessment.",
    duration: "Up to 3 years; currently extended for beneficiaries from Ukraine until March 2026.",
  },
];

const RIGHTS = [
  { title: "Right to stay during the procedure", detail: "You cannot be removed while your claim is examined (Asylum Procedures Directive 2013/32/EU, Art. 9)." },
  { title: "Right to an interpreter and information", detail: "Interviews must be in a language you understand, free of charge (Art. 12)." },
  { title: "Right to legal assistance", detail: "Free legal aid is available at appeal stage; NGOs assist earlier (Art. 20–22)." },
  { title: "Access to work", detail: "Latest 6 months after lodging your claim if no first-instance decision has been issued (Reception Conditions Directive 2013/33/EU, Art. 15)." },
  { title: "Reception conditions", detail: "Housing, food, healthcare and a daily allowance must be provided (Art. 17–19)." },
  { title: "Non-refoulement", detail: "You cannot be returned to a country where you face persecution or serious harm (1951 Convention Art. 33; ECHR Art. 3)." },
];

const HELP = [
  { label: "UNHCR Help", url: "https://help.unhcr.org/", note: "Country-by-country asylum information from the UN Refugee Agency." },
  { label: "EUAA — EU Agency for Asylum", url: "https://euaa.europa.eu/", note: "Official EU asylum information and country reports." },
  { label: "ELENA network", url: "https://ecre.org/our-work/elena/", note: "European legal network of specialist asylum lawyers." },
  { label: "Refworld", url: "https://www.refworld.org/", note: "UNHCR database of legal instruments and country of origin information." },
];

function AsylumPage() {
  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> Tools
        </Link>
      </div>
      <PageHeader
        eyebrow="Protection"
        title="Asylum & Protection"
        subtitle="What the three main forms of protection are, and the rights that come with them."
      />

      <div className="px-6 pb-12 space-y-4">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            This page is information, not legal advice. If you are seeking protection, contact the national asylum authority or a lawyer as soon as you can — deadlines are strict.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Three forms of protection</h2>
          {PROTECTIONS.map((p) => (
            <article key={p.name} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <LifeBuoy className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                <Row label="Who it's for" value={p.who} />
                <Row label="Duration" value={p.duration} />
                <Row label="Legal basis" value={p.basis} />
              </dl>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Rights during the procedure</h2>
          </div>
          <ul className="mt-3 space-y-3">
            {RIGHTS.map((r) => (
              <li key={r.title} className="border-l-2 border-primary/40 pl-3">
                <p className="text-sm font-medium text-foreground">{r.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{r.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">Where to get help</h2>
          </div>
          <ul className="mt-3 space-y-2">
            {HELP.map((h) => (
              <li key={h.label} className="rounded-xl border border-border bg-background p-3">
                <a href={h.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary">
                  {h.label} <ExternalLink className="h-3 w-3" />
                </a>
                <p className="mt-1 text-xs text-muted-foreground">{h.note}</p>
              </li>
            ))}
          </ul>
        </section>
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
