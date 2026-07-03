export type Country = {
  code: string;
  name: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "CZ", name: "Czechia", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", flag: "🇮🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "LV", name: "Latvia", flag: "🇱🇻" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "TR", name: "Türkiye", flag: "🇹🇷" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
];

export type Reason = {
  id: string;
  label: string;
  emoji: string;
  description: string;
};

export const REASONS: Reason[] = [
  { id: "study", label: "Study", emoji: "🎓", description: "University, exchange, Erasmus" },
  { id: "work", label: "Work", emoji: "💼", description: "Employment, contract, transfer" },
  { id: "nomad", label: "Digital nomad", emoji: "💻", description: "Remote work, long-stay visa" },
  { id: "family", label: "Family", emoji: "🏡", description: "Reunion, partner, marriage" },
  { id: "travel", label: "Travel", emoji: "✈️", description: "Tourism, long stay" },
  { id: "refuge", label: "Refuge", emoji: "🕊️", description: "Asylum, humanitarian" },
];

export type ChecklistItem = {
  id: string;
  title: string;
  category: "Identity" | "Visa" | "Housing" | "Money" | "Health" | "Admin";
  estimatedDays: number;
  copies: number;
  description: string;
  officialUrl: string;
};

export type Trip = {
  from: string;
  to: string;
  reason: string;
  moveScore: number; // 0-100, lower = harder
  timelineWeeks: number;
  checklist: ChecklistItem[];
};

const BASE_BY_REASON: Record<string, ChecklistItem[]> = {
  study: [
    { id: "passport", title: "Valid passport", category: "Identity", estimatedDays: 30, copies: 2, description: "Must be valid at least 6 months past your stay.", officialUrl: "https://www.gov.pl" },
    { id: "acceptance", title: "University acceptance letter", category: "Admin", estimatedDays: 14, copies: 2, description: "Original signed letter from your host institution.", officialUrl: "#" },
    { id: "visa", title: "Student visa / residence permit", category: "Visa", estimatedDays: 60, copies: 1, description: "Apply at the destination embassy in your home country.", officialUrl: "https://www.auswaertiges-amt.de" },
    { id: "funds", title: "Proof of financial means", category: "Money", estimatedDays: 7, copies: 2, description: "Bank statement, blocked account, or scholarship letter.", officialUrl: "#" },
    { id: "insurance", title: "Health insurance", category: "Health", estimatedDays: 5, copies: 1, description: "Public or recognized private coverage required at registration.", officialUrl: "#" },
    { id: "housing", title: "Address registration (Anmeldung)", category: "Housing", estimatedDays: 14, copies: 1, description: "Register your address within 14 days of arrival.", officialUrl: "#" },
    { id: "tax", title: "Tax ID number", category: "Money", estimatedDays: 21, copies: 1, description: "Issued automatically after your address registration.", officialUrl: "#" },
    { id: "bank", title: "Local bank account", category: "Money", estimatedDays: 7, copies: 1, description: "Required for rent, salary, and many subscriptions.", officialUrl: "#" },
  ],
  work: [
    { id: "passport", title: "Valid passport", category: "Identity", estimatedDays: 30, copies: 2, description: "At least 6 months validity beyond contract end date.", officialUrl: "#" },
    { id: "contract", title: "Signed work contract", category: "Admin", estimatedDays: 7, copies: 2, description: "Original contract from your employer abroad.", officialUrl: "#" },
    { id: "workpermit", title: "Work permit / visa", category: "Visa", estimatedDays: 90, copies: 1, description: "Most often sponsored by your employer.", officialUrl: "#" },
    { id: "qualifications", title: "Recognized qualifications", category: "Admin", estimatedDays: 45, copies: 2, description: "Diplomas may need apostille and certified translation.", officialUrl: "#" },
    { id: "insurance", title: "Health insurance", category: "Health", estimatedDays: 5, copies: 1, description: "Often handled through your employer.", officialUrl: "#" },
    { id: "housing", title: "Address registration", category: "Housing", estimatedDays: 14, copies: 1, description: "Register within the legal deadline after arrival.", officialUrl: "#" },
    { id: "tax", title: "Tax ID", category: "Money", estimatedDays: 21, copies: 1, description: "Required for payroll.", officialUrl: "#" },
    { id: "bank", title: "Local bank account", category: "Money", estimatedDays: 7, copies: 1, description: "Salary deposit and rent payments.", officialUrl: "#" },
  ],
  nomad: [
    { id: "passport", title: "Valid passport", category: "Identity", estimatedDays: 30, copies: 2, description: "Check minimum validity for the destination.", officialUrl: "#" },
    { id: "nomadvisa", title: "Digital nomad visa", category: "Visa", estimatedDays: 45, copies: 1, description: "Available in select countries; income proof required.", officialUrl: "#" },
    { id: "income", title: "Proof of remote income", category: "Money", estimatedDays: 7, copies: 2, description: "Contracts, invoices, or bank statements.", officialUrl: "#" },
    { id: "insurance", title: "International health insurance", category: "Health", estimatedDays: 3, copies: 1, description: "Must cover the full duration of your stay.", officialUrl: "#" },
    { id: "housing", title: "Long-term accommodation", category: "Housing", estimatedDays: 14, copies: 1, description: "Lease often required for residence registration.", officialUrl: "#" },
    { id: "tax", title: "Tax residency check", category: "Money", estimatedDays: 7, copies: 1, description: "Understand 183-day rules and double-tax treaties.", officialUrl: "#" },
  ],
  family: [
    { id: "passport", title: "Valid passport", category: "Identity", estimatedDays: 30, copies: 2, description: "Required for all family members.", officialUrl: "#" },
    { id: "marriage", title: "Marriage / birth certificates", category: "Admin", estimatedDays: 30, copies: 2, description: "Apostilled and translated.", officialUrl: "#" },
    { id: "familyvisa", title: "Family reunification visa", category: "Visa", estimatedDays: 90, copies: 1, description: "Sponsor must meet income and housing thresholds.", officialUrl: "#" },
    { id: "housing", title: "Adequate housing proof", category: "Housing", estimatedDays: 14, copies: 1, description: "Lease or property deed of the sponsor.", officialUrl: "#" },
    { id: "insurance", title: "Family health coverage", category: "Health", estimatedDays: 5, copies: 1, description: "All dependents must be covered.", officialUrl: "#" },
  ],
  travel: [
    { id: "passport", title: "Valid passport", category: "Identity", estimatedDays: 30, copies: 1, description: "Check validity rules for the destination.", officialUrl: "#" },
    { id: "visa", title: "Tourist visa (if required)", category: "Visa", estimatedDays: 30, copies: 1, description: "Many nationalities are visa-exempt for short stays.", officialUrl: "#" },
    { id: "insurance", title: "Travel insurance", category: "Health", estimatedDays: 1, copies: 1, description: "Schengen requires min. €30,000 coverage.", officialUrl: "#" },
    { id: "return", title: "Return ticket & itinerary", category: "Admin", estimatedDays: 1, copies: 1, description: "Often requested at border control.", officialUrl: "#" },
  ],
  refuge: [
    { id: "id", title: "Any identification documents", category: "Identity", estimatedDays: 1, copies: 1, description: "Passport, ID, birth certificate — anything available.", officialUrl: "#" },
    { id: "asylum", title: "Asylum application", category: "Visa", estimatedDays: 7, copies: 1, description: "Apply at the border or first official authority.", officialUrl: "https://www.unhcr.org" },
    { id: "register", title: "Registration with authorities", category: "Admin", estimatedDays: 3, copies: 1, description: "You will receive a temporary protection certificate.", officialUrl: "#" },
    { id: "health", title: "Health screening", category: "Health", estimatedDays: 7, copies: 1, description: "Free basic care provided to registered applicants.", officialUrl: "#" },
    { id: "housing", title: "Reception housing", category: "Housing", estimatedDays: 14, copies: 1, description: "Provided through the national reception system.", officialUrl: "#" },
  ],
};

const COUNTRY_DIFFICULTY: Record<string, number> = {
  AT: 40, BE: 40, BG: 30, HR: 30, CZ: 30, DK: 45, EE: 30, FI: 40, FR: 40, DE: 35,
  GR: 30, HU: 30, IS: 45, IE: 50, IT: 35, LV: 30, LT: 30, LU: 45, MT: 35, NL: 45,
  NO: 50, PL: 30, PT: 25, RO: 30, SK: 30, SI: 30, ES: 30, SE: 40, CH: 55,
  GB: 60, US: 75, CA: 55, AU: 65, NZ: 60, JP: 70, KR: 60, CN: 80, HK: 55, TW: 50,
  SG: 60, MY: 45, TH: 40, ID: 50, PH: 45, VN: 50, IN: 55, PK: 60,
  AE: 50, SA: 70, QA: 55, IL: 65, TR: 45, EG: 55, MA: 45, ZA: 55, NG: 65, KE: 50,
  BR: 45, MX: 35, AR: 35, CL: 40, CO: 40, PE: 40, UY: 35, UA: 40, RS: 35,
};

export function buildTrip(from: string, to: string, reason: string): Trip {
  const checklist = BASE_BY_REASON[reason] ?? BASE_BY_REASON.study;
  const difficulty = COUNTRY_DIFFICULTY[to] ?? 50;
  // Same-region (rough EU heuristic) gets a bonus
  const EU = ["AT","BE","BG","HR","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"];
  const sameRegion = EU.includes(from) && EU.includes(to);
  const moveScore = Math.max(15, Math.min(95, 100 - difficulty + (sameRegion ? 20 : 0)));
  const timelineWeeks = Math.ceil(checklist.reduce((m, c) => Math.max(m, c.estimatedDays), 0) / 7) + 2;
  return { from, to, reason, moveScore, timelineWeeks, checklist };
}

export const GLOSSARY: { term: string; meaning: string }[] = [
  { term: "Apostille", meaning: "An international stamp that certifies a document is genuine, accepted in 120+ countries." },
  { term: "Anmeldung", meaning: "German address registration. Required within 14 days of moving in." },
  { term: "Proof of financial means", meaning: "Documents showing you can support yourself financially while abroad." },
  { term: "Residence permit", meaning: "Official authorization to live in a country for an extended period." },
  { term: "Schengen", meaning: "A zone of 29 European countries with no internal border checks." },
  { term: "Tax residency", meaning: "The country that has the right to tax your worldwide income, usually based on the 183-day rule." },
];

export type HowTo = {
  where: string;
  steps: string[];
  forgotten: string[];
  cost: string;
  tip?: string;
};

export const HOW_TO: Record<string, HowTo> = {
  passport: {
    where: "Your home country's passport office, embassy, or consulate.",
    steps: [
      "Book an appointment online (slots fill weeks in advance).",
      "Gather: birth certificate, ID, biometric photo, old passport.",
      "Pay the issuance fee and submit fingerprints in person.",
      "Pick up or receive by mail in 2–6 weeks (rush options exist).",
    ],
    forgotten: ["Photo size rules differ per country", "Validity must extend 6+ months past your stay"],
    cost: "€50–€150",
    tip: "Scan every page and store an encrypted copy in cloud and on your phone.",
  },
  acceptance: {
    where: "Your host university's international office.",
    steps: [
      "Confirm enrollment and pay any deposit required.",
      "Request the official admission letter — original signed and stamped.",
      "Ask for an extra copy in English for visa purposes.",
      "Have it shipped or download a verifiable PDF.",
    ],
    forgotten: ["Some embassies require the original on paper, not a scan"],
    cost: "Free (deposit may apply)",
  },
  visa: {
    where: "The destination country's embassy or consulate in your home country.",
    steps: [
      "Check the exact visa category on the embassy's official site.",
      "Book the appointment — slots can be 4–8 weeks out.",
      "Prepare: passport, photos, acceptance/contract, funds proof, insurance, application form.",
      "Attend the interview, submit biometrics, pay the fee.",
      "Track your application; collect the visa sticker when ready.",
    ],
    forgotten: ["Apostille on diplomas", "Certified translations", "Extra passport photos"],
    cost: "€60–€200",
    tip: "Apply as early as legally allowed — usually 3 months before travel.",
  },
  workpermit: {
    where: "Sponsored by your employer through the destination's labor authority.",
    steps: [
      "Receive the signed employment contract.",
      "Employer files the work permit / sponsorship application.",
      "You apply for the matching work visa at the embassy.",
      "Enter the country and convert to a residence permit on arrival.",
    ],
    forgotten: ["Recognition of foreign qualifications", "Apostilled diplomas"],
    cost: "€100–€400 (often paid by employer)",
  },
  contract: {
    where: "From your employer's HR department.",
    steps: [
      "Negotiate salary, role, start date, and relocation support.",
      "Request the signed contract in writing — PDF and original.",
      "Have it translated if not in an official language of the destination.",
    ],
    forgotten: ["Probation clause", "Notice period", "Relocation allowance"],
    cost: "Free",
  },
  qualifications: {
    where: "Your home university plus the destination's recognition authority.",
    steps: [
      "Order official transcripts and diploma copies.",
      "Get an apostille from your country's foreign affairs ministry.",
      "Order certified translations into the destination's language.",
      "Submit to the recognition body (e.g. ZAB in Germany, ENIC-NARIC in EU).",
    ],
    forgotten: ["Apostille must be on the original, not a copy"],
    cost: "€50–€300",
  },
  nomadvisa: {
    where: "Destination's consulate or online portal (varies by country).",
    steps: [
      "Verify income threshold (often €2,500–€3,500/month).",
      "Gather contracts, invoices, and 6 months of bank statements.",
      "Get international health insurance covering the full stay.",
      "Submit application online or at the consulate; pay the fee.",
    ],
    forgotten: ["Background check from home country", "Tax residency implications"],
    cost: "€60–€300",
    tip: "Portugal, Spain, Estonia, and UAE have the most established schemes.",
  },
  income: {
    where: "Your bank, accountant, or client portals.",
    steps: [
      "Download 6 months of bank statements (stamped if possible).",
      "Gather active client contracts or employer letter.",
      "Get an accountant's letter confirming average monthly income.",
    ],
    forgotten: ["Statements may need to be translated and stamped"],
    cost: "Free–€100",
  },
  funds: {
    where: "Your bank — sometimes a special blocked account in the destination.",
    steps: [
      "Confirm the required amount (e.g. ~€11,900/year for Germany).",
      "Open a blocked account (Sperrkonto) with Expatrio, Fintiba, or Coracle.",
      "Transfer the full sum and receive the confirmation letter.",
      "Submit the letter with your visa application.",
    ],
    forgotten: ["Transfer can take 1–2 weeks to clear"],
    cost: "€50–€150 setup",
  },
  insurance: {
    where: "Public scheme on arrival or a recognized private insurer.",
    steps: [
      "Pick a provider accepted by the destination's authorities.",
      "Buy minimum coverage required (Schengen: €30,000+).",
      "Download the policy certificate in English.",
      "Switch to local public insurance once registered.",
    ],
    forgotten: ["Coverage must start the day you enter the country"],
    cost: "€30–€120 / month",
  },
  housing: {
    where: "Local town hall, Bürgeramt, or municipal office.",
    steps: [
      "Sign a lease or get a landlord confirmation (Wohnungsgeberbestätigung).",
      "Book an appointment at the registration office.",
      "Bring passport, lease, and the landlord confirmation.",
      "Receive your registration certificate (Meldebescheinigung).",
    ],
    forgotten: ["Most countries require registration within 14 days"],
    cost: "Free or €10–€30",
    tip: "Without registration you can't get a tax ID, bank account, or contract.",
  },
  tax: {
    where: "Issued automatically by the tax office after registration.",
    steps: [
      "Complete your address registration first.",
      "Wait 2–3 weeks for the tax ID letter by post.",
      "Give the number to your employer or university.",
    ],
    forgotten: ["Check if your home country has a double-tax treaty"],
    cost: "Free",
  },
  bank: {
    where: "A local bank branch or a digital bank (N26, Revolut, Wise).",
    steps: [
      "Pick a bank — digital banks open in minutes, traditional ones need an appointment.",
      "Provide passport, address registration, and tax ID.",
      "Wait for the card by post (5–10 days).",
    ],
    forgotten: ["Some landlords only accept transfers from local IBANs"],
    cost: "Free–€10/month",
  },
  marriage: {
    where: "Civil registry of the country that issued the document.",
    steps: [
      "Order a recent original (issued in the last 6 months).",
      "Get an apostille from the foreign affairs ministry.",
      "Order a certified translation into the destination's language.",
    ],
    forgotten: ["Some countries require legalization, not apostille"],
    cost: "€20–€80 per document",
  },
  familyvisa: {
    where: "Destination's embassy in your home country.",
    steps: [
      "Sponsor proves income, housing size, and insurance coverage.",
      "Applicant gathers passport, marriage/birth certificates, photos.",
      "Book the embassy appointment and submit biometrics.",
      "Wait 2–6 months for processing.",
    ],
    forgotten: ["Language test (A1/A2) is required in some countries"],
    cost: "€75–€200",
  },
  return: {
    where: "Any airline website or booking platform.",
    steps: [
      "Book a refundable or onward ticket within the allowed stay.",
      "Print or save the e-ticket and full itinerary.",
      "Carry it at the border — agents may ask.",
    ],
    forgotten: ["Onward ticket services exist if you don't want to commit"],
    cost: "Varies",
  },
  id: {
    where: "Bring whatever official document you have.",
    steps: [
      "Gather any ID — passport, national ID, birth certificate, driver's licence.",
      "Keep originals safe; carry copies day-to-day.",
      "If you have nothing, authorities will still register you.",
    ],
    forgotten: ["Photos of documents in cloud can substitute when originals are lost"],
    cost: "Free",
  },
  asylum: {
    where: "Border police or first government office you reach.",
    steps: [
      "State clearly that you are seeking asylum.",
      "You'll be fingerprinted and registered.",
      "Receive a temporary protection certificate while your case is reviewed.",
      "You can request free legal aid — UNHCR and local NGOs help.",
    ],
    forgotten: ["You have the right to an interpreter at every step"],
    cost: "Free",
  },
  register: {
    where: "Local immigration or reception office.",
    steps: [
      "Present yourself within the legal window.",
      "Provide biometrics and a brief statement.",
      "Receive your protection certificate and case number.",
    ],
    forgotten: ["Keep the case number — it unlocks healthcare and housing"],
    cost: "Free",
  },
  health: {
    where: "Designated reception centers or partner clinics.",
    steps: [
      "Attend the basic health screening (free).",
      "Receive vaccinations as needed.",
      "Get your health card linked to your case number.",
    ],
    forgotten: ["Bring any medical records you have"],
    cost: "Free",
  },
};

export type CompareCountry = {
  code: string;
  country: string;
  flag: string;
  region: "EU" | "Europe" | "Americas" | "Asia" | "Oceania" | "MENA" | "Africa";
  language: string;
  currency: string;
  // Headline metrics
  visaTime: string;          // typical processing for the main long-stay visa
  studentHours: string;      // legal student work hours/week
  workRights: "Open" | "Restricted" | "Sponsored" | "Limited";
  nomadVisa: "Yes" | "No" | "Pilot";
  // 0–100 indices (higher = better for movers)
  englishScore: number;      // how easy to live in English
  healthcareScore: number;   // public/affordable healthcare quality
  safetyScore: number;       // general public safety
  // Money
  costIndex: number;         // monthly cost of living index (NYC = 100)
  taxRate: string;           // typical personal income tax band
  // Narrative
  goodFor: string;
  watchOut: string;
  // Legal pathway (comparative-law dimensions)
  prYears?: number;                 // years of continuous residence to permanent residency
  citizenshipYears?: number;        // years of residence to citizenship (standard route)
  dualCitizenship?: "Yes" | "No" | "Conditional";
  postStudyWork?: string;           // length of post-study job-search / graduate permit
};

// Indicative data compiled from public sources (embassies, OECD, Numbeo, EF EPI).
// Used for at-a-glance comparison only — verify before making decisions.
export const COMPARE_COUNTRIES: CompareCountry[] = [
  { code: "DE", country: "Germany", flag: "🇩🇪", region: "EU", language: "German", currency: "EUR",
    visaTime: "1–3 months", studentHours: "20 h/week", workRights: "Open", nomadVisa: "Yes",
    englishScore: 78, healthcareScore: 88, safetyScore: 82, costIndex: 62, taxRate: "14–45%",
    goodFor: "Free public universities, strong job market, EU mobility.",
    watchOut: "Heavy paperwork (Anmeldung, Sperrkonto) and long bank wait times.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "18 months" },
  { code: "FR", country: "France", flag: "🇫🇷", region: "EU", language: "French", currency: "EUR",
    visaTime: "~1 month", studentHours: "20 h/week", workRights: "Open", nomadVisa: "No",
    englishScore: 62, healthcareScore: 90, safetyScore: 74, costIndex: 65, taxRate: "0–45%",
    goodFor: "Cheap tuition, world-class healthcare, fast student visa.",
    watchOut: "French is essentially required for admin and most jobs.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "12 months (APS)" },
  { code: "NL", country: "Netherlands", flag: "🇳🇱", region: "EU", language: "Dutch", currency: "EUR",
    visaTime: "2–4 weeks", studentHours: "16 h/week", workRights: "Open", nomadVisa: "No",
    englishScore: 92, healthcareScore: 85, safetyScore: 84, costIndex: 70, taxRate: "37–50%",
    goodFor: "Almost everyone speaks English, quick visa, 30% ruling for skilled hires.",
    watchOut: "Severe housing shortage — start searching months early.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Conditional", postStudyWork: "12 months (Zoekjaar)" },
  { code: "ES", country: "Spain", flag: "🇪🇸", region: "EU", language: "Spanish", currency: "EUR",
    visaTime: "1–2 months", studentHours: "30 h/week", workRights: "Open", nomadVisa: "Yes",
    englishScore: 58, healthcareScore: 86, safetyScore: 80, costIndex: 55, taxRate: "19–47%",
    goodFor: "Affordable, great climate, top digital-nomad visa (Beckham law).",
    watchOut: "Bureaucracy is slow; NIE and padrón can take weeks.",
    prYears: 5, citizenshipYears: 10, dualCitizenship: "Conditional", postStudyWork: "12 months" },
  { code: "PT", country: "Portugal", flag: "🇵🇹", region: "EU", language: "Portuguese", currency: "EUR",
    visaTime: "2–4 months", studentHours: "20 h/week", workRights: "Open", nomadVisa: "Yes",
    englishScore: 76, healthcareScore: 78, safetyScore: 87, costIndex: 52, taxRate: "14.5–48%",
    goodFor: "D7 and digital-nomad visas, low cost, very safe.",
    watchOut: "AIMA appointment backlogs; rents rising fast in Lisbon/Porto.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "12 months" },
  { code: "SE", country: "Sweden", flag: "🇸🇪", region: "EU", language: "Swedish", currency: "SEK",
    visaTime: "1–3 months", studentHours: "Unlimited", workRights: "Open", nomadVisa: "No",
    englishScore: 94, healthcareScore: 88, safetyScore: 80, costIndex: 75, taxRate: "32–52%",
    goodFor: "English-friendly, generous student rights, great work-life balance.",
    watchOut: "Tuition fees for non-EU students; high taxes and cost.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "12 months" },
  { code: "IE", country: "Ireland", flag: "🇮🇪", region: "EU", language: "English", currency: "EUR",
    visaTime: "4–8 weeks", studentHours: "20 h/week", workRights: "Sponsored", nomadVisa: "No",
    englishScore: 100, healthcareScore: 72, safetyScore: 80, costIndex: 80, taxRate: "20–40%",
    goodFor: "English-speaking, EU access, tech jobs in Dublin.",
    watchOut: "Rents in Dublin are brutal; non-EU work needs employer sponsorship.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "12–24 months" },
  { code: "GB", country: "United Kingdom", flag: "🇬🇧", region: "Europe", language: "English", currency: "GBP",
    visaTime: "3 weeks", studentHours: "20 h/week", workRights: "Sponsored", nomadVisa: "No",
    englishScore: 100, healthcareScore: 80, safetyScore: 76, costIndex: 85, taxRate: "20–45%",
    goodFor: "Fast student visa, 2-year Graduate route, English-native.",
    watchOut: "Skilled Worker visa needs licensed sponsor; high IHS health surcharge.",
    prYears: 5, citizenshipYears: 6, dualCitizenship: "Yes", postStudyWork: "24 months (Graduate)" },
  { code: "CH", country: "Switzerland", flag: "🇨🇭", region: "Europe", language: "DE/FR/IT", currency: "CHF",
    visaTime: "2–3 months", studentHours: "15 h/week", workRights: "Restricted", nomadVisa: "No",
    englishScore: 80, healthcareScore: 92, safetyScore: 92, costIndex: 110, taxRate: "0–40%",
    goodFor: "Top salaries, world-class healthcare and safety.",
    watchOut: "Strict non-EU quotas; cost of living is the highest in Europe.",
    prYears: 10, citizenshipYears: 10, dualCitizenship: "Yes", postStudyWork: "6 months" },
  { code: "CA", country: "Canada", flag: "🇨🇦", region: "Americas", language: "English/French", currency: "CAD",
    visaTime: "8–12 weeks", studentHours: "24 h/week", workRights: "Open", nomadVisa: "Pilot",
    englishScore: 95, healthcareScore: 82, safetyScore: 86, costIndex: 78, taxRate: "15–33%",
    goodFor: "PGWP after studies, clear PR pathway via Express Entry.",
    watchOut: "PAL/GIC rules tightened in 2024; housing very expensive.",
    prYears: 3, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "Up to 3 years (PGWP)" },
  { code: "US", country: "United States", flag: "🇺🇸", region: "Americas", language: "English", currency: "USD",
    visaTime: "2–6 months", studentHours: "20 h/week", workRights: "Restricted", nomadVisa: "No",
    englishScore: 100, healthcareScore: 60, safetyScore: 65, costIndex: 100, taxRate: "10–37%",
    goodFor: "F-1 + OPT, huge job market, top universities.",
    watchOut: "H-1B lottery; healthcare costs; visa interview backlogs.",
    prYears: 5, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "12 months OPT (36 for STEM)" },
  { code: "AU", country: "Australia", flag: "🇦🇺", region: "Oceania", language: "English", currency: "AUD",
    visaTime: "4–8 weeks", studentHours: "48 h/fortnight", workRights: "Open", nomadVisa: "No",
    englishScore: 100, healthcareScore: 86, safetyScore: 84, costIndex: 82, taxRate: "0–45%",
    goodFor: "Post-study work visa, high wages, English-native.",
    watchOut: "High tuition and visa financial-proof requirements.",
    prYears: 4, citizenshipYears: 4, dualCitizenship: "Yes", postStudyWork: "2–4 years (485)" },
  { code: "JP", country: "Japan", flag: "🇯🇵", region: "Asia", language: "Japanese", currency: "JPY",
    visaTime: "1–3 months", studentHours: "28 h/week", workRights: "Sponsored", nomadVisa: "Yes",
    englishScore: 55, healthcareScore: 90, safetyScore: 96, costIndex: 70, taxRate: "5–45%",
    goodFor: "Very safe, excellent healthcare, new digital-nomad visa (2024).",
    watchOut: "Japanese is needed for most jobs and housing.",
    prYears: 10, citizenshipYears: 5, dualCitizenship: "No", postStudyWork: "12 months (job-hunting)" },
  { code: "SG", country: "Singapore", flag: "🇸🇬", region: "Asia", language: "English", currency: "SGD",
    visaTime: "3–8 weeks", studentHours: "16 h/week", workRights: "Sponsored", nomadVisa: "No",
    englishScore: 96, healthcareScore: 90, safetyScore: 95, costIndex: 95, taxRate: "0–24%",
    goodFor: "English-first, low taxes, very safe, regional hub.",
    watchOut: "Employment Pass salary floor is steep; rents soaring.",
    prYears: 2, citizenshipYears: 2, dualCitizenship: "No", postStudyWork: "Employment Pass required" },
  { code: "AE", country: "UAE", flag: "🇦🇪", region: "MENA", language: "Arabic/English", currency: "AED",
    visaTime: "2–4 weeks", studentHours: "Allowed", workRights: "Sponsored", nomadVisa: "Yes",
    englishScore: 85, healthcareScore: 78, safetyScore: 90, costIndex: 75, taxRate: "0%",
    goodFor: "No income tax, fast visas, English widely used.",
    watchOut: "Work tied to employer/sponsor; conservative legal code.",
    prYears: 10, citizenshipYears: 30, dualCitizenship: "Conditional", postStudyWork: "Golden Visa route" },
  { code: "MX", country: "Mexico", flag: "🇲🇽", region: "Americas", language: "Spanish", currency: "MXN",
    visaTime: "2–4 weeks", studentHours: "Allowed", workRights: "Limited", nomadVisa: "Yes",
    englishScore: 50, healthcareScore: 70, safetyScore: 55, costIndex: 45, taxRate: "1.92–35%",
    goodFor: "Low cost, easy temporary-resident visa, near North America.",
    watchOut: "Safety varies sharply by region; bring some Spanish.",
    prYears: 4, citizenshipYears: 5, dualCitizenship: "Yes", postStudyWork: "Case by case" },
];

// Legacy alias kept for any external imports.
export const COMPARE_ROWS = COMPARE_COUNTRIES.map((c) => ({
  country: c.country, flag: c.flag, studentHours: c.studentHours,
  visaTime: c.visaTime, workRights: c.workRights,
}));