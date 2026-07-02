## Goal
Level up Crosspath.move so it reads as a serious international-law-student portfolio piece, not just a nice UI. The additions below add legal depth, citations, and academic framing that professors and admissions committees look for.

## Additions

### 1. "Legal Basis" section on each country guide
For every destination, show the actual legal instruments the requirements come from:
- EU directives (e.g. Directive 2016/801 on students/researchers, Directive 2003/86 on family reunification, Long-Term Residents Directive 2003/109)
- National laws (e.g. Germany AufenthG §16b for students, France CESEDA L.422-1)
- International conventions (1951 Refugee Convention, 1961 Hague Apostille, Vienna Convention on Consular Relations Art. 36)

Each item cites the article + a link to EUR-Lex or the national gazette. This is the single biggest credibility upgrade.

### 2. New route `/rights` — "Know Your Rights at the Border"
Plain-language summary of core protections every traveler/migrant has, with citations:
- Right to consular notification (VCCR Art. 36)
- Non-refoulement (1951 Convention Art. 33)
- Right to an interpreter, right to silence, right to legal counsel
- Schengen Borders Code refusal-of-entry appeal rights
- EU Charter of Fundamental Rights Art. 18 (asylum), Art. 19 (collective expulsion)

### 3. New route `/case-law` — "Landmark Cases"
Short digestible summaries (200–300 words each) of 8–10 cases that shaped modern mobility law:
- *Hirsi Jamaa v. Italy* (ECtHR 2012) — non-refoulement at sea
- *N.D. and N.T. v. Spain* (ECtHR 2020) — pushbacks
- *Chakroun* (CJEU C-578/08) — family reunification income thresholds
- *Zambrano* (CJEU C-34/09) — derivative EU rights
- *Metock* (CJEU C-127/08) — third-country spouses
- *M.S.S. v. Belgium and Greece* (ECtHR 2011) — Dublin transfers
- *Trump v. Hawaii* (US 2018) — travel ban
- *Plyler v. Doe* (US 1982) — education rights for undocumented children

### 4. Refugee/asylum mode (already teased in the brief)
A separate simplified flow at `/asylum` that:
- Explains the difference between asylum, subsidiary protection, and temporary protection
- Lists rights during the procedure (right to stay, work access timelines by country)
- Points to UNHCR, EASO/EUAA, and national asylum authorities
- Emphasises this is information, not legal advice, with a "find a lawyer" directory link (ELENA network, national bar associations)

### 5. Methodology & Sources page `/methodology`
Explains how the app is built — this is what turns it from "app" into "research project":
- Primary sources used (EUR-Lex, national immigration portals, embassy sites)
- Update cadence and last-verified dates per country
- Editorial policy: no legal advice, information only
- Limitations and disclaimers
- Bibliography of secondary sources (IOM, UNHCR, MPI, EMN reports)

### 6. Country legal-system tags
On each destination card, small tags for:
- Legal family (civil law / common law / mixed)
- Schengen / EU / EEA / third country
- Party to 1961 Apostille Convention (yes/no — determines whether legalisation is needed)
- Dual citizenship allowed (yes/no/conditional)

### 7. "Compare" upgrade — legal dimensions
Add rows to the compare table:
- Path to permanent residency (years)
- Path to citizenship (years, language requirement, dual allowed)
- Post-study work permit length
- Family reunification income threshold
- Statelessness Convention signatory

### 8. Portfolio-facing `/about` additions
- "Academic context" paragraph: which course/module this project supports, what legal question it explores
- "What I learned" section: 4–5 bullets on legal research, comparative analysis, EU vs. national competence, plain-language drafting
- Downloadable one-page PDF summary for print portfolios

### 9. Citations component
Reusable footnote-style citations (`[1]`, `[2]`) rendered at the bottom of each guide, matching OSCOLA or Bluebook style — pick one and be consistent. OSCOLA is the standard for European law students.

### 10. Multilingual legal glossary expansion
Expand `TERMS` in `borderless-extras.ts` to include the original-language legal term next to the English one (e.g. *Aufenthaltstitel*, *titre de séjour*, *permesso di soggiorno*) — already partially done, extend to all entries. Shows comparative-law awareness.

## Suggested build order
1. Methodology page + citation component + OSCOLA style (foundation)
2. Legal Basis section on existing checklist route (highest ROI)
3. `/case-law` and `/rights` routes
4. Compare-table legal dimensions
5. `/asylum` simplified mode
6. About-page academic framing + PDF export

## Scope note
All additions are frontend + static data files under `src/lib/`. No backend changes required. Everything stays in the current design system (semantic tokens, AppShell, PageHeader).