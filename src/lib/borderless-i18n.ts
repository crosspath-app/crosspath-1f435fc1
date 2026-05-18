// Full 8-language translations of all data: reasons, categories, items, glossary,
// HOW_TO guides, TERMS, LEGAL_QA, cost calculator, help, compare.
// EN is canonical; missing fields fall back to EN.
import { useMemo } from "react";
import type { Lang } from "./i18n";
import { useLang } from "./i18n";

type Tx = Partial<Record<Lang, string>> & { en: string };
const pick = (t: Tx | undefined, l: Lang): string => (t ? t[l] ?? t.en : "");
const pickArr = (a: Tx[] | undefined, l: Lang): string[] => (a ? a.map((t) => pick(t, l)) : []);

// ------- REASONS -------
type ReasonL = { id: string; emoji: string; label: Tx; description: Tx };
const REASONS_L: ReasonL[] = [
  { id: "study", emoji: "🎓",
    label: { en: "Study", es: "Estudios", fr: "Études", de: "Studium", it: "Studi", pt: "Estudos", pl: "Studia", uk: "Навчання" },
    description: { en: "University, exchange, Erasmus", es: "Universidad, intercambio, Erasmus", fr: "Université, échange, Erasmus", de: "Universität, Austausch, Erasmus", it: "Università, scambio, Erasmus", pt: "Universidade, intercâmbio, Erasmus", pl: "Studia, wymiana, Erasmus", uk: "Університет, обмін, Еразмус" } },
  { id: "work", emoji: "💼",
    label: { en: "Work", es: "Trabajo", fr: "Travail", de: "Arbeit", it: "Lavoro", pt: "Trabalho", pl: "Praca", uk: "Робота" },
    description: { en: "Employment, contract, transfer", es: "Empleo, contrato, traslado", fr: "Emploi, contrat, mutation", de: "Anstellung, Vertrag, Versetzung", it: "Impiego, contratto, trasferimento", pt: "Emprego, contrato, transferência", pl: "Zatrudnienie, kontrakt, transfer", uk: "Робота, контракт, переведення" } },
  { id: "nomad", emoji: "💻",
    label: { en: "Digital nomad", es: "Nómada digital", fr: "Nomade numérique", de: "Digitaler Nomade", it: "Nomade digitale", pt: "Nômade digital", pl: "Cyfrowy nomada", uk: "Цифровий кочівник" },
    description: { en: "Remote work, long-stay visa", es: "Trabajo remoto, visa de larga estancia", fr: "Télétravail, visa long séjour", de: "Remote-Arbeit, Langzeitvisum", it: "Lavoro remoto, visto lunga permanenza", pt: "Trabalho remoto, visto longa estadia", pl: "Praca zdalna, wiza długoterminowa", uk: "Віддалена робота, довгострокова віза" } },
  { id: "family", emoji: "🏡",
    label: { en: "Family", es: "Familia", fr: "Famille", de: "Familie", it: "Famiglia", pt: "Família", pl: "Rodzina", uk: "Сім'я" },
    description: { en: "Reunion, partner, marriage", es: "Reunificación, pareja, matrimonio", fr: "Regroupement, conjoint, mariage", de: "Zusammenführung, Partner, Ehe", it: "Ricongiungimento, partner, matrimonio", pt: "Reagrupamento, parceiro, casamento", pl: "Łączenie, partner, małżeństwo", uk: "Возз'єднання, партнер, шлюб" } },
  { id: "travel", emoji: "✈️",
    label: { en: "Travel", es: "Viaje", fr: "Voyage", de: "Reise", it: "Viaggio", pt: "Viagem", pl: "Podróż", uk: "Подорож" },
    description: { en: "Tourism, long stay", es: "Turismo, larga estancia", fr: "Tourisme, long séjour", de: "Tourismus, Langzeit", it: "Turismo, lunga permanenza", pt: "Turismo, longa estadia", pl: "Turystyka, długi pobyt", uk: "Туризм, тривале перебування" } },
  { id: "refuge", emoji: "🕊️",
    label: { en: "Refuge", es: "Refugio", fr: "Refuge", de: "Zuflucht", it: "Rifugio", pt: "Refúgio", pl: "Schronienie", uk: "Притулок" },
    description: { en: "Asylum, humanitarian", es: "Asilo, humanitario", fr: "Asile, humanitaire", de: "Asyl, humanitär", it: "Asilo, umanitario", pt: "Asilo, humanitário", pl: "Azyl, humanitarny", uk: "Притулок, гуманітарний" } },
];

// ------- CATEGORIES -------
const CATEGORIES_L: Record<string, Tx> = {
  Identity: { en: "Identity", es: "Identidad", fr: "Identité", de: "Identität", it: "Identità", pt: "Identidade", pl: "Tożsamość", uk: "Особа" },
  Visa: { en: "Visa", es: "Visado", fr: "Visa", de: "Visum", it: "Visto", pt: "Visto", pl: "Wiza", uk: "Віза" },
  Housing: { en: "Housing", es: "Vivienda", fr: "Logement", de: "Wohnen", it: "Alloggio", pt: "Habitação", pl: "Mieszkanie", uk: "Житло" },
  Money: { en: "Money", es: "Dinero", fr: "Argent", de: "Geld", it: "Soldi", pt: "Dinheiro", pl: "Pieniądze", uk: "Гроші" },
  Health: { en: "Health", es: "Salud", fr: "Santé", de: "Gesundheit", it: "Salute", pt: "Saúde", pl: "Zdrowie", uk: "Здоров'я" },
  Admin: { en: "Admin", es: "Trámites", fr: "Admin.", de: "Verwaltung", it: "Burocrazia", pt: "Burocracia", pl: "Urzędy", uk: "Адмін" },
};

// ------- CHECKLIST ITEMS (title + description) -------
type ItemL = { title: Tx; description: Tx };
const ITEMS_L: Record<string, ItemL> = {
  passport: {
    title: { en: "Valid passport", es: "Pasaporte válido", fr: "Passeport valide", de: "Gültiger Reisepass", it: "Passaporto valido", pt: "Passaporte válido", pl: "Ważny paszport", uk: "Дійсний паспорт" },
    description: { en: "Must be valid at least 6 months past your stay.", es: "Debe ser válido al menos 6 meses después de tu estancia.", fr: "Doit être valide au moins 6 mois après votre séjour.", de: "Muss mindestens 6 Monate nach Aufenthaltsende gültig sein.", it: "Deve essere valido almeno 6 mesi oltre il soggiorno.", pt: "Deve ser válido pelo menos 6 meses após a sua estadia.", pl: "Musi być ważny co najmniej 6 miesięcy po pobycie.", uk: "Має бути дійсним щонайменше 6 місяців після перебування." } },
  acceptance: {
    title: { en: "University acceptance letter", es: "Carta de admisión", fr: "Lettre d'admission universitaire", de: "Zulassungsbescheid der Universität", it: "Lettera di ammissione", pt: "Carta de aceitação", pl: "List akceptacyjny uczelni", uk: "Лист про зарахування" },
    description: { en: "Original signed letter from your host institution.", es: "Carta original firmada de la institución de acogida.", fr: "Lettre originale signée de l'établissement d'accueil.", de: "Originaldokument der Gastinstitution, unterschrieben.", it: "Lettera originale firmata dall'istituzione ospitante.", pt: "Carta original assinada da instituição de acolhimento.", pl: "Oryginał podpisanego listu od uczelni przyjmującej.", uk: "Оригінал листа з підписом приймаючого закладу." } },
  visa: {
    title: { en: "Student visa / residence permit", es: "Visado de estudiante / permiso de residencia", fr: "Visa étudiant / titre de séjour", de: "Studentenvisum / Aufenthaltstitel", it: "Visto studio / permesso di soggiorno", pt: "Visto de estudante / autorização de residência", pl: "Wiza studencka / zezwolenie na pobyt", uk: "Студентська віза / посвідка на проживання" },
    description: { en: "Apply at the destination embassy in your home country.", es: "Solicítalo en la embajada de destino en tu país.", fr: "Faites la demande à l'ambassade de destination dans votre pays.", de: "Beantragen Sie es bei der Botschaft des Ziellandes.", it: "Richiedilo all'ambasciata di destinazione nel tuo paese.", pt: "Solicite na embaixada do destino no seu país.", pl: "Złóż wniosek w ambasadzie kraju docelowego.", uk: "Подайте заявку в посольство країни призначення." } },
  funds: {
    title: { en: "Proof of financial means", es: "Justificante de medios económicos", fr: "Justificatif de ressources", de: "Finanzierungsnachweis", it: "Prova di mezzi finanziari", pt: "Prova de meios financeiros", pl: "Dowód środków finansowych", uk: "Підтвердження фінансових засобів" },
    description: { en: "Bank statement, blocked account, or scholarship letter.", es: "Extracto bancario, cuenta bloqueada o beca.", fr: "Relevé bancaire, compte bloqué ou bourse.", de: "Kontoauszug, Sperrkonto oder Stipendienschreiben.", it: "Estratto conto, conto bloccato o lettera di borsa.", pt: "Extrato bancário, conta bloqueada ou bolsa.", pl: "Wyciąg bankowy, konto blokowane lub stypendium.", uk: "Виписка з банку, заблокований рахунок або стипендія." } },
  insurance: {
    title: { en: "Health insurance", es: "Seguro médico", fr: "Assurance maladie", de: "Krankenversicherung", it: "Assicurazione sanitaria", pt: "Seguro de saúde", pl: "Ubezpieczenie zdrowotne", uk: "Медичне страхування" },
    description: { en: "Public or recognized private coverage required at registration.", es: "Cobertura pública o privada reconocida al registrarte.", fr: "Couverture publique ou privée reconnue à l'inscription.", de: "Gesetzliche oder anerkannte private Versicherung erforderlich.", it: "Copertura pubblica o privata riconosciuta alla registrazione.", pt: "Cobertura pública ou privada reconhecida no registo.", pl: "Wymagane przy rejestracji ubezpieczenie publiczne lub uznane prywatne.", uk: "Державне або визнане приватне покриття при реєстрації." } },
  housing: {
    title: { en: "Address registration (Anmeldung)", es: "Registro de domicilio (Anmeldung)", fr: "Déclaration de domicile (Anmeldung)", de: "Anmeldung der Adresse", it: "Registrazione di residenza (Anmeldung)", pt: "Registo de morada (Anmeldung)", pl: "Meldunek (Anmeldung)", uk: "Реєстрація адреси (Anmeldung)" },
    description: { en: "Register your address within 14 days of arrival.", es: "Regístrate en los 14 días tras la llegada.", fr: "Déclarez votre adresse dans les 14 jours.", de: "Adresse innerhalb von 14 Tagen nach Einzug anmelden.", it: "Registra l'indirizzo entro 14 giorni dall'arrivo.", pt: "Registe a morada nos 14 dias após chegada.", pl: "Zamelduj się w ciągu 14 dni od przyjazdu.", uk: "Зареєструйте адресу протягом 14 днів після приїзду." } },
  tax: {
    title: { en: "Tax ID number", es: "Número de identificación fiscal", fr: "Numéro fiscal", de: "Steuer-ID", it: "Codice fiscale", pt: "Número de identificação fiscal", pl: "Numer identyfikacji podatkowej", uk: "Податковий номер" },
    description: { en: "Issued automatically after your address registration.", es: "Se emite automáticamente tras el registro de domicilio.", fr: "Délivré automatiquement après la déclaration de domicile.", de: "Wird nach der Anmeldung automatisch zugesandt.", it: "Rilasciato automaticamente dopo la registrazione di residenza.", pt: "Emitido automaticamente após o registo de morada.", pl: "Wydawany automatycznie po zameldowaniu.", uk: "Видається автоматично після реєстрації адреси." } },
  bank: {
    title: { en: "Local bank account", es: "Cuenta bancaria local", fr: "Compte bancaire local", de: "Lokales Bankkonto", it: "Conto bancario locale", pt: "Conta bancária local", pl: "Lokalne konto bankowe", uk: "Місцевий банківський рахунок" },
    description: { en: "Required for rent, salary, and many subscriptions.", es: "Necesario para alquiler, salario y suscripciones.", fr: "Nécessaire pour loyer, salaire et abonnements.", de: "Erforderlich für Miete, Gehalt und Abos.", it: "Necessario per affitto, stipendio e abbonamenti.", pt: "Necessária para renda, salário e assinaturas.", pl: "Wymagane do czynszu, pensji i subskrypcji.", uk: "Потрібен для оренди, зарплати та підписок." } },
  contract: {
    title: { en: "Signed work contract", es: "Contrato de trabajo firmado", fr: "Contrat de travail signé", de: "Unterzeichneter Arbeitsvertrag", it: "Contratto di lavoro firmato", pt: "Contrato de trabalho assinado", pl: "Podpisana umowa o pracę", uk: "Підписаний трудовий договір" },
    description: { en: "Original contract from your employer abroad.", es: "Contrato original de tu empleador en el extranjero.", fr: "Contrat original de votre employeur à l'étranger.", de: "Originalvertrag Ihres Arbeitgebers im Ausland.", it: "Contratto originale dal datore di lavoro all'estero.", pt: "Contrato original do seu empregador no estrangeiro.", pl: "Oryginał umowy od zagranicznego pracodawcy.", uk: "Оригінал договору від іноземного роботодавця." } },
  workpermit: {
    title: { en: "Work permit / visa", es: "Permiso de trabajo / visado", fr: "Permis de travail / visa", de: "Arbeitserlaubnis / Visum", it: "Permesso di lavoro / visto", pt: "Autorização de trabalho / visto", pl: "Pozwolenie na pracę / wiza", uk: "Дозвіл на роботу / віза" },
    description: { en: "Most often sponsored by your employer.", es: "Normalmente patrocinado por el empleador.", fr: "Le plus souvent parrainé par l'employeur.", de: "Meist vom Arbeitgeber gesponsert.", it: "Spesso sponsorizzato dal datore di lavoro.", pt: "Geralmente patrocinado pelo empregador.", pl: "Najczęściej sponsorowane przez pracodawcę.", uk: "Зазвичай спонсорує роботодавець." } },
  qualifications: {
    title: { en: "Recognized qualifications", es: "Cualificaciones reconocidas", fr: "Qualifications reconnues", de: "Anerkannte Qualifikationen", it: "Qualifiche riconosciute", pt: "Qualificações reconhecidas", pl: "Uznane kwalifikacje", uk: "Визнані кваліфікації" },
    description: { en: "Diplomas may need apostille and certified translation.", es: "Los títulos pueden requerir apostilla y traducción jurada.", fr: "Diplômes parfois soumis à apostille et traduction assermentée.", de: "Diplome benötigen oft Apostille und beglaubigte Übersetzung.", it: "I diplomi possono richiedere apostille e traduzione giurata.", pt: "Diplomas podem precisar de apostila e tradução certificada.", pl: "Dyplomy mogą wymagać apostille i tłumaczenia przysięgłego.", uk: "Дипломи можуть потребувати апостиль і завірений переклад." } },
  nomadvisa: {
    title: { en: "Digital nomad visa", es: "Visado de nómada digital", fr: "Visa nomade numérique", de: "Digital-Nomaden-Visum", it: "Visto nomade digitale", pt: "Visto de nómada digital", pl: "Wiza cyfrowego nomady", uk: "Віза цифрового кочівника" },
    description: { en: "Available in select countries; income proof required.", es: "Disponible en algunos países; se exige prueba de ingresos.", fr: "Disponible dans certains pays ; preuve de revenus exigée.", de: "In ausgewählten Ländern; Einkommensnachweis erforderlich.", it: "Disponibile in alcuni paesi; richiesta prova di reddito.", pt: "Em países selecionados; prova de rendimento exigida.", pl: "Dostępna w wybranych krajach; wymagany dowód dochodów.", uk: "Доступна в обраних країнах; потрібен доказ доходу." } },
  income: {
    title: { en: "Proof of remote income", es: "Prueba de ingresos remotos", fr: "Justificatif de revenus en télétravail", de: "Nachweis von Remote-Einkommen", it: "Prova di reddito da remoto", pt: "Prova de rendimento remoto", pl: "Dowód dochodu zdalnego", uk: "Підтвердження віддаленого доходу" },
    description: { en: "Contracts, invoices, or bank statements.", es: "Contratos, facturas o extractos bancarios.", fr: "Contrats, factures ou relevés bancaires.", de: "Verträge, Rechnungen oder Kontoauszüge.", it: "Contratti, fatture o estratti conto.", pt: "Contratos, faturas ou extratos.", pl: "Umowy, faktury lub wyciągi bankowe.", uk: "Контракти, рахунки або виписки." } },
  marriage: {
    title: { en: "Marriage / birth certificates", es: "Certificados de matrimonio / nacimiento", fr: "Actes de mariage / naissance", de: "Heirats-/Geburtsurkunden", it: "Certificati di matrimonio / nascita", pt: "Certidões de casamento / nascimento", pl: "Akty małżeństwa / urodzenia", uk: "Свідоцтва про шлюб / народження" },
    description: { en: "Apostilled and translated.", es: "Apostillados y traducidos.", fr: "Apostillés et traduits.", de: "Mit Apostille und Übersetzung.", it: "Con apostille e traduzione.", pt: "Apostilados e traduzidos.", pl: "Z apostille i tłumaczeniem.", uk: "З апостилем і перекладом." } },
  familyvisa: {
    title: { en: "Family reunification visa", es: "Visado de reagrupación familiar", fr: "Visa de regroupement familial", de: "Familienzusammenführungsvisum", it: "Visto ricongiungimento familiare", pt: "Visto de reagrupamento familiar", pl: "Wiza łączenia rodzin", uk: "Віза возз'єднання сім'ї" },
    description: { en: "Sponsor must meet income and housing thresholds.", es: "El patrocinador debe cumplir requisitos de renta y vivienda.", fr: "Le garant doit remplir des critères de revenus et logement.", de: "Sponsor muss Einkommens- und Wohnvorgaben erfüllen.", it: "Lo sponsor deve soddisfare requisiti di reddito e alloggio.", pt: "Patrocinador deve cumprir requisitos de rendimento e habitação.", pl: "Sponsor musi spełnić wymogi dochodu i mieszkania.", uk: "Спонсор має відповідати критеріям доходу та житла." } },
  return: {
    title: { en: "Return ticket & itinerary", es: "Billete de vuelta e itinerario", fr: "Billet retour et itinéraire", de: "Rückflugticket & Reiseplan", it: "Biglietto di ritorno e itinerario", pt: "Bilhete de regresso e itinerário", pl: "Bilet powrotny i plan podróży", uk: "Зворотний квиток та маршрут" },
    description: { en: "Often requested at border control.", es: "A menudo lo pide el control fronterizo.", fr: "Souvent demandé au contrôle frontalier.", de: "Wird oft an der Grenze verlangt.", it: "Spesso richiesto al controllo di frontiera.", pt: "Frequentemente pedido no controlo de fronteira.", pl: "Często wymagany na granicy.", uk: "Часто запитують на кордоні." } },
  id: {
    title: { en: "Any identification documents", es: "Cualquier documento de identidad", fr: "Toute pièce d'identité disponible", de: "Beliebige Ausweisdokumente", it: "Qualsiasi documento d'identità", pt: "Qualquer documento de identificação", pl: "Dowolne dokumenty tożsamości", uk: "Будь-які документи, що посвідчують особу" },
    description: { en: "Passport, ID, birth certificate — anything available.", es: "Pasaporte, DNI, certificado de nacimiento — lo que tengas.", fr: "Passeport, CNI, acte de naissance — tout ce qui est disponible.", de: "Reisepass, Personalausweis, Geburtsurkunde — alles, was vorhanden ist.", it: "Passaporto, carta d'identità, atto di nascita — qualsiasi cosa.", pt: "Passaporte, BI, certidão de nascimento — o que tiver.", pl: "Paszport, dowód, akt urodzenia — cokolwiek.", uk: "Паспорт, ID-картка, свідоцтво — будь-що." } },
  asylum: {
    title: { en: "Asylum application", es: "Solicitud de asilo", fr: "Demande d'asile", de: "Asylantrag", it: "Domanda di asilo", pt: "Pedido de asilo", pl: "Wniosek o azyl", uk: "Заява про притулок" },
    description: { en: "Apply at the border or first official authority.", es: "Solicítalo en la frontera o la primera autoridad oficial.", fr: "Demandez-le à la frontière ou à la première autorité officielle.", de: "An der Grenze oder bei der ersten Behörde stellen.", it: "Presentala alla frontiera o alla prima autorità ufficiale.", pt: "Apresente na fronteira ou primeira autoridade.", pl: "Złóż na granicy lub w pierwszym urzędzie.", uk: "Подайте на кордоні або в першому офіційному органі." } },
  register: {
    title: { en: "Registration with authorities", es: "Registro con las autoridades", fr: "Enregistrement auprès des autorités", de: "Registrierung bei Behörden", it: "Registrazione presso le autorità", pt: "Registo nas autoridades", pl: "Rejestracja w urzędach", uk: "Реєстрація в органах влади" },
    description: { en: "You will receive a temporary protection certificate.", es: "Recibirás un certificado de protección temporal.", fr: "Vous recevrez une attestation de protection temporaire.", de: "Sie erhalten eine Bescheinigung über vorübergehenden Schutz.", it: "Riceverai un certificato di protezione temporanea.", pt: "Receberá um certificado de proteção temporária.", pl: "Otrzymasz zaświadczenie o ochronie tymczasowej.", uk: "Ви отримаєте посвідчення тимчасового захисту." } },
  health: {
    title: { en: "Health screening", es: "Examen médico", fr: "Examen médical", de: "Gesundheitsuntersuchung", it: "Visita medica", pt: "Triagem de saúde", pl: "Badania zdrowotne", uk: "Медичний огляд" },
    description: { en: "Free basic care provided to registered applicants.", es: "Atención básica gratuita para personas registradas.", fr: "Soins de base gratuits pour les demandeurs enregistrés.", de: "Kostenlose Grundversorgung für registrierte Antragsteller.", it: "Cure base gratuite per i richiedenti registrati.", pt: "Cuidados básicos gratuitos para requerentes registados.", pl: "Bezpłatna podstawowa opieka dla zarejestrowanych.", uk: "Безкоштовна базова допомога для зареєстрованих заявників." } },
};
