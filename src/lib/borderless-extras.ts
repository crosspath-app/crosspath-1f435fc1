// Plain-language translator for bureaucratic phrases.
export type TermEntry = {
  term: string;
  aliases?: string[];
  bureaucratic: string;
  plain: string;
  example?: string;
};

export const TERMS: TermEntry[] = [
  {
    term: "Proof of accommodation",
    aliases: ["evidence of accommodation", "housing proof"],
    bureaucratic: "Provide evidence of accommodation for the duration of your stay.",
    plain: "Show proof of where you'll stay — a rental contract, dorm acceptance letter, or hotel booking.",
    example: "Lease agreement, university dorm letter, Airbnb confirmation.",
  },
  {
    term: "Proof of financial means",
    aliases: ["sufficient means", "financial subsistence"],
    bureaucratic: "Demonstrate sufficient means of subsistence.",
    plain: "Show you have enough money to live there without working illegally.",
    example: "Bank statements, scholarship letter, blocked account (Sperrkonto).",
  },
  {
    term: "Apostille",
    bureaucratic: "Documents must be duly legalized via apostille per the 1961 Hague Convention.",
    plain: "Get a special international stamp that proves your document is genuine abroad.",
    example: "Apostille on your birth certificate from the foreign affairs ministry.",
  },
  {
    term: "Anmeldung",
    aliases: ["address registration", "Meldebescheinigung"],
    bureaucratic: "Register your residence with the competent municipal authority.",
    plain: "Tell the local town hall your new address — usually within 14 days of moving in.",
    example: "Bürgeramt appointment in Germany; Meldezettel in Austria.",
  },
  {
    term: "Residence permit",
    aliases: ["Aufenthaltstitel", "titre de séjour", "permesso di soggiorno"],
    bureaucratic: "Obtain the corresponding residence title prior to expiry of the visa.",
    plain: "Get your long-stay card before your entry visa runs out.",
  },
  {
    term: "Biometrics",
    bureaucratic: "Submit biometric identifiers at the designated VAC.",
    plain: "Go to the visa center to get your fingerprints and photo taken.",
  },
  {
    term: "Tax residency",
    bureaucratic: "You may be deemed tax-resident upon meeting the 183-day threshold.",
    plain: "If you spend more than 183 days a year somewhere, that country can tax all your income.",
  },
  {
    term: "Schengen Area",
    bureaucratic: "Free movement is permitted within the Schengen Area subject to the 90/180 rule.",
    plain: "You can travel between 29 European countries without border checks — but only 90 days in any 180.",
  },
  {
    term: "Legalisation",
    bureaucratic: "Documents require consular legalisation.",
    plain: "If the country doesn't accept apostilles, the embassy must stamp your document instead.",
  },
  {
    term: "Sworn translation",
    aliases: ["certified translation"],
    bureaucratic: "A sworn translation by an accredited translator is required.",
    plain: "An official translator (registered with a court) must translate the document — Google Translate doesn't count.",
  },
  {
    term: "Sperrkonto",
    aliases: ["blocked account"],
    bureaucratic: "Open a blocked account with a recognised provider.",
    plain: "A German bank account that locks your money and releases a monthly allowance — proves you can support yourself as a student.",
  },
  {
    term: "VAT number",
    bureaucratic: "Register for a national VAT identification number.",
    plain: "If you'll invoice clients as a freelancer, you need a tax number to charge sales tax legally.",
  },
  {
    term: "Right to work",
    bureaucratic: "Verify entitlement to engage in remunerated activity.",
    plain: "Check whether your visa actually lets you take a paid job — many tourist and student visas don't.",
  },
  {
    term: "Health insurance certificate",
    bureaucratic: "Provide proof of comprehensive health coverage.",
    plain: "A document from your insurer showing they'll pay for hospital bills while you're abroad.",
  },
  {
    term: "Background check",
    aliases: ["police clearance", "criminal record check"],
    bureaucratic: "Submit a recent extract from the criminal record register.",
    plain: "A paper from the police saying you have no criminal record — must be recent (usually under 3 months old).",
  },
  {
    term: "Family reunification",
    bureaucratic: "Apply under the family reunification provisions.",
    plain: "The visa route for joining a spouse, partner, parent or child who already lives there.",
  },
  {
    term: "Onward ticket",
    bureaucratic: "Evidence of onward travel may be required at the border.",
    plain: "Proof you'll leave before your allowed stay ends — usually a return or next-destination flight.",
  },
  {
    term: "Visa overstay",
    bureaucratic: "Overstays may incur entry bans and administrative sanctions.",
    plain: "Staying longer than your visa allows — even by one day — can get you banned from re-entering for years.",
  },
];

// Relocation cost calculator presets (EUR).
export type CostPreset = {
  id: string;
  label: string;
  visa: number;
  flight: number;
  housingDeposit: number;
  monthlyRent: number;
  insurance: number; // monthly
  translations: number;
  transport: number;
  initialSavings: number; // recommended buffer to land with
};

export const COST_PRESETS: CostPreset[] = [
  { id: "student-eu", label: "EU student", visa: 75, flight: 200, housingDeposit: 800, monthlyRent: 500, insurance: 110, translations: 80, transport: 60, initialSavings: 1500 },
  { id: "student-us", label: "US student", visa: 200, flight: 800, housingDeposit: 2000, monthlyRent: 1200, insurance: 250, translations: 100, transport: 120, initialSavings: 3500 },
  { id: "worker", label: "Worker / expat", visa: 150, flight: 500, housingDeposit: 1600, monthlyRent: 900, insurance: 90, translations: 120, transport: 100, initialSavings: 2500 },
  { id: "nomad", label: "Digital nomad", visa: 250, flight: 700, housingDeposit: 1000, monthlyRent: 800, insurance: 80, translations: 50, transport: 80, initialSavings: 2000 },
];

// "Can I legally...?" answers.
export type LegalQA = {
  id: string;
  q: string;
  short: "Yes" | "No" | "It depends" | "Usually yes" | "Usually no";
  answer: string;
  source?: { label: string; url: string };
  region?: string; // e.g. "EU / Schengen"
};

export const LEGAL_QA: LegalQA[] = [
  {
    id: "work-student",
    q: "Can I work on a student visa?",
    short: "Usually yes",
    answer: "Most countries allow students to work part-time — typically 15–20 hours per week during term and full-time in holidays. Germany allows 140 full days / 280 half days a year, France 964 hours/year, the Netherlands 16 hours/week, the UK up to 20 hours/week.",
    source: { label: "EU Immigration Portal", url: "https://immigration-portal.ec.europa.eu/" },
  },
  {
    id: "freelance",
    q: "Can I freelance on a residence permit?",
    short: "It depends",
    answer: "A standard work or student permit usually only covers a specific employer. To freelance you normally need a self-employment permit (Germany: Freiberufler visa, Spain: cuenta propia, Portugal: D2). Doing freelance work on the wrong permit can void it.",
  },
  {
    id: "stay-after-grad",
    q: "Can I stay after graduation?",
    short: "Usually yes",
    answer: "Most EU countries grant a post-study job-search permit of 9–18 months. Germany: 18 months. France: 12 months. Netherlands: 1 year (Zoekjaar). UK: 2-year Graduate visa. You usually have to apply before your student permit expires.",
  },
  {
    id: "schengen",
    q: "Can I travel through Schengen on my permit?",
    short: "Yes",
    answer: "A residence permit from any Schengen country lets you travel to all 29 Schengen countries for up to 90 days in any 180-day period, for tourism. You can't work in another Schengen country without a separate permit.",
    region: "EU / Schengen",
  },
  {
    id: "family-join",
    q: "Can my partner join me?",
    short: "Usually yes",
    answer: "Most residence permits allow family reunification for spouses, registered partners and minor children. The sponsor usually has to prove enough income (typically the local minimum wage) and adequate housing. Processing can take 2–6 months.",
  },
  {
    id: "drive",
    q: "Can I drive with my home country licence?",
    short: "It depends",
    answer: "Inside the EU/EEA, your licence is valid as long as it's valid at home. From outside, most countries let you drive 6–12 months on your foreign licence (sometimes with an International Driving Permit) before requiring an exchange or local test.",
  },
  {
    id: "open-bank",
    q: "Can I open a bank account before moving?",
    short: "Usually yes",
    answer: "Digital banks (N26, Revolut, Wise, Bunq) let you open an account from abroad in minutes with just a passport. Traditional banks usually need your address registration first.",
  },
  {
    id: "leave-return",
    q: "Can I leave and re-enter while my permit is being processed?",
    short: "Usually no",
    answer: "Once you've applied for a residence permit, leaving the country before you get the card (or at least a fiktionsbescheinigung / récépissé) often means you can't re-enter. Always ask the immigration office for a re-entry confirmation first.",
  },
  {
    id: "marry-locally",
    q: "Can I get married to a local?",
    short: "Yes",
    answer: "Foreigners can marry citizens in almost every country. You'll need a passport, a 'no impediment to marry' certificate from your home country (apostilled and translated), and sometimes a residence proof.",
  },
  {
    id: "permanent-residency",
    q: "Can I get permanent residency?",
    short: "Usually yes",
    answer: "Most countries grant permanent residency after 5 years of continuous legal stay (EU long-term resident status). Germany: 21–33 months for skilled workers with B1 German. Spain: 5 years. Portugal: 5 years.",
  },
];