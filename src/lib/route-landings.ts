export type RouteLanding = {
  slug: string;
  from: string; // ISO code used by buildTrip
  to: string;
  reason: string; // REASONS id
  fromName: string;
  fromFlag: string;
  toName: string;
  toFlag: string;
  reasonLabel: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  visaLine: string;
  facts: { label: string; value: string }[];
  preview: { title: string; local?: string; note: string; when: string }[];
  nextSteps: string[];
  faq: { q: string; a: string }[];
  guideSlug?: string;
};

export const ROUTE_LANDINGS: RouteLanding[] = [
  {
    slug: "poland-to-germany-study",
    from: "PL",
    to: "DE",
    reason: "study",
    fromName: "Poland",
    fromFlag: "🇵🇱",
    toName: "Germany",
    toFlag: "🇩🇪",
    reasonLabel: "Study",
    metaTitle: "Poland to Germany for Study — Documents, Anmeldung & Checklist",
    metaDescription:
      "Moving from Poland to Germany to study? Full checklist for Polish students: no visa needed, Anmeldung within 14 days, EHIC vs German insurance, Steuer-ID, enrolment and costs.",
    intro:
      "As a Polish citizen you move to Germany under EU free movement — no visa, no residence permit. What actually trips students up is the German registration chain: Anmeldung, then tax ID, then bank account, then enrolment. Get the order wrong and everything stalls.",
    visaLine: "No visa required — EU free movement (Directive 2004/38/EC).",
    facts: [
      { label: "Visa", value: "Not required (EU citizen)" },
      { label: "Realistic timeline", value: "6–10 weeks" },
      { label: "Semester fee", value: "€150–€350 incl. transport" },
      { label: "Health cover", value: "EKUZ/EHIC + insurer exemption" },
      { label: "Registration deadline", value: "14 days after moving in" },
      { label: "Work allowed", value: "Unrestricted (EU citizen)" },
    ],
    preview: [
      { title: "Letter of admission", local: "Zulassungsbescheid", note: "Every later step asks for a copy.", when: "2–4 months before" },
      { title: "Housing + landlord confirmation", local: "Wohnungsgeberbestätigung", note: "Without it the Anmeldung is refused.", when: "Apply 4–6 months before" },
      { title: "Address registration", local: "Anmeldung", note: "Legally required within 14 days; book the slot before you fly.", when: "First 2 weeks" },
      { title: "Health insurance exemption", local: "Befreiung", note: "EKUZ alone is not enough for enrolment — get the written exemption from a German public insurer.", when: "Before enrolment" },
      { title: "Tax ID + bank account", local: "Steuer-ID", note: "Arrives by post 2–3 weeks after the Anmeldung.", when: "Weeks 3–5" },
      { title: "Enrolment", local: "Immatrikulation", note: "Admission letter, insurance proof, Anmeldung, paid semester fee.", when: "First 2 weeks of semester" },
    ],
    nextSteps: [
      "Generate the full tracked checklist with deadlines for this exact route.",
      "Book the Bürgeramt Anmeldung slot online now — big cities run 4–6 weeks out.",
      "Ask your German insurer for the EKUZ-based exemption letter in writing.",
      "Deregister in Poland (wymeldowanie) only if you are giving up your Polish address.",
    ],
    faq: [
      { q: "Do Polish citizens need a visa to study in Germany?", a: "No. Poland is an EU member state, so you enter with an ID card or passport under Directive 2004/38/EC. You still must register your address within 14 days." },
      { q: "Is EKUZ enough for enrolment in Germany?", a: "Not by itself. Universities require confirmation from a German statutory insurer — typically a written exemption (Befreiung) issued on the basis of your EKUZ/EHIC." },
      { q: "How much does it cost to move from Poland to Germany as a student?", a: "Budget roughly €1,500–€3,000 up front: deposit (1–3 months rent), first month's rent of €300–€700, and the €150–€350 semester contribution." },
    ],
    guideSlug: "erasmus-germany",
  },
  {
    slug: "india-to-germany-work",
    from: "IN",
    to: "DE",
    reason: "work",
    fromName: "India",
    fromFlag: "🇮🇳",
    toName: "Germany",
    toFlag: "🇩🇪",
    reasonLabel: "Work",
    metaTitle: "India to Germany Work Visa — EU Blue Card Checklist & Timeline",
    metaDescription:
      "Moving from India to Germany for work: EU Blue Card salary thresholds, ANABIN degree check, embassy appointment, Anmeldung and residence permit — timeline and document list.",
    intro:
      "The German work visa itself is rarely the bottleneck for Indian applicants — the ANABIN degree check and the embassy appointment queue are. Start both before you have signed anything.",
    visaLine: "National D visa required, then converted to an EU Blue Card in Germany.",
    facts: [
      { label: "Visa", value: "National D visa → EU Blue Card" },
      { label: "Blue Card salary", value: "≈ €48,300 (≈ €43,759 shortage roles)" },
      { label: "Processing", value: "1–4 months (4–8 weeks fast-track)" },
      { label: "Visa fee", value: "€75" },
      { label: "Degree check", value: "ANABIN — must be H+ / equivalent" },
      { label: "Permanent residence", value: "21 months with B1 German" },
    ],
    preview: [
      { title: "ANABIN degree verification", note: "Your university and course must appear as recognised; otherwise apply for a statement of comparability.", when: "Start 3 months ahead" },
      { title: "Employment contract", note: "Must state gross annual salary meeting the Blue Card threshold — bonuses don't count.", when: "Before applying" },
      { title: "Embassy appointment", note: "Slots in Delhi, Mumbai, Bengaluru and Chennai run 4–12 weeks out. Book the day you sign.", when: "Immediately" },
      { title: "Document set with apostilles", note: "Degree, transcripts and marriage/birth certificates need apostille plus certified translation.", when: "4–6 weeks" },
      { title: "Anmeldung after arrival", note: "Within 14 days; produces the Meldebescheinigung and tax ID needed for your first salary.", when: "First 2 weeks" },
      { title: "Blue Card at the Ausländerbehörde", note: "Apply before the D visa expires; the card arrives 4–6 weeks later.", when: "Within 90 days" },
    ],
    nextSteps: [
      "Check your university on ANABIN before negotiating salary.",
      "Ask your employer to run the accelerated skilled-worker procedure (€411, guarantees a 3-week appointment).",
      "Start apostille collection in India now — state HRD attestation is the slow part.",
      "File your spouse's application together with yours, not afterwards.",
    ],
    faq: [
      { q: "What salary do Indian applicants need for the EU Blue Card?", a: "Around €48,300 gross per year in 2026, or roughly €43,759 for shortage occupations and recent graduates. The figure must appear in the contract itself." },
      { q: "How long does a German work visa take from India?", a: "Usually one to four months from the appointment, plus the appointment wait. The employer-run fast-track procedure cuts total time to about four to eight weeks." },
      { q: "Do I need German language skills?", a: "No for the Blue Card itself, but B1 German shortens the route to permanent residence to 21 months instead of 27." },
    ],
    guideSlug: "work-visa-germany",
  },
  {
    slug: "usa-to-spain-nomad",
    from: "US",
    to: "ES",
    reason: "nomad",
    fromName: "United States",
    fromFlag: "🇺🇸",
    toName: "Spain",
    toFlag: "🇪🇸",
    reasonLabel: "Digital nomad",
    metaTitle: "US to Spain Digital Nomad Visa — Income, Documents & Tax Checklist",
    metaDescription:
      "Americans moving to Spain as remote workers: income threshold, FBI background check with apostille, US–Spain social security certificate, NIE, TIE and the 24% Beckham Law regime.",
    intro:
      "For US applicants the Spanish digital nomad visa hinges on three documents: the FBI identity-history summary with a Hague apostille, the US–Spain social security certificate of coverage, and a compliant Spanish health policy. Everything else is routine.",
    visaLine: "Teleworker residence permit under Ley 28/2022 — apply at a consulate (1 year) or the UGE in Spain (3 years).",
    facts: [
      { label: "Income requirement", value: "≈ €2,762 / month" },
      { label: "UGE decision", value: "20 working days" },
      { label: "Permit length", value: "3 years (UGE) / 1 year (consulate)" },
      { label: "Spanish-client cap", value: "Max 20% of income" },
      { label: "Tax option", value: "24% flat up to €600k (Beckham Law)" },
      { label: "Health cover", value: "Spanish policy, no co-payment" },
    ],
    preview: [
      { title: "FBI background check + apostille", note: "Order the identity-history summary, then apostille it at the US Department of State. Must be under 90 days old at submission.", when: "6–8 weeks" },
      { title: "Certificate of coverage", note: "From the US Social Security Administration under the US–Spain totalization agreement — the top refusal ground when missing.", when: "4–8 weeks" },
      { title: "Employer or client proof", note: "Remote-work authorisation letter, contract, and 3–6 months of invoices or payslips.", when: "2–3 weeks" },
      { title: "Sworn translations", local: "Traductor jurado", note: "Only Spain-recognised sworn translators are accepted — not any certified translator.", when: "1–2 weeks" },
      { title: "NIE + application submission", note: "Pay modelo 790 code 038 and file with the UGE electronically or at the consulate.", when: "Day of filing" },
      { title: "Padrón + TIE fingerprints", note: "Register at the town hall, then book the toma de huellas for the residence card.", when: "Within 30 days" },
    ],
    nextSteps: [
      "Order the FBI check today — it is the longest lead item.",
      "Request the SSA certificate of coverage in parallel.",
      "Buy a Spanish health policy with zero co-pay before filing, not after.",
      "Diary the six-month Beckham Law deadline (modelo 149) the day you register.",
    ],
    faq: [
      { q: "How much do Americans need to earn for Spain's nomad visa?", a: "About €2,762 per month — 200% of the Spanish minimum wage — plus 75% of the minimum wage for the first dependant and 25% for each additional one." },
      { q: "Can I keep my US employer?", a: "Yes. That is exactly the case the permit is designed for, provided the company has traded for at least a year and authorises you to work remotely from Spain." },
      { q: "Will I pay US and Spanish tax?", a: "You still file with the IRS as a US citizen, but the US–Spain tax treaty and foreign tax credits prevent double taxation, and the Beckham Law caps Spanish tax at a flat 24%." },
    ],
    guideSlug: "digital-nomad-spain",
  },
  {
    slug: "uk-to-portugal-work",
    from: "GB",
    to: "PT",
    reason: "work",
    fromName: "United Kingdom",
    fromFlag: "🇬🇧",
    toName: "Portugal",
    toFlag: "🇵🇹",
    reasonLabel: "Work",
    metaTitle: "UK to Portugal Work Visa — Post-Brexit Checklist & NIF Guide",
    metaDescription:
      "British citizens moving to Portugal for work after Brexit: D1 work visa, NIF and Portuguese bank account, AIMA residence appointment, social security and timelines.",
    intro:
      "Since Brexit, British citizens are third-country nationals in Portugal: 90 days in any 180 as a visitor, and a national visa for anything longer. The Portuguese sequence is NIF first, then bank account, then visa, then AIMA.",
    visaLine: "D1 subordinate-work national visa, then a residence permit issued by AIMA.",
    facts: [
      { label: "Visa", value: "D1 national work visa" },
      { label: "Visa-free stay", value: "90 days in any 180" },
      { label: "Processing", value: "2–4 months" },
      { label: "Minimum wage benchmark", value: "≈ €870 / month" },
      { label: "Permanent residence", value: "5 years" },
      { label: "First requirement", value: "NIF tax number" },
    ],
    preview: [
      { title: "Get a NIF", local: "Número de Identificação Fiscal", note: "Needed for the bank, lease, contract and utilities. Obtainable through a fiscal representative before you move.", when: "1–2 weeks" },
      { title: "Employment contract or promise of contract", note: "Must be registered with the Portuguese labour authority (ACT) for the visa file.", when: "Before applying" },
      { title: "VFS visa appointment", note: "Apply from the UK with contract, criminal record certificate (ACRO), proof of accommodation and travel insurance.", when: "Book 4–8 weeks ahead" },
      { title: "Portuguese bank account", note: "Opens once you have the NIF; needed for salary and rent.", when: "On arrival" },
      { title: "AIMA residence appointment", note: "Pre-scheduled with the visa; convert the D1 into a residence permit.", when: "Within 120 days of entry" },
      { title: "Social security number", local: "NISS", note: "Registered by your employer; unlocks healthcare (SNS user number).", when: "First month" },
    ],
    nextSteps: [
      "Apply for your NIF through a fiscal representative before booking anything else.",
      "Order the ACRO police certificate early and get it apostilled.",
      "Confirm your employer has registered the contract with ACT.",
      "Keep the AIMA appointment slip — rescheduling can take months.",
    ],
    faq: [
      { q: "Can UK citizens still move to Portugal freely?", a: "No. Since 1 January 2021 British citizens are third-country nationals — 90 days in any 180 without a visa, and a national visa such as the D1 for work beyond that." },
      { q: "What is a NIF and why do I need it first?", a: "It is the Portuguese tax number. Without it you cannot open a bank account, sign a lease, or complete most administrative steps, so it is the first thing to arrange." },
      { q: "How long until permanent residence?", a: "Five years of legal residence, after which permanent residence or citizenship (with an A2 Portuguese test) becomes possible." },
    ],
  },
  {
    slug: "ukraine-to-poland-refuge",
    from: "UA",
    to: "PL",
    reason: "refuge",
    fromName: "Ukraine",
    fromFlag: "🇺🇦",
    toName: "Poland",
    toFlag: "🇵🇱",
    reasonLabel: "Protection",
    metaTitle: "Ukraine to Poland — Temporary Protection, PESEL UKR & Rights Checklist",
    metaDescription:
      "Practical checklist for Ukrainians in Poland: temporary protection under Directive 2001/55/EC, PESEL UKR registration, healthcare, work rights, schooling and legal aid contacts.",
    intro:
      "Ukrainian citizens in Poland are covered by EU temporary protection, which grants residence, work and healthcare without an asylum procedure. The single document that unlocks everything is the PESEL UKR number.",
    visaLine: "Temporary protection under Council Directive 2001/55/EC and Poland's special act — no visa needed.",
    facts: [
      { label: "Status", value: "Temporary protection" },
      { label: "Legal basis", value: "Directive 2001/55/EC" },
      { label: "Work permission", value: "Immediate, no permit needed" },
      { label: "Healthcare", value: "Same access as insured residents" },
      { label: "Key document", value: "PESEL UKR" },
      { label: "Schooling", value: "Compulsory and free" },
    ],
    preview: [
      { title: "Register for PESEL UKR", note: "At any city or municipal office (urząd gminy). Bring any ID document; a biometric photo is taken on site.", when: "As soon as possible" },
      { title: "Set up a trusted profile", local: "Profil Zaufany", note: "Digital signature used for benefits, healthcare and the diia.pl document.", when: "Same appointment" },
      { title: "Healthcare registration", note: "Temporary protection gives access to NFZ-funded care on the same terms as insured residents.", when: "Immediately" },
      { title: "Work or register as unemployed", note: "No work permit is required; the employer notifies the labour office within 7 days." },
      { title: "Enrol children in school", note: "Free and compulsory; preparatory classes are available for Ukrainian-speaking pupils.", when: "Within weeks of arrival" },
      { title: "Free legal aid", note: "Contact UNHCR Poland or the Helsinki Foundation for Human Rights for status and family questions.", when: "Any time" },
    ],
    nextSteps: [
      "Book the PESEL UKR appointment at the nearest urząd gminy.",
      "Create Profil Zaufany at the same visit — most services require it.",
      "Keep every registration confirmation; renewals depend on them.",
      "If your situation is complex (no documents, family separation), request free legal aid before applying for anything else.",
    ],
    faq: [
      { q: "Do Ukrainians need to apply for asylum in Poland?", a: "No. Temporary protection under Directive 2001/55/EC applies automatically and gives residence, work and healthcare rights without going through the asylum procedure." },
      { q: "What is PESEL UKR?", a: "A Polish national identification number issued specifically to people under temporary protection. It is required for healthcare, benefits, banking, schooling and employment." },
      { q: "Can I work immediately?", a: "Yes — no work permit is needed. Your employer simply notifies the district labour office within seven days of you starting." },
    ],
  },
  {
    slug: "nigeria-to-canada-study",
    from: "NG",
    to: "CA",
    reason: "study",
    fromName: "Nigeria",
    fromFlag: "🇳🇬",
    toName: "Canada",
    toFlag: "🇨🇦",
    reasonLabel: "Study",
    metaTitle: "Nigeria to Canada Study Permit — PAL, GIC & Document Checklist",
    metaDescription:
      "Nigerian students applying to Canada: provincial attestation letter, proof of funds and GIC, biometrics, medical exam, study permit timeline and post-graduation work permit rules.",
    intro:
      "Canada tightened study-permit rules with caps and provincial attestation letters, so the paperwork order matters more than ever. Funds proof and the PAL are what most refusals turn on.",
    visaLine: "Study permit plus a temporary resident visa; a provincial attestation letter (PAL/TAL) is required for most programmes.",
    facts: [
      { label: "Proof of funds", value: "≈ CAD 22,895 + tuition" },
      { label: "Attestation letter", value: "PAL/TAL required for most applicants" },
      { label: "Processing", value: "6–14 weeks" },
      { label: "Permit fee", value: "CAD 150 + CAD 85 biometrics" },
      { label: "Work during studies", value: "Up to 24 h/week off campus" },
      { label: "After graduation", value: "PGWP up to 3 years (eligible programmes)" },
    ],
    preview: [
      { title: "Letter of acceptance from a DLI", note: "Only designated learning institutions qualify; confirm the programme is PGWP-eligible before paying deposits.", when: "4–8 months before" },
      { title: "Provincial attestation letter (PAL/TAL)", note: "Issued by the province via your school — the application is rejected without it where required.", when: "After acceptance" },
      { title: "Proof of funds / GIC", note: "A Guaranteed Investment Certificate of about CAD 22,895 plus first-year tuition is the cleanest evidence.", when: "Before filing" },
      { title: "Study permit application", note: "File online with the acceptance letter, PAL, funds, passport and statement of purpose.", when: "6–14 weeks processing" },
      { title: "Biometrics + medical exam", note: "Biometrics at a VAC in Lagos or Abuja; the medical must be with an IRCC panel physician.", when: "Within 30 days of the request" },
      { title: "Arrival and SIN", note: "Get your study permit at the border, then apply for a Social Insurance Number to work legally.", when: "First 2 weeks" },
    ],
    nextSteps: [
      "Confirm your programme appears on the PGWP-eligible list before accepting an offer.",
      "Open the GIC early — bank processing from Nigeria can take weeks.",
      "Write a specific statement of purpose; generic ones drive refusals.",
      "Book biometrics as soon as the request letter arrives; the 30-day window is strict.",
    ],
    faq: [
      { q: "How much money do Nigerian students need for a Canadian study permit?", a: "Around CAD 22,895 in living costs for a single applicant, plus the first year of tuition, usually evidenced through a GIC." },
      { q: "What is a PAL and do I need one?", a: "A provincial attestation letter confirming you count against the province's study-permit allocation. Most college and undergraduate applicants need one; some master's and doctoral programmes are exempt." },
      { q: "Can I work while studying in Canada?", a: "Yes — up to 24 hours per week off campus during term and full time during scheduled breaks, once your studies have started." },
    ],
  },
];

export function getRouteLanding(slug: string): RouteLanding | undefined {
  return ROUTE_LANDINGS.find((r) => r.slug === slug);
}