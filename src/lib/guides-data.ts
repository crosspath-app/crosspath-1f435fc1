export type GuideStep = {
  title: string;
  local?: string;
  detail: string;
  timing: string;
  cost?: string;
  link?: { label: string; url: string };
};

export type Guide = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  flag: string;
  route: string;
  legalBasis: { label: string; note: string; url: string }[];
  facts: { label: string; value: string }[];
  steps: GuideStep[];
  mistakes: string[];
  faq: { q: string; a: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "erasmus-germany",
    title: "Erasmus to Germany",
    h1: "Erasmus to Germany: full checklist",
    metaTitle: "Erasmus to Germany Checklist 2026 — Documents, Visa & Anmeldung",
    metaDescription:
      "Step-by-step Erasmus Germany checklist: enrolment, health insurance, Anmeldung address registration, blocked account, residence permit and deadlines — with official links.",
    eyebrow: "Study exchange",
    flag: "🇩🇪",
    route: "EU & non-EU students on an Erasmus+ exchange semester or year",
    intro:
      "Erasmus+ removes the tuition, not the paperwork. EU citizens need no visa but still must register their address and prove health cover; non-EU students need a national visa before travelling. This is the sequence that actually works, in the order German offices expect it.",
    legalBasis: [
      { label: "Directive (EU) 2016/801", note: "Entry and residence of third-country students and researchers.", url: "https://eur-lex.europa.eu/eli/dir/2016/801/oj" },
      { label: "Directive 2004/38/EC", note: "Free movement and residence rights of EU citizens and their families.", url: "https://eur-lex.europa.eu/eli/dir/2004/38/oj" },
      { label: "AufenthG § 16b", note: "German Residence Act — residence permit for study purposes.", url: "https://www.gesetze-im-internet.de/aufenthg_2004/__16b.html" },
      { label: "BMG (Bundesmeldegesetz)", note: "Legal duty to register your address within 14 days of moving in.", url: "https://www.gesetze-im-internet.de/bmg/" },
    ],
    facts: [
      { label: "Visa needed", value: "No for EU/EEA/CH · Yes for most non-EU" },
      { label: "Visa processing", value: "6–12 weeks (national D visa)" },
      { label: "Proof of funds", value: "€11,904 / year (blocked account)" },
      { label: "Work allowance", value: "140 full or 280 half days per year" },
      { label: "Address registration", value: "Anmeldung, within 14 days" },
      { label: "Typical semester fee", value: "€150–€350 (incl. transport ticket)" },
    ],
    steps: [
      {
        title: "Erasmus+ nomination and Learning Agreement",
        detail: "Your home university nominates you; the Learning Agreement (Before the Mobility) must be signed by you, the sending and the receiving institution. Nothing else can start without it.",
        timing: "3–6 months before the semester",
        link: { label: "Erasmus+ Online Learning Agreement", url: "https://learning-agreement.eu/" },
      },
      {
        title: "Letter of admission from the host university",
        local: "Zulassungsbescheid",
        detail: "The receiving university issues an acceptance/enrolment letter. Every later step — visa, insurance, housing, bank — asks for a copy of this document.",
        timing: "2–4 months before",
      },
      {
        title: "National visa (non-EU students only)",
        local: "Nationales Visum zu Studienzwecken (Typ D)",
        detail: "Apply at the German embassy or consulate in your country of residence. Bring the admission letter, proof of funds, health insurance, passport valid 3+ months beyond your stay and biometric photos. Do not travel on a Schengen tourist visa — it cannot be converted.",
        timing: "Book the appointment as soon as you are admitted; 6–12 weeks processing",
        cost: "€75",
        link: { label: "Federal Foreign Office — student visa", url: "https://www.auswaertiges-amt.de/en/visa-service/-/231148" },
      },
      {
        title: "Proof of financial means",
        local: "Finanzierungsnachweis / Sperrkonto",
        detail: "Usually a blocked account holding €11,904 for a year (€992 released monthly). An Erasmus+ grant letter, a scholarship award or a formal declaration of commitment (Verpflichtungserklärung) can replace part of it.",
        timing: "Before the visa appointment",
        cost: "€11,904 deposit + ~€50–150 account fee",
      },
      {
        title: "Health insurance",
        local: "Krankenversicherung",
        detail: "EU/EEA students: bring your EHIC and ask the host university to confirm it is accepted, then get a written exemption (Befreiung) from a German public insurer. Non-EU students: take out German statutory student insurance — travel insurance is not accepted for enrolment.",
        timing: "Before enrolment",
        cost: "≈ €120–140 / month if statutory",
        link: { label: "EHIC information", url: "https://ec.europa.eu/social/main.jsp?catId=559" },
      },
      {
        title: "Accommodation and landlord confirmation",
        local: "Wohnungsgeberbestätigung",
        detail: "Apply to the Studierendenwerk dorm early — private flats in Munich, Berlin and Cologne are brutal. Whatever you rent, you must get a signed landlord confirmation; without it the Anmeldung is refused.",
        timing: "Apply 4–6 months before arrival",
        cost: "€300–€700 / month rent, plus 1–3 months deposit",
      },
      {
        title: "Address registration",
        local: "Anmeldung beim Bürgeramt",
        detail: "Legally required within 14 days of moving in. Bring your passport, the landlord confirmation and the completed Anmeldeformular. You receive the Meldebescheinigung, which unlocks the bank account, tax ID and residence permit.",
        timing: "Within 14 days of arrival — book the slot before you land",
        cost: "Free",
      },
      {
        title: "Tax ID and bank account",
        local: "Steuer-Identifikationsnummer",
        detail: "The tax ID arrives by post 2–3 weeks after the Anmeldung. A German or SEPA account is needed for rent, insurance and the semester fee; most students open a free online account.",
        timing: "2–3 weeks after Anmeldung",
      },
      {
        title: "University enrolment",
        local: "Immatrikulation",
        detail: "Hand in the admission letter, insurance confirmation, passport, Anmeldung and the paid semester fee receipt. You get the student card and, in most Länder, a regional transport ticket.",
        timing: "In the first two weeks of the semester",
        cost: "€150–€350 semester contribution",
      },
      {
        title: "Residence permit (non-EU only)",
        local: "Aufenthaltserlaubnis, Ausländerbehörde",
        detail: "Apply before your D visa expires. Bring the passport, biometric photo, Anmeldung, insurance proof, enrolment certificate and proof of funds. Waiting times of 6–10 weeks are normal, so book the appointment the week you arrive.",
        timing: "Within the first 90 days",
        cost: "≈ €100",
      },
      {
        title: "Broadcasting fee and closing steps",
        local: "Rundfunkbeitrag",
        detail: "Every registered household owes €18.36/month. Dorm room sharing a flat? Only one person pays. At the end of the exchange, do the Abmeldung (deregistration) or you keep accruing fees and tax obligations.",
        timing: "Ongoing / on departure",
      },
    ],
    mistakes: [
      "Travelling on a Schengen tourist visa and hoping to switch in Germany — you cannot.",
      "Booking the Anmeldung appointment after arriving; slots in big cities are 4–6 weeks out.",
      "Assuming EHIC alone satisfies enrolment — you still need the written exemption from a German insurer.",
      "Not bringing certified translations plus apostilles for the diploma and birth certificate.",
      "Forgetting the Abmeldung on departure, which leaves broadcasting-fee debt behind.",
    ],
    faq: [
      { q: "Do EU students need a visa for Erasmus in Germany?", a: "No. EU, EEA and Swiss citizens enter with an ID card and rely on Directive 2004/38/EC, but they must still complete the Anmeldung within 14 days and prove health cover for enrolment." },
      { q: "How much money do I need to show for a German student visa?", a: "€11,904 for twelve months in 2026, normally on a blocked account releasing €992 per month. An Erasmus+ grant or scholarship letter can cover part of the amount." },
      { q: "How long does the German student visa take?", a: "Six to twelve weeks after the appointment, and appointments themselves are often booked out weeks ahead. Apply as soon as your admission letter arrives." },
      { q: "Can I work during Erasmus in Germany?", a: "Yes — 140 full days or 280 half days per calendar year without extra permission. Student assistant jobs at the university are usually not counted against that limit." },
    ],
  },
  {
    slug: "work-visa-germany",
    title: "Work visa for Germany",
    h1: "Germany work visa: checklist for skilled workers",
    metaTitle: "Germany Work Visa Checklist 2026 — EU Blue Card, Salary & Documents",
    metaDescription:
      "Complete Germany work visa checklist: EU Blue Card salary thresholds, qualification recognition, employment contract, visa appointment, Anmeldung and residence permit steps.",
    eyebrow: "Employment",
    flag: "🇩🇪",
    route: "Non-EU skilled workers with a job offer or qualification recognition",
    intro:
      "Germany's Skilled Immigration Act reshaped work migration: the EU Blue Card thresholds dropped, an Opportunity Card (Chancenkarte) now allows job-seeking on a points basis, and recognition of your qualification is the real bottleneck — not the visa itself.",
    legalBasis: [
      { label: "Directive (EU) 2021/1883", note: "EU Blue Card directive — highly qualified employment.", url: "https://eur-lex.europa.eu/eli/dir/2021/1883/oj" },
      { label: "AufenthG §§ 18a–18g", note: "Residence permits for qualified and skilled employment.", url: "https://www.gesetze-im-internet.de/aufenthg_2004/" },
      { label: "Fachkräfteeinwanderungsgesetz", note: "Skilled Immigration Act, reformed in stages through 2024.", url: "https://www.make-it-in-germany.com/en/visa-residence/skilled-immigration-act" },
      { label: "BQFG", note: "Recognition Act governing foreign professional qualifications.", url: "https://www.anerkennung-in-deutschland.de/html/en/index.php" },
    ],
    facts: [
      { label: "Blue Card salary (standard)", value: "≈ €48,300 gross / year" },
      { label: "Bottleneck professions / new graduates", value: "≈ €43,759 gross / year" },
      { label: "Visa processing", value: "1–4 months (faster with fast-track)" },
      { label: "Visa fee", value: "€75" },
      { label: "Permanent residence", value: "21 months with B1 German (Blue Card)" },
      { label: "Family reunification", value: "Immediate, spouse may work" },
    ],
    steps: [
      {
        title: "Check whether your qualification is recognised",
        local: "Anerkennung",
        detail: "University degrees are checked against the ANABIN database; regulated professions (medicine, nursing, teaching, law, many trades) need a formal recognition decision before a work visa can be issued.",
        timing: "Start 3–6 months ahead; recognition takes 2–4 months",
        cost: "€100–€600 depending on the profession",
        link: { label: "Recognition in Germany", url: "https://www.anerkennung-in-deutschland.de/html/en/index.php" },
      },
      {
        title: "Secure a concrete job offer or employment contract",
        detail: "The contract must state job title, gross annual salary, hours and start date, and the role must match your qualification. For the Blue Card the salary must meet the threshold on the contract itself, not with bonuses.",
        timing: "Before the visa application",
        link: { label: "Make it in Germany job listings", url: "https://www.make-it-in-germany.com/en/looking-for-foreign-professionals/jobs" },
      },
      {
        title: "Decide the permit type",
        detail: "EU Blue Card (degree + salary threshold, fastest route to PR), §18a/18b national work permit (vocational or academic qualification, lower salary), or the Opportunity Card if you want to job-hunt in Germany for up to a year on points.",
        timing: "Before booking the appointment",
      },
      {
        title: "Federal Employment Agency approval, if required",
        local: "Zustimmung der Bundesagentur für Arbeit",
        detail: "Blue Card roles above the standard threshold are exempt. Lower-paid, bottleneck or vocational roles need approval, which the embassy requests on your behalf — add 2–4 weeks.",
        timing: "Runs in parallel with the visa",
      },
      {
        title: "Book the embassy appointment and apply",
        local: "Nationales Visum (Typ D)",
        detail: "Documents: passport, biometric photos, contract, recognition/ANABIN proof, CV, degree certificates with certified translations, declaration on employment relationship (Erklärung zum Beschäftigungsverhältnis) and travel health insurance for the first weeks.",
        timing: "Appointment waits of 4–12 weeks are common",
        cost: "€75",
      },
      {
        title: "Ask your employer about the fast-track procedure",
        local: "Beschleunigtes Fachkräfteverfahren",
        detail: "Your employer can start the process at the local immigration office in Germany, which cuts total processing to roughly 4–8 weeks and guarantees an embassy appointment within three weeks.",
        timing: "Optional, employer-initiated",
        cost: "€411 employer fee",
      },
      {
        title: "Arrive, rent, and register your address",
        local: "Anmeldung",
        detail: "Within 14 days of moving in, with the landlord confirmation. This produces the Meldebescheinigung and triggers your tax ID, both required for your first salary payment.",
        timing: "First two weeks",
        cost: "Free",
      },
      {
        title: "Health insurance and social security",
        detail: "Employees are enrolled in statutory insurance automatically (roughly 7.3% employee share plus contributions); above the €73,800 threshold private cover is possible. Your employer registers you for pension and unemployment insurance.",
        timing: "First week of employment",
      },
      {
        title: "Convert the visa into a residence permit",
        local: "Aufenthaltstitel / Blaue Karte EU",
        detail: "Apply at the Ausländerbehörde before the D visa expires, with the Anmeldung, contract, insurance proof and biometric photo. The card arrives 4–6 weeks after the appointment.",
        timing: "Within the first 90 days",
        cost: "€100 (Blue Card)",
      },
      {
        title: "Plan for permanent residence",
        local: "Niederlassungserlaubnis",
        detail: "Blue Card holders qualify after 21 months with B1 German, or 27 months with A1. Standard work permits reach PR after 4 years (5 with a vocational route). Citizenship is possible after 5 years and dual nationality is now allowed.",
        timing: "From month 21",
      },
    ],
    mistakes: [
      "Signing a contract below the Blue Card threshold and only discovering it at the embassy.",
      "Not checking ANABIN — an unlisted or 'not equivalent' degree stops the whole application.",
      "Bringing uncertified translations; German consulates require sworn translators and apostilles.",
      "Missing the residence-permit appointment window and letting the D visa lapse.",
      "Forgetting the spouse's application — filing together is far faster than filing later.",
    ],
    faq: [
      { q: "What salary do I need for an EU Blue Card in Germany?", a: "Roughly €48,300 gross per year in 2026, or about €43,759 for bottleneck professions and graduates who finished within the last three years. The threshold is indexed annually." },
      { q: "How long does a German work visa take?", a: "Typically one to four months from the embassy appointment. The employer-initiated fast-track procedure compresses this to about four to eight weeks." },
      { q: "Can I move to Germany to look for work?", a: "Yes — the Opportunity Card (Chancenkarte) allows up to twelve months of job-seeking if you score enough points on qualification, language, experience and age, and can prove you can support yourself." },
      { q: "When can I get permanent residence?", a: "EU Blue Card holders can apply after 21 months with B1 German. Other skilled-worker permits generally lead to permanent residence after four years." },
    ],
  },
  {
    slug: "digital-nomad-spain",
    title: "Digital nomad visa Spain",
    h1: "Spain digital nomad visa: full checklist",
    metaTitle: "Spain Digital Nomad Visa Checklist 2026 — Income, Documents & Beckham Law",
    metaDescription:
      "Spain digital nomad visa checklist: income requirement, remote-work proof, criminal record certificate, apostilles, NIE, TIE card and the 24% Beckham Law tax regime.",
    eyebrow: "Remote work",
    flag: "🇪🇸",
    route: "Non-EU remote employees and freelancers working for clients outside Spain",
    intro:
      "Spain's Startup Act created a genuine remote-work residence permit, not a tourist workaround. The paperwork is front-loaded — apostilles, sworn translations and social-security proof — but once approved you get up to three years of residence and access to a flat 24% tax regime.",
    legalBasis: [
      { label: "Ley 28/2022 (Ley de Startups)", note: "Articles 71–76 create the international teleworker visa and permit.", url: "https://www.boe.es/eli/es/l/2022/12/21/28" },
      { label: "Ley 14/2013", note: "Entrepreneurs Act — framework for the Unidad de Grandes Empresas (UGE) route.", url: "https://www.boe.es/eli/es/l/2013/09/27/14/con" },
      { label: "Regulation (EC) 883/2004", note: "Social security coordination — basis for the A1 certificate.", url: "https://eur-lex.europa.eu/eli/reg/2004/883/oj" },
      { label: "Ley 35/2006, art. 93", note: "'Beckham Law' special tax regime for inbound workers.", url: "https://www.boe.es/eli/es/l/2006/11/28/35/con" },
    ],
    facts: [
      { label: "Income requirement", value: "≈ €2,762 / month (200% SMI)" },
      { label: "Per extra dependant", value: "+75% SMI first, +25% thereafter" },
      { label: "Employer history", value: "Company active 1+ year, you employed 3+ months" },
      { label: "Spanish-client income cap", value: "Max 20% of total" },
      { label: "Permit length", value: "1 yr (consulate) or 3 yrs (UGE in Spain)" },
      { label: "Tax option", value: "24% flat up to €600k under Beckham Law" },
    ],
    steps: [
      {
        title: "Confirm eligibility and choose the route",
        detail: "Applying at a Spanish consulate gives a one-year visa you convert in Spain. Applying to the UGE while legally in Spain (e.g. on a 90-day tourist entry) gives a three-year permit and a 20-working-day decision. The UGE route is faster and longer.",
        timing: "Decide before gathering documents",
        link: { label: "UGE — Large Companies and Strategic Groups Unit", url: "https://www.inclusion.gob.es/web/unidadgrandesempresas/" },
      },
      {
        title: "Proof of remote work relationship",
        detail: "Employees: contract plus a letter from the employer authorising remote work from Spain and confirming the role can be done fully remotely. Freelancers: contracts with at least one client outside Spain of a year or more, plus invoices.",
        timing: "2–3 months before applying",
      },
      {
        title: "Proof of income",
        detail: "Payslips or invoices for the last 3–6 months plus bank statements showing at least ~€2,762 per month. Add 75% of the minimum wage for the first family member and 25% for each additional one.",
        timing: "Collect the latest 6 months",
      },
      {
        title: "Company existence and activity certificate",
        detail: "A commercial-registry extract proving the employer or main client has traded for at least a year, apostilled and translated by a sworn translator (traductor jurado).",
        timing: "Allow 3–6 weeks for apostille and translation",
      },
      {
        title: "Social security coverage",
        local: "Certificado A1 / convenio bilateral",
        detail: "EU/EEA employers issue an A1 certificate. Employers in countries with a bilateral agreement (US, UK, Canada and others) use the equivalent certificate. Otherwise the employer must register with Spanish social security — the single most common reason for refusal.",
        timing: "Start early — A1 issuance can take 4–8 weeks",
      },
      {
        title: "Criminal record certificate",
        local: "Certificado de antecedentes penales",
        detail: "From every country you lived in during the last two years, issued within the last 90 days, apostilled, sworn-translated, and accompanied by a signed declaration of no criminal record for the last five years.",
        timing: "Request 6–8 weeks before applying",
        cost: "€20–€100 per country",
      },
      {
        title: "Private health insurance",
        detail: "Full-cover Spanish policy with no co-payments and no waiting period, from an insurer authorised to operate in Spain. Travel insurance and most international plans are rejected.",
        timing: "Buy before submitting",
        cost: "≈ €50–€120 / month",
      },
      {
        title: "Qualification or experience proof",
        detail: "Either a university/vocational degree in the relevant field or at least three years of professional experience evidenced by employer references.",
        timing: "With the application",
      },
      {
        title: "Get the NIE and submit the application",
        local: "Número de Identidad de Extranjero",
        detail: "The NIE is your Spanish foreigner identification number, required for the fee payment (modelo 790 code 038), the bank, contracts and tax. Submit the full file electronically to the UGE or in person at the consulate.",
        timing: "UGE decides within 20 working days; consulates take 1–2 months",
        cost: "≈ €80 application fee",
      },
      {
        title: "Register locally and collect the residence card",
        local: "Empadronamiento + TIE",
        detail: "Register at the town hall (padrón) with your rental contract, then book the fingerprint appointment (toma de huellas) to receive the TIE card, normally within 30–40 days of approval.",
        timing: "Within 30 days of arrival or approval",
        cost: "≈ €20 TIE card fee",
      },
      {
        title: "Choose your tax regime",
        local: "Régimen Beckham — modelo 149",
        detail: "Apply within six months of registering with social security to be taxed at a flat 24% on Spanish-source income up to €600,000 for six years instead of progressive rates up to 47%. Miss the window and the option is gone.",
        timing: "Within 6 months of registration",
      },
    ],
    mistakes: [
      "Missing apostilles — Spain rejects foreign public documents without them.",
      "Using a non-sworn translator; only a traductor jurado is accepted.",
      "Ignoring the A1 or social-security certificate, the top refusal ground.",
      "Buying travel insurance instead of a compliant Spanish policy with no co-pay.",
      "Letting the six-month Beckham Law window lapse and paying full progressive tax.",
      "Earning more than 20% of income from Spanish clients, which breaks eligibility.",
    ],
    faq: [
      { q: "How much income do I need for Spain's digital nomad visa?", a: "Around €2,762 per month — 200% of the Spanish minimum wage — plus 75% of the minimum wage for the first dependant and 25% for each additional family member." },
      { q: "How long does the Spain digital nomad visa take?", a: "The UGE route inside Spain is decided within 20 working days and grants three years. Consulate applications take one to two months and grant one year, renewable in Spain." },
      { q: "Can freelancers apply?", a: "Yes, if you work for clients based outside Spain, with at least one client relationship of a year or more, and no more than 20% of your income comes from Spanish clients." },
      { q: "What tax will I pay as a digital nomad in Spain?", a: "Under the Beckham Law regime, a flat 24% on Spanish-source income up to €600,000 for six years, provided you file modelo 149 within six months of registering with social security." },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}