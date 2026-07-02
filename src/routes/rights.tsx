import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Scale, Phone, FileText } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/rights")({
  head: () => ({
    meta: [
      { title: "Know Your Rights — Borders, Detention & Migrant Protections" },
      { name: "description", content: "Core rights of migrants and travellers at borders and inside host states: non-refoulement, right to interpretation, legal aid and consular access." },
      { property: "og:title", content: "Know Your Rights — Crosspath.move" },
      { property: "og:description", content: "Plain-language rights at borders and inside host states, grounded in ECHR, EU Charter and international refugee law." },
      { property: "og:url", content: "https://crosspath.lovable.app/rights" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: "Know Your Rights at the Border — Crosspath.move" },
      { name: "twitter:description", content: "Non-refoulement, interpretation, legal aid and consular access explained." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/rights" }],
  }),
  component: RightsPage,
});

type Right = {
  title: string;
  summary: string;
  basis: { label: string; url: string }[];
};

const AT_BORDER: Right[] = [
  {
    title: "Right to seek asylum",
    summary: "You can request international protection at any border or on the territory. Officials cannot refuse to register your claim.",
    basis: [
      { label: "1951 Refugee Convention, Art. 31–33", url: "https://www.unhcr.org/media/convention-and-protocol-relating-status-refugees" },
      { label: "EU Charter, Art. 18", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012P/TXT" },
    ],
  },
  {
    title: "Non-refoulement",
    summary: "You cannot be returned to a country where you face a real risk of torture, persecution or inhuman treatment — even if you entered irregularly.",
    basis: [
      { label: "ECHR Art. 3 (Soering v. UK)", url: "https://hudoc.echr.coe.int/eng?i=001-57619" },
      { label: "1951 Refugee Convention, Art. 33", url: "https://www.unhcr.org/media/convention-and-protocol-relating-status-refugees" },
    ],
  },
  {
    title: "Right to an interpreter",
    summary: "During any formal interview or detention hearing, you are entitled to a qualified interpreter in a language you understand — free of charge.",
    basis: [
      { label: "Directive 2010/64/EU", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32010L0064" },
    ],
  },
  {
    title: "Right to be informed of the reason for refusal",
    summary: "If you are refused entry, you must receive a written, reasoned decision and information on how to appeal.",
    basis: [
      { label: "Schengen Borders Code, Art. 14", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0399" },
    ],
  },
];

const IN_COUNTRY: Right[] = [
  {
    title: "Right to legal aid",
    summary: "In asylum and removal procedures you have the right to legal information and, in most EU states, to free legal assistance at the appeal stage.",
    basis: [
      { label: "Directive 2013/32/EU, Art. 20", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013L0032" },
    ],
  },
  {
    title: "Consular access",
    summary: "If you are detained, the authorities must inform your consulate on request and let you communicate with them.",
    basis: [
      { label: "Vienna Convention on Consular Relations, Art. 36", url: "https://legal.un.org/ilc/texts/instruments/english/conventions/9_2_1963.pdf" },
    ],
  },
  {
    title: "Right to family life",
    summary: "Removal decisions must weigh the impact on your family life. Family reunification is a right for many long-term residents and refugees.",
    basis: [
      { label: "ECHR Art. 8", url: "https://www.echr.coe.int/documents/d/echr/convention_eng" },
      { label: "Directive 2003/86/EC", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32003L0086" },
    ],
  },
  {
    title: "Effective remedy",
    summary: "You have the right to challenge a negative decision before a court or independent tribunal, with suspensive effect where removal would cause irreversible harm.",
    basis: [
      { label: "EU Charter, Art. 47", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012P/TXT" },
      { label: "ECtHR, M.S.S. v. Belgium and Greece", url: "https://hudoc.echr.coe.int/eng?i=001-103050" },
    ],
  },
];

function RightsPage() {
  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> Tools
        </Link>
      </div>
      <PageHeader
        eyebrow="Rights"
        title="Know Your Rights"
        subtitle="Core protections at borders and inside host states — with the legal basis for each."
      />

      <div className="px-6 pb-12 space-y-6">
        <RightGroup icon={Shield} title="At the border" items={AT_BORDER} />
        <RightGroup icon={Scale} title="Inside the host state" items={IN_COUNTRY} />

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" strokeWidth={1.8} />
            <h2 className="text-sm font-semibold text-foreground">If something goes wrong</h2>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Ask, in writing, for the reason and the name of the officer.</li>
            <li>• Request an interpreter and a lawyer before signing anything.</li>
            <li>• Contact your consulate; they can visit and forward messages.</li>
            <li>• Reach ELENA, UNHCR or a local NGO for urgent legal help.</li>
          </ul>
        </div>

        <p className="flex items-start gap-2 rounded-xl border border-border bg-background p-3 text-xs text-muted-foreground">
          <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          This page is educational information, not legal advice. Rights and procedures vary by country and change over time — verify with the linked instruments or a qualified lawyer.
        </p>
      </div>
    </AppShell>
  );
}

function RightGroup({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; title: string; items: Right[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
        <h2 className="text-xs uppercase tracking-[0.25em] text-foreground font-mono">{title}</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.basis.map((b) => (
                <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-background px-3 py-1 text-[11px] text-foreground hover:border-primary">
                  {b.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
