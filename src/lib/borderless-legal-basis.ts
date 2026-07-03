// Legal-basis references shown at the top of the checklist route.
// Traces each move purpose back to the primary instruments that govern it.

export type LegalRef = {
  label: string;      // short display label
  cite: string;       // formal citation
  note: string;       // one-line plain-language explanation
  url: string;        // primary source link
};

// Country-agnostic, EU-focused baselines by move purpose.
// For non-EU destinations only the international-law entries apply directly.
const BY_REASON: Record<string, LegalRef[]> = {
  study: [
    {
      label: "EU Students & Researchers Directive",
      cite: "Directive (EU) 2016/801, Art. 7 & 11",
      note: "Harmonises conditions of entry and residence for third-country students across EU Member States.",
      url: "https://eur-lex.europa.eu/eli/dir/2016/801/oj",
    },
    {
      label: "Long-Term Residents Directive",
      cite: "Directive 2003/109/EC",
      note: "Grants EU long-term resident status after 5 years of legal residence.",
      url: "https://eur-lex.europa.eu/eli/dir/2003/109/oj",
    },
  ],
  work: [
    {
      label: "EU Single Permit Directive",
      cite: "Directive 2011/98/EU (recast 2024/1233)",
      note: "One combined work-and-residence permit and equal-treatment rights for third-country workers.",
      url: "https://eur-lex.europa.eu/eli/dir/2011/98/oj",
    },
    {
      label: "EU Blue Card Directive",
      cite: "Directive (EU) 2021/1883",
      note: "Fast-track residence for highly qualified employment across the EU.",
      url: "https://eur-lex.europa.eu/eli/dir/2021/1883/oj",
    },
  ],
  nomad: [
    {
      label: "Schengen Borders Code",
      cite: "Regulation (EU) 2016/399, Art. 6",
      note: "Entry conditions and the 90/180-day short-stay rule that constrains most nomad setups.",
      url: "https://eur-lex.europa.eu/eli/reg/2016/399/oj",
    },
    {
      label: "National digital-nomad statutes",
      cite: "e.g. Spain Ley 28/2022 Art. 74–bis; Portugal Lei 23/2007 (D8)",
      note: "Long-stay national visas created outside EU harmonisation for remote workers.",
      url: "https://www.boe.es/eli/es/l/2022/12/21/28",
    },
  ],
  family: [
    {
      label: "Family Reunification Directive",
      cite: "Directive 2003/86/EC",
      note: "Right of third-country nationals to be joined by spouse and minor children, subject to conditions.",
      url: "https://eur-lex.europa.eu/eli/dir/2003/86/oj",
    },
    {
      label: "Right to family life",
      cite: "ECHR Art. 8; EU Charter Art. 7",
      note: "Any refusal must be proportionate — reviewed extensively by the ECtHR and CJEU.",
      url: "https://www.echr.coe.int/documents/d/echr/convention_ENG",
    },
  ],
  travel: [
    {
      label: "Schengen Borders Code",
      cite: "Regulation (EU) 2016/399",
      note: "Uniform rules on entry, refusal of entry and the right of appeal at Schengen external borders.",
      url: "https://eur-lex.europa.eu/eli/reg/2016/399/oj",
    },
    {
      label: "Visa Code",
      cite: "Regulation (EC) 810/2009",
      note: "Procedures and conditions for issuing short-stay Schengen visas.",
      url: "https://eur-lex.europa.eu/eli/reg/2009/810/oj",
    },
  ],
  refuge: [
    {
      label: "1951 Refugee Convention",
      cite: "Art. 1A(2) & 33 (non-refoulement)",
      note: "The defining international instrument on refugee status and protection from return.",
      url: "https://www.unhcr.org/1951-refugee-convention",
    },
    {
      label: "EU Qualification Directive",
      cite: "Directive 2011/95/EU",
      note: "Defines refugee and subsidiary protection status and the rights attached to each.",
      url: "https://eur-lex.europa.eu/eli/dir/2011/95/oj",
    },
    {
      label: "Asylum Procedures Directive",
      cite: "Directive 2013/32/EU",
      note: "Common procedures for granting and withdrawing international protection in the EU.",
      url: "https://eur-lex.europa.eu/eli/dir/2013/32/oj",
    },
  ],
};

// Universal instruments shown for any move.
const UNIVERSAL: LegalRef[] = [
  {
    label: "Vienna Convention on Consular Relations",
    cite: "VCCR Art. 36",
    note: "Right to have your consulate notified and contacted if you are detained abroad.",
    url: "https://legal.un.org/ilc/texts/instruments/english/conventions/9_2_1963.pdf",
  },
  {
    label: "Hague Apostille Convention",
    cite: "1961 Hague Convention",
    note: "Determines whether your documents need only an apostille or full consular legalisation.",
    url: "https://www.hcch.net/en/instruments/conventions/full-text/?cid=41",
  },
];

export function getLegalBasis(reason: string): LegalRef[] {
  const base = BY_REASON[reason] ?? [];
  return [...base, ...UNIVERSAL];
}
