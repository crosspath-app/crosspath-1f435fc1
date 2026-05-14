export type Country = {
  code: string;
  name: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
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
  DE: 35, FR: 40, ES: 30, NL: 45, PT: 25, IT: 35, SE: 40, PL: 30,
  GB: 60, US: 75, CA: 55, AU: 65, JP: 70, BR: 45, MX: 35, IN: 55, AE: 50, SG: 60,
};

export function buildTrip(from: string, to: string, reason: string): Trip {
  const checklist = BASE_BY_REASON[reason] ?? BASE_BY_REASON.study;
  const difficulty = COUNTRY_DIFFICULTY[to] ?? 50;
  // Same-region (rough EU heuristic) gets a bonus
  const EU = ["PL","DE","FR","ES","NL","PT","IT","SE"];
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

export const COMPARE_ROWS = [
  { country: "Germany", flag: "🇩🇪", studentHours: "20h/week", visaTime: "1–3 mo", workRights: "Open" },
  { country: "France", flag: "🇫🇷", studentHours: "20h/week", visaTime: "~1 mo", workRights: "Open" },
  { country: "Netherlands", flag: "🇳🇱", studentHours: "16h/week", visaTime: "2–4 wk", workRights: "Open" },
  { country: "Spain", flag: "🇪🇸", studentHours: "30h/week", visaTime: "1–2 mo", workRights: "Open" },
  { country: "Sweden", flag: "🇸🇪", studentHours: "Unlimited", visaTime: "1–3 mo", workRights: "Open" },
];