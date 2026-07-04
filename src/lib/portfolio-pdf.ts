import { jsPDF } from "jspdf";

// Portfolio one-pager PDF summarising the project for print portfolios /
// admissions committees. Rendered with jsPDF's vector primitives so the
// output stays crisp and text is selectable.

type Section = { title: string; body: string[] };

const SECTIONS: Section[] = [
  {
    title: "Overview",
    body: [
      "Crosspath.move is a free, ad-free relocation and visa-planning app for international students, remote workers, families and people seeking protection abroad.",
      "It turns fragmented immigration rules into country-specific checklists, deadlines, cost estimates and plain-language explanations — all traced back to primary legal sources.",
    ],
  },
  {
    title: "Methodology",
    body: [
      "Every requirement is traced to a primary instrument: EU directives (e.g. 2016/801 students & researchers, 2003/86 family reunification), national statutes (Germany AufenthG, France CESEDA), and treaty law (1951 Refugee Convention, 1961 Hague Apostille, VCCR Art. 36).",
      "Cross-checked against EUR-Lex, the EU Immigration Portal, EUAA, UNHCR Refworld, IOM and MPI. Time-sensitive rules link to the official portal so users always reach the source of truth.",
      "Editorial policy: information, not legal advice; plain language first; no ads, tracking or affiliate links.",
    ],
  },
  {
    title: "Sample outputs",
    body: [
      "Checklist — Poland to Germany for university: passport, national D-visa, university admission, blocked account (Sperrkonto ~€11,904/yr), health insurance, Anmeldung, Aufenthaltstitel §16b AufenthG.",
      "Rights — VCCR Art. 36 consular access, non-refoulement (1951 Conv. Art. 33), Schengen Borders Code appeal against refusal of entry, EU Charter Art. 18 & 19.",
      "Case law — Hirsi Jamaa v. Italy (ECtHR 2012), M.S.S. v. Belgium & Greece (2011), Chakroun (CJEU C-578/08), Zambrano (C-34/09), Metock (C-127/08).",
    ],
  },
  {
    title: "What I built",
    body: [
      "10+ purpose-built routes: checklist, cost, compare, terms, legal, rights, case-law, asylum, methodology, about.",
      "65+ country dataset with legal-pathway fields (permanent residency, citizenship, dual nationality, post-study work).",
      "8-language interface, semantic design tokens, mobile-first shell, no third-party tracking.",
    ],
  },
  {
    title: "What I learned",
    body: [
      "Comparative legal research across EU and national instruments, and how EU competence interacts with Member State discretion.",
      "Plain-language drafting of technical legal terms without losing precision.",
      "Product-design tradeoffs between depth (citations, edge cases) and usability (a single next action).",
    ],
  },
  {
    title: "Primary sources",
    body: [
      "EUR-Lex — eur-lex.europa.eu",
      "EU Immigration Portal — home-affairs.ec.europa.eu",
      "EUAA (formerly EASO) — euaa.europa.eu",
      "UNHCR Refworld — refworld.org",
      "HCCH Apostille Section — hcch.net",
      "IOM World Migration Report — worldmigrationreport.iom.int",
    ],
  },
];

export function downloadPortfolioPdf() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentW = pageW - margin * 2;

  // Header band
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageW, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Crosspath.move", margin, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Relocation & visa planning — portfolio one-pager", margin, 60);
  doc.setFontSize(8);
  doc.setTextColor(180, 200, 220);
  doc.text(
    `crosspath.lovable.app  ·  Maria Banys  ·  ${new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}`,
    margin,
    76,
  );

  // Two-column layout
  const colGap = 20;
  const colW = (contentW - colGap) / 2;
  const cols: { x: number; y: number }[] = [
    { x: margin, y: 110 },
    { x: margin + colW + colGap, y: 110 },
  ];
  let ci = 0;
  const bottomLimit = pageH - 60;

  for (const section of SECTIONS) {
    // Estimate height
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const titleH = 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const bodyLines = section.body.flatMap((p) => doc.splitTextToSize(p, colW) as string[]);
    const gapAfterPara = 4;
    const bodyH = bodyLines.length * 11 + section.body.length * gapAfterPara;
    const total = titleH + bodyH + 14;

    let col = cols[ci];
    if (col.y + total > bottomLimit) {
      ci = ci === 0 ? 1 : 0;
      col = cols[ci];
      if (col.y + total > bottomLimit) {
        // out of room — stop gracefully
        break;
      }
    }

    // Accent bar
    doc.setFillColor(59, 130, 246); // blue-500
    doc.rect(col.x, col.y - 10, 3, 12, "F");

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(section.title.toUpperCase(), col.x + 10, col.y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    let y = col.y + 14;
    for (const para of section.body) {
      const lines = doc.splitTextToSize(para, colW) as string[];
      doc.text(lines, col.x, y);
      y += lines.length * 11 + gapAfterPara;
    }
    col.y = y + 10;
  }

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageH - 40, pageW - margin, pageH - 40);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Information, not legal advice.  ·  Sources: EUR-Lex, EUAA, UNHCR, HCCH, IOM.", margin, pageH - 24);
  doc.text("crosspath.lovable.app", pageW - margin, pageH - 24, { align: "right" });

  doc.save("crosspath-move-portfolio.pdf");
}
