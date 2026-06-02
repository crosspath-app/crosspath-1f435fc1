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
    title: { en: "Address registration", es: "Registro de domicilio", fr: "Déclaration de domicile", de: "Adressanmeldung", it: "Registrazione di residenza", pt: "Registo de morada", pl: "Rejestracja adresu", uk: "Реєстрація адреси" },
    description: { en: "Register your local address with the authorities after arrival (deadline varies by country).", es: "Registra tu domicilio local ante las autoridades tras la llegada (plazo según país).", fr: "Déclarez votre adresse locale auprès des autorités après l'arrivée (délai selon le pays).", de: "Melden Sie Ihre Adresse nach Einzug bei den Behörden an (Frist je nach Land).", it: "Registra l'indirizzo presso le autorità all'arrivo (scadenza per paese).", pt: "Registe a sua morada junto das autoridades após a chegada (prazo varia por país).", pl: "Zarejestruj swój adres w urzędzie po przyjeździe (termin zależy od kraju).", uk: "Зареєструйте місцеву адресу в органах влади після прибуття (термін залежить від країни)." } },
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

// ------- GLOSSARY -------
type GlossL = { id: string; term: Tx; meaning: Tx };
const GLOSSARY_L: GlossL[] = [
  { id: "apostille",
    term: { en: "Apostille", es: "Apostilla", fr: "Apostille", de: "Apostille", it: "Apostille", pt: "Apostila", pl: "Apostille", uk: "Апостиль" },
    meaning: { en: "An international stamp that certifies a document is genuine, accepted in 120+ countries.", es: "Un sello internacional que certifica que un documento es auténtico, aceptado en 120+ países.", fr: "Un tampon international qui certifie l'authenticité d'un document, accepté dans plus de 120 pays.", de: "Ein internationaler Stempel, der die Echtheit eines Dokuments bestätigt; in 120+ Ländern anerkannt.", it: "Un timbro internazionale che certifica l'autenticità di un documento, accettato in 120+ paesi.", pt: "Um carimbo internacional que certifica a autenticidade de um documento, aceite em 120+ países.", pl: "Międzynarodowa pieczęć potwierdzająca autentyczność dokumentu, uznawana w 120+ krajach.", uk: "Міжнародний штамп, що засвідчує справжність документа, прийнятий у 120+ країнах." } },
  { id: "anmeldung",
    term: { en: "Anmeldung", es: "Anmeldung", fr: "Anmeldung", de: "Anmeldung", it: "Anmeldung", pt: "Anmeldung", pl: "Anmeldung", uk: "Anmeldung" },
    meaning: { en: "German address registration. Required within 14 days of moving in.", es: "Registro de domicilio alemán. Obligatorio en 14 días tras mudarse.", fr: "Déclaration de domicile allemande. Obligatoire sous 14 jours après l'emménagement.", de: "Deutsche Wohnsitzanmeldung. Innerhalb von 14 Tagen nach Einzug erforderlich.", it: "Registrazione di residenza tedesca. Obbligatoria entro 14 giorni dal trasloco.", pt: "Registo de morada na Alemanha. Obrigatório nos 14 dias após mudança.", pl: "Niemiecki meldunek. Wymagany w 14 dni od wprowadzenia się.", uk: "Реєстрація адреси в Німеччині. Обов'язкова протягом 14 днів після переїзду." } },
  { id: "finmeans",
    term: { en: "Proof of financial means", es: "Justificante de medios económicos", fr: "Justificatif de ressources", de: "Finanzierungsnachweis", it: "Prova di mezzi finanziari", pt: "Prova de meios financeiros", pl: "Dowód środków finansowych", uk: "Підтвердження фінансових засобів" },
    meaning: { en: "Documents showing you can support yourself financially while abroad.", es: "Documentos que muestran que puedes mantenerte económicamente en el extranjero.", fr: "Documents prouvant que vous pouvez subvenir à vos besoins à l'étranger.", de: "Dokumente, die belegen, dass Sie sich im Ausland finanzieren können.", it: "Documenti che dimostrano che puoi mantenerti all'estero.", pt: "Documentos a provar que se pode sustentar no estrangeiro.", pl: "Dokumenty pokazujące, że utrzymasz się za granicą.", uk: "Документи, що підтверджують вашу спроможність утримувати себе за кордоном." } },
  { id: "respermit",
    term: { en: "Residence permit", es: "Permiso de residencia", fr: "Titre de séjour", de: "Aufenthaltstitel", it: "Permesso di soggiorno", pt: "Autorização de residência", pl: "Zezwolenie na pobyt", uk: "Посвідка на проживання" },
    meaning: { en: "Official authorization to live in a country for an extended period.", es: "Autorización oficial para vivir en un país por un periodo prolongado.", fr: "Autorisation officielle de vivre dans un pays pour une durée prolongée.", de: "Offizielle Erlaubnis, längere Zeit in einem Land zu leben.", it: "Autorizzazione ufficiale a vivere in un paese per un periodo prolungato.", pt: "Autorização oficial para viver num país por período prolongado.", pl: "Oficjalne pozwolenie na dłuższy pobyt w kraju.", uk: "Офіційний дозвіл на тривале проживання в країні." } },
  { id: "schengen",
    term: { en: "Schengen", es: "Schengen", fr: "Schengen", de: "Schengen", it: "Schengen", pt: "Schengen", pl: "Schengen", uk: "Шенген" },
    meaning: { en: "A zone of 29 European countries with no internal border checks.", es: "Zona de 29 países europeos sin controles fronterizos internos.", fr: "Une zone de 29 pays européens sans contrôles aux frontières internes.", de: "Eine Zone von 29 europäischen Ländern ohne Binnengrenzkontrollen.", it: "Una zona di 29 paesi europei senza controlli alle frontiere interne.", pt: "Zona de 29 países europeus sem controlos fronteiriços internos.", pl: "Strefa 29 europejskich krajów bez wewnętrznych kontroli granicznych.", uk: "Зона з 29 європейських країн без внутрішнього прикордонного контролю." } },
  { id: "taxres",
    term: { en: "Tax residency", es: "Residencia fiscal", fr: "Résidence fiscale", de: "Steuerresidenz", it: "Residenza fiscale", pt: "Residência fiscal", pl: "Rezydencja podatkowa", uk: "Податкове резидентство" },
    meaning: { en: "The country that has the right to tax your worldwide income, usually based on the 183-day rule.", es: "El país que tiene derecho a gravar tu renta mundial, normalmente según la regla de 183 días.", fr: "Le pays qui peut imposer vos revenus mondiaux, généralement selon la règle des 183 jours.", de: "Das Land, das Ihr weltweites Einkommen besteuern darf — meist nach der 183-Tage-Regel.", it: "Il paese che ha diritto a tassare il tuo reddito globale, di solito in base alla regola dei 183 giorni.", pt: "O país com direito de tributar o seu rendimento global, geralmente pela regra dos 183 dias.", pl: "Kraj, który może opodatkować Twój globalny dochód, zwykle wg reguły 183 dni.", uk: "Країна, яка має право оподатковувати ваш світовий дохід (зазвичай за правилом 183 днів)." } },
];

// ------- HOW_TO -------
type HowL = { where: Tx; steps: Tx[]; forgotten: Tx[]; cost: Tx; tip?: Tx };
const HOWTO_L: Record<string, HowL> = {
  passport: {
    where: { en: "Your home country's passport office, embassy, or consulate.", es: "Oficina de pasaportes, embajada o consulado de tu país.", fr: "Bureau des passeports, ambassade ou consulat de votre pays.", de: "Passamt, Botschaft oder Konsulat Ihres Heimatlandes.", it: "Ufficio passaporti, ambasciata o consolato del tuo paese.", pt: "Repartição de passaportes, embaixada ou consulado do seu país.", pl: "Urząd paszportowy, ambasada lub konsulat Twojego kraju.", uk: "Паспортний стіл, посольство або консульство вашої країни." },
    steps: [
      { en: "Book an appointment online (slots fill weeks in advance).", es: "Reserva cita online (los huecos se llenan con semanas).", fr: "Prenez rendez-vous en ligne (créneaux pris des semaines à l'avance).", de: "Termin online buchen (Plätze sind Wochen im Voraus belegt).", it: "Prenota un appuntamento online (i posti finiscono settimane prima).", pt: "Marque online (vagas esgotam semanas antes).", pl: "Zarezerwuj termin online (miejsca znikają tygodnie wcześniej).", uk: "Запишіться онлайн (місця бронюють за тижні)." },
      { en: "Gather: birth certificate, ID, biometric photo, old passport.", es: "Reúne: partida de nacimiento, DNI, foto biométrica, pasaporte anterior.", fr: "Préparez : acte de naissance, CNI, photo biométrique, ancien passeport.", de: "Sammeln: Geburtsurkunde, Ausweis, biometrisches Foto, alter Pass.", it: "Raccogli: certificato di nascita, ID, foto biometrica, vecchio passaporto.", pt: "Reúna: certidão, BI, foto biométrica, passaporte antigo.", pl: "Przygotuj: akt urodzenia, dowód, zdjęcie biometryczne, stary paszport.", uk: "Зберіть: свідоцтво про народження, ID, біометричне фото, старий паспорт." },
      { en: "Pay the issuance fee and submit fingerprints in person.", es: "Paga la tasa y entrega huellas en persona.", fr: "Payez les frais et faites prendre vos empreintes sur place.", de: "Gebühr zahlen und Fingerabdrücke vor Ort abgeben.", it: "Paga la tassa e fai impronte di persona.", pt: "Pague a taxa e dê impressões digitais presencialmente.", pl: "Zapłać opłatę i oddaj odciski palców osobiście.", uk: "Сплатіть мито та здайте відбитки особисто." },
      { en: "Pick up or receive by mail in 2–6 weeks (rush options exist).", es: "Recoge o recibe por correo en 2–6 semanas (hay urgente).", fr: "Récupérez ou recevez par courrier en 2–6 semaines (option urgente).", de: "Abholen oder per Post in 2–6 Wochen erhalten (Express möglich).", it: "Ritira o ricevi per posta in 2–6 settimane (esiste opzione urgente).", pt: "Recolha ou receba pelo correio em 2–6 semanas (urgente disponível).", pl: "Odbierz lub otrzymaj pocztą w 2–6 tyg. (jest opcja ekspres).", uk: "Заберіть або отримайте поштою за 2–6 тижнів (є експрес)." },
    ],
    forgotten: [
      { en: "Photo size rules differ per country", es: "Los tamaños de foto varían por país", fr: "Les formats photo varient selon les pays", de: "Fotomaße sind länderspezifisch", it: "Le misure foto cambiano per paese", pt: "Tamanhos de foto variam por país", pl: "Rozmiary zdjęć różnią się w krajach", uk: "Розміри фото відрізняються в країнах" },
      { en: "Validity must extend 6+ months past your stay", es: "Validez debe superar tu estancia en 6+ meses", fr: "Validité 6+ mois après votre séjour", de: "Gültigkeit 6+ Monate über Aufenthalt hinaus", it: "Validità 6+ mesi oltre il soggiorno", pt: "Validade 6+ meses após estadia", pl: "Ważność 6+ mies. po pobycie", uk: "Дійсність 6+ міс. після перебування" },
    ],
    cost: { en: "€50–€150", es: "50–150 €", fr: "50–150 €", de: "50–150 €", it: "50–150 €", pt: "50–150 €", pl: "50–150 €", uk: "50–150 €" },
    tip: { en: "Scan every page and store an encrypted copy in cloud and on your phone.", es: "Escanea cada página y guarda copia cifrada en la nube y el móvil.", fr: "Scannez chaque page et conservez une copie chiffrée dans le cloud et sur votre téléphone.", de: "Jede Seite scannen und verschlüsselt in Cloud + Handy speichern.", it: "Scansiona ogni pagina e conserva una copia cifrata su cloud e telefono.", pt: "Digitalize cada página e guarde cópia cifrada na nuvem e no telemóvel.", pl: "Zeskanuj każdą stronę i trzymaj zaszyfrowaną kopię w chmurze i telefonie.", uk: "Скануйте кожну сторінку та зберігайте шифровану копію в хмарі й телефоні." },
  },
  acceptance: {
    where: { en: "Your host university's international office.", es: "Oficina internacional de tu universidad de acogida.", fr: "Bureau international de votre université d'accueil.", de: "International Office Ihrer Gasthochschule.", it: "Ufficio internazionale dell'università ospitante.", pt: "Gabinete internacional da universidade de acolhimento.", pl: "Biuro międzynarodowe uczelni przyjmującej.", uk: "Міжнародний відділ приймаючого ВНЗ." },
    steps: [
      { en: "Confirm enrollment and pay any deposit required.", es: "Confirma matrícula y paga el depósito si lo hay.", fr: "Confirmez l'inscription et payez l'éventuel acompte.", de: "Einschreibung bestätigen und ggf. Anzahlung leisten.", it: "Conferma iscrizione e versa l'eventuale caparra.", pt: "Confirme matrícula e pague depósito se exigido.", pl: "Potwierdź zapis i zapłać zaliczkę.", uk: "Підтвердіть зарахування та сплатіть депозит, якщо є." },
      { en: "Request the official admission letter — original signed and stamped.", es: "Pide la carta de admisión original firmada y sellada.", fr: "Demandez la lettre d'admission originale signée et tamponnée.", de: "Offizielle Zulassung anfordern — Original, unterzeichnet & gestempelt.", it: "Richiedi la lettera ufficiale firmata e timbrata.", pt: "Peça a carta oficial original assinada e carimbada.", pl: "Poproś o oryginał listu z podpisem i pieczęcią.", uk: "Запросіть оригінал листа з підписом і печаткою." },
      { en: "Ask for an extra copy in English for visa purposes.", es: "Pide una copia extra en inglés para el visado.", fr: "Demandez un exemplaire en anglais pour le visa.", de: "Eine Extra-Kopie auf Englisch fürs Visum anfordern.", it: "Chiedi una copia in inglese per il visto.", pt: "Peça uma cópia em inglês para o visto.", pl: "Poproś o dodatkową kopię po angielsku do wizy.", uk: "Попросіть копію англійською для візи." },
      { en: "Have it shipped or download a verifiable PDF.", es: "Pídelo por correo o descarga un PDF verificable.", fr: "Faites-la envoyer ou téléchargez un PDF vérifiable.", de: "Per Post versenden lassen oder verifizierbares PDF herunterladen.", it: "Fattela spedire o scarica un PDF verificabile.", pt: "Envie pelo correio ou descarregue um PDF verificável.", pl: "Wyślij pocztą lub pobierz weryfikowalny PDF.", uk: "Замовте поштою або завантажте перевірний PDF." },
    ],
    forgotten: [
      { en: "Some embassies require the original on paper, not a scan", es: "Algunas embajadas exigen el original, no un escaneo", fr: "Certaines ambassades exigent l'original papier", de: "Manche Botschaften verlangen das Originalpapier", it: "Alcune ambasciate vogliono l'originale cartaceo", pt: "Algumas embaixadas exigem o original em papel", pl: "Niektóre ambasady wymagają oryginału papierowego", uk: "Деякі посольства вимагають оригінал на папері" },
    ],
    cost: { en: "Free (deposit may apply)", es: "Gratis (puede haber depósito)", fr: "Gratuit (acompte possible)", de: "Kostenlos (Anzahlung möglich)", it: "Gratis (può richiedere caparra)", pt: "Grátis (pode haver depósito)", pl: "Bezpłatnie (zaliczka możliwa)", uk: "Безкоштовно (можливий депозит)" },
  },
  visa: {
    where: { en: "The destination country's embassy or consulate in your home country.", es: "Embajada o consulado del país de destino en tu país.", fr: "Ambassade ou consulat du pays de destination dans votre pays.", de: "Botschaft/Konsulat des Ziellandes in Ihrem Heimatland.", it: "Ambasciata o consolato del paese di destinazione nel tuo paese.", pt: "Embaixada/consulado do país de destino no seu país.", pl: "Ambasada lub konsulat kraju docelowego w Twoim kraju.", uk: "Посольство або консульство країни призначення." },
    steps: [
      { en: "Check the exact visa category on the embassy's official site.", es: "Verifica la categoría de visado en la web oficial.", fr: "Vérifiez la catégorie exacte de visa sur le site officiel.", de: "Genaue Visumkategorie auf der offiziellen Website prüfen.", it: "Verifica la categoria sul sito ufficiale.", pt: "Verifique a categoria no site oficial.", pl: "Sprawdź dokładną kategorię na stronie ambasady.", uk: "Перевірте точну категорію візи на офіційному сайті." },
      { en: "Book the appointment — slots can be 4–8 weeks out.", es: "Reserva la cita — los huecos pueden ir a 4–8 semanas.", fr: "Prenez rendez-vous — créneaux à 4–8 semaines.", de: "Termin buchen — Wartezeit 4–8 Wochen.", it: "Prenota — slot anche a 4–8 settimane.", pt: "Marque — vagas a 4–8 semanas.", pl: "Zarezerwuj — terminy 4–8 tygodni.", uk: "Запишіться — слоти за 4–8 тижнів." },
      { en: "Prepare: passport, photos, acceptance/contract, funds proof, insurance, application form.", es: "Prepara: pasaporte, fotos, admisión/contrato, fondos, seguro, formulario.", fr: "Préparez : passeport, photos, admission/contrat, ressources, assurance, formulaire.", de: "Vorbereiten: Pass, Fotos, Zulassung/Vertrag, Finanznachweis, Versicherung, Antrag.", it: "Prepara: passaporto, foto, ammissione/contratto, fondi, assicurazione, modulo.", pt: "Prepare: passaporte, fotos, admissão/contrato, fundos, seguro, formulário.", pl: "Przygotuj: paszport, zdjęcia, list/umowa, środki, ubezpieczenie, wniosek.", uk: "Підготуйте: паспорт, фото, зарахування/контракт, кошти, страхування, анкета." },
      { en: "Attend the interview, submit biometrics, pay the fee.", es: "Asiste a la entrevista, da biometría, paga la tasa.", fr: "Présentez-vous, donnez vos biométries, payez.", de: "Interview, Biometrie, Gebühr.", it: "Vai al colloquio, biometria, paga.", pt: "Vá à entrevista, biometria, pague.", pl: "Idź na rozmowę, biometria, opłata.", uk: "Прийдіть на інтерв'ю, біометрія, сплата." },
      { en: "Track your application; collect the visa sticker when ready.", es: "Sigue el trámite; recoge el visado cuando esté listo.", fr: "Suivez la demande ; récupérez le visa quand prêt.", de: "Antrag verfolgen; Visumetikett abholen.", it: "Traccia la pratica; ritira il visto quando pronto.", pt: "Acompanhe; recolha o visto quando pronto.", pl: "Śledź wniosek; odbierz wizę, gdy gotowa.", uk: "Стежте за заявкою; заберіть візу, коли готова." },
    ],
    forgotten: [
      { en: "Apostille on diplomas", es: "Apostilla en diplomas", fr: "Apostille sur les diplômes", de: "Apostille auf Diplomen", it: "Apostille sui diplomi", pt: "Apostila em diplomas", pl: "Apostille na dyplomach", uk: "Апостиль на дипломах" },
      { en: "Certified translations", es: "Traducciones juradas", fr: "Traductions assermentées", de: "Beglaubigte Übersetzungen", it: "Traduzioni giurate", pt: "Traduções certificadas", pl: "Tłumaczenia przysięgłe", uk: "Завірені переклади" },
      { en: "Extra passport photos", es: "Fotos extra de pasaporte", fr: "Photos d'identité supplémentaires", de: "Extra Passfotos", it: "Foto tessera extra", pt: "Fotos extra", pl: "Dodatkowe zdjęcia paszportowe", uk: "Додаткові фото на паспорт" },
    ],
    cost: { en: "€60–€200", es: "60–200 €", fr: "60–200 €", de: "60–200 €", it: "60–200 €", pt: "60–200 €", pl: "60–200 €", uk: "60–200 €" },
    tip: { en: "Apply as early as legally allowed — usually 3 months before travel.", es: "Solicita lo antes posible — normalmente 3 meses antes del viaje.", fr: "Demandez dès que possible — généralement 3 mois avant le voyage.", de: "So früh wie erlaubt beantragen — meist 3 Monate vor Reise.", it: "Richiedi appena consentito — di solito 3 mesi prima.", pt: "Peça assim que permitido — geralmente 3 meses antes.", pl: "Składaj wniosek najwcześniej, jak można — zwykle 3 mies. przed wyjazdem.", uk: "Подавайте якнайраніше — зазвичай за 3 місяці до подорожі." },
  },
  workpermit: {
    where: { en: "Sponsored by your employer through the destination's labor authority.", es: "Patrocinado por tu empleador ante la autoridad laboral.", fr: "Parrainé par votre employeur via l'autorité du travail.", de: "Vom Arbeitgeber bei der Arbeitsbehörde gesponsert.", it: "Sponsorizzato dal datore tramite l'autorità del lavoro.", pt: "Patrocinado pelo empregador via autoridade laboral.", pl: "Sponsorowane przez pracodawcę przez urząd pracy.", uk: "Спонсорує роботодавець через орган праці." },
    steps: [
      { en: "Receive the signed employment contract.", es: "Recibe el contrato firmado.", fr: "Recevez le contrat signé.", de: "Unterschriebenen Arbeitsvertrag erhalten.", it: "Ricevi il contratto firmato.", pt: "Receba o contrato assinado.", pl: "Odbierz podpisaną umowę.", uk: "Отримайте підписаний контракт." },
      { en: "Employer files the work permit / sponsorship application.", es: "El empleador presenta la solicitud de permiso / patrocinio.", fr: "L'employeur dépose la demande de permis/parrainage.", de: "Arbeitgeber stellt Antrag auf Arbeitserlaubnis/Sponsoring.", it: "Il datore presenta la domanda di permesso/sponsorship.", pt: "Empregador apresenta o pedido de autorização/patrocínio.", pl: "Pracodawca składa wniosek o pozwolenie/sponsorship.", uk: "Роботодавець подає заявку на дозвіл/спонсорство." },
      { en: "You apply for the matching work visa at the embassy.", es: "Solicita el visado de trabajo correspondiente en la embajada.", fr: "Demandez le visa de travail correspondant à l'ambassade.", de: "Sie beantragen das passende Arbeitsvisum bei der Botschaft.", it: "Richiedi il visto di lavoro all'ambasciata.", pt: "Solicite o visto correspondente na embaixada.", pl: "Złóż wniosek o odpowiednią wizę pracowniczą w ambasadzie.", uk: "Подайте на відповідну робочу візу в посольстві." },
      { en: "Enter the country and convert to a residence permit on arrival.", es: "Entra al país y convierte en permiso de residencia al llegar.", fr: "Entrez et convertissez en titre de séjour à l'arrivée.", de: "Einreisen und vor Ort in Aufenthaltstitel umwandeln.", it: "Entra nel paese e converti in permesso di soggiorno.", pt: "Entre no país e converta em autorização de residência.", pl: "Wjedź i zamień na zezwolenie na pobyt po przyjeździe.", uk: "В'їдьте та обміняйте на посвідку при прибутті." },
    ],
    forgotten: [
      { en: "Recognition of foreign qualifications", es: "Reconocimiento de títulos extranjeros", fr: "Reconnaissance des diplômes étrangers", de: "Anerkennung ausländischer Abschlüsse", it: "Riconoscimento dei titoli esteri", pt: "Reconhecimento de qualificações estrangeiras", pl: "Uznawanie zagranicznych kwalifikacji", uk: "Визнання іноземних кваліфікацій" },
      { en: "Apostilled diplomas", es: "Diplomas con apostilla", fr: "Diplômes apostillés", de: "Diplome mit Apostille", it: "Diplomi con apostille", pt: "Diplomas apostilados", pl: "Dyplomy z apostille", uk: "Дипломи з апостилем" },
    ],
    cost: { en: "€100–€400 (often paid by employer)", es: "100–400 € (a menudo paga el empleador)", fr: "100–400 € (souvent payés par l'employeur)", de: "100–400 € (oft vom Arbeitgeber bezahlt)", it: "100–400 € (spesso paga il datore)", pt: "100–400 € (muitas vezes pago pelo empregador)", pl: "100–400 € (często płaci pracodawca)", uk: "100–400 € (часто оплачує роботодавець)" },
  },
  contract: {
    where: { en: "From your employer's HR department.", es: "Del departamento de RR. HH. del empleador.", fr: "Du service RH de votre employeur.", de: "Von der Personalabteilung Ihres Arbeitgebers.", it: "Dal reparto HR del datore.", pt: "Do RH do seu empregador.", pl: "Z działu HR pracodawcy.", uk: "Від відділу кадрів роботодавця." },
    steps: [
      { en: "Negotiate salary, role, start date, and relocation support.", es: "Negocia salario, puesto, fecha de inicio y apoyo de mudanza.", fr: "Négociez salaire, poste, date de début et aide à la relocation.", de: "Gehalt, Rolle, Startdatum und Umzugshilfe verhandeln.", it: "Negozia stipendio, ruolo, data inizio, supporto trasloco.", pt: "Negocie salário, função, data início e apoio de mudança.", pl: "Negocjuj pensję, stanowisko, datę startu i wsparcie relokacji.", uk: "Узгодьте зарплату, посаду, дату початку, підтримку переїзду." },
      { en: "Request the signed contract in writing — PDF and original.", es: "Pide el contrato firmado por escrito — PDF y original.", fr: "Demandez le contrat signé écrit — PDF et original.", de: "Schriftlichen Vertrag verlangen — PDF und Original.", it: "Chiedi il contratto scritto firmato — PDF e originale.", pt: "Peça o contrato escrito assinado — PDF e original.", pl: "Poproś o umowę pisemną — PDF i oryginał.", uk: "Запросіть письмовий підписаний контракт — PDF і оригінал." },
      { en: "Have it translated if not in an official language of the destination.", es: "Tradúcelo si no está en idioma oficial del destino.", fr: "Faites-le traduire si ce n'est pas dans une langue officielle.", de: "Übersetzen lassen, falls nicht in Amtssprache.", it: "Fallo tradurre se non in lingua ufficiale.", pt: "Traduza se não estiver em língua oficial.", pl: "Przetłumacz, jeśli nie w języku urzędowym.", uk: "Перекладіть, якщо не офіційною мовою." },
    ],
    forgotten: [
      { en: "Probation clause", es: "Cláusula de prueba", fr: "Clause de période d'essai", de: "Probezeit-Klausel", it: "Clausola di prova", pt: "Cláusula de período experimental", pl: "Klauzula okresu próbnego", uk: "Випробувальний строк" },
      { en: "Notice period", es: "Plazo de preaviso", fr: "Préavis", de: "Kündigungsfrist", it: "Periodo di preavviso", pt: "Aviso prévio", pl: "Okres wypowiedzenia", uk: "Строк попередження" },
      { en: "Relocation allowance", es: "Bono de relocalización", fr: "Indemnité de relocation", de: "Umzugskostenpauschale", it: "Indennità di trasloco", pt: "Subsídio de relocação", pl: "Dodatek relokacyjny", uk: "Виплата на переїзд" },
    ],
    cost: { en: "Free", es: "Gratis", fr: "Gratuit", de: "Kostenlos", it: "Gratis", pt: "Grátis", pl: "Bezpłatnie", uk: "Безкоштовно" },
  },
};

Object.assign(HOWTO_L, {
  qualifications: {
    where: { en: "Your home university plus the destination's recognition authority.", es: "Tu universidad y la autoridad de reconocimiento del destino.", fr: "Votre université et l'autorité de reconnaissance du pays.", de: "Heimatuni und Anerkennungsstelle im Zielland.", it: "La tua università e l'ente di riconoscimento del paese.", pt: "Sua universidade e a autoridade de reconhecimento do destino.", pl: "Twoja uczelnia oraz organ uznawania w kraju docelowym.", uk: "Ваш ВНЗ та орган визнання в країні призначення." },
    steps: [
      { en: "Order official transcripts and diploma copies.", es: "Pide expedientes oficiales y copias del diploma.", fr: "Commandez relevés et copies du diplôme.", de: "Offizielle Notenauszüge und Diplomkopien anfordern.", it: "Richiedi pagelle ufficiali e copie del diploma.", pt: "Peça históricos e cópias do diploma.", pl: "Zamów wyciągi i kopie dyplomu.", uk: "Замовте офіційні виписки та копії диплома." },
      { en: "Get an apostille from your country's foreign affairs ministry.", es: "Obtén la apostilla en tu ministerio de exteriores.", fr: "Obtenez l'apostille au ministère des affaires étrangères.", de: "Apostille beim Auswärtigen Amt holen.", it: "Ottieni l'apostille dal ministero degli esteri.", pt: "Obtenha apostila no ministério dos negócios estrangeiros.", pl: "Uzyskaj apostille w MSZ.", uk: "Отримайте апостиль у МЗС." },
      { en: "Order certified translations into the destination's language.", es: "Pide traducción jurada al idioma del destino.", fr: "Commandez une traduction assermentée.", de: "Beglaubigte Übersetzung in die Zielsprache bestellen.", it: "Richiedi traduzione giurata.", pt: "Encomende tradução certificada.", pl: "Zamów tłumaczenie przysięgłe na język docelowy.", uk: "Замовте завірений переклад мовою країни." },
      { en: "Submit to the recognition body (e.g. ZAB in Germany, ENIC-NARIC in EU).", es: "Envíalo al organismo de reconocimiento (p. ej. ZAB en DE).", fr: "Soumettez à l'organisme de reconnaissance (ZAB en DE, ENIC-NARIC en UE).", de: "Bei Anerkennungsstelle einreichen (z. B. ZAB).", it: "Invia all'ente di riconoscimento (ZAB in DE, ENIC-NARIC in UE).", pt: "Submeta ao organismo de reconhecimento.", pl: "Złóż w organie uznawania (np. ZAB w DE).", uk: "Подайте до органу визнання (напр. ZAB у DE)." },
    ],
    forgotten: [
      { en: "Apostille must be on the original, not a copy", es: "La apostilla debe ir en el original, no en copia", fr: "L'apostille doit être sur l'original", de: "Apostille muss am Original sein, nicht an Kopie", it: "L'apostille va sull'originale", pt: "Apostila tem de estar no original", pl: "Apostille musi być na oryginale", uk: "Апостиль має бути на оригіналі" },
    ],
    cost: { en: "€50–€300", es: "50–300 €", fr: "50–300 €", de: "50–300 €", it: "50–300 €", pt: "50–300 €", pl: "50–300 €", uk: "50–300 €" },
  },
  nomadvisa: {
    where: { en: "Destination's consulate or online portal (varies by country).", es: "Consulado del destino o portal online (varía).", fr: "Consulat du pays ou portail en ligne (selon le pays).", de: "Konsulat oder Online-Portal des Ziellandes.", it: "Consolato del paese o portale online (varia).", pt: "Consulado do destino ou portal online.", pl: "Konsulat lub portal online (zależnie od kraju).", uk: "Консульство або онлайн-портал країни." },
    steps: [
      { en: "Verify income threshold (often €2,500–€3,500/month).", es: "Verifica el umbral de ingresos (a menudo 2.500–3.500 €/mes).", fr: "Vérifiez le seuil de revenus (souvent 2 500–3 500 €/mois).", de: "Einkommensgrenze prüfen (oft 2.500–3.500 €/Monat).", it: "Verifica la soglia di reddito (spesso 2.500–3.500 €/mese).", pt: "Verifique o limiar (2.500–3.500 €/mês).", pl: "Sprawdź próg dochodu (2 500–3 500 €/mies.).", uk: "Перевірте поріг доходу (2 500–3 500 €/міс.)." },
      { en: "Gather contracts, invoices, and 6 months of bank statements.", es: "Reúne contratos, facturas y 6 meses de extractos.", fr: "Réunissez contrats, factures et 6 mois de relevés.", de: "Verträge, Rechnungen und 6 Monate Kontoauszüge sammeln.", it: "Raccogli contratti, fatture e 6 mesi di estratti.", pt: "Junte contratos, faturas e 6 meses de extratos.", pl: "Zbierz umowy, faktury, 6 mies. wyciągów.", uk: "Зберіть контракти, рахунки та 6 міс. виписок." },
      { en: "Get international health insurance covering the full stay.", es: "Contrata seguro internacional para toda la estancia.", fr: "Souscrivez une assurance santé internationale pour tout le séjour.", de: "Internationale Krankenversicherung für gesamten Aufenthalt.", it: "Stipula assicurazione internazionale per tutto il soggiorno.", pt: "Contrate seguro internacional para toda a estadia.", pl: "Wykup międzynarodowe ubezpieczenie na cały pobyt.", uk: "Оформіть міжнародне страхування на весь термін." },
      { en: "Submit application online or at the consulate; pay the fee.", es: "Envía la solicitud online o en el consulado; paga la tasa.", fr: "Déposez en ligne ou au consulat ; payez les frais.", de: "Antrag online oder im Konsulat einreichen; Gebühr zahlen.", it: "Invia online o in consolato; paga la tassa.", pt: "Submeta online ou no consulado; pague.", pl: "Złóż online lub w konsulacie; zapłać.", uk: "Подайте онлайн чи в консульстві; сплатіть." },
    ],
    forgotten: [
      { en: "Background check from home country", es: "Certificado de antecedentes del país", fr: "Extrait de casier judiciaire du pays d'origine", de: "Führungszeugnis aus Heimatland", it: "Certificato penale dal paese d'origine", pt: "Registo criminal do país de origem", pl: "Zaświadczenie o niekaralności z kraju", uk: "Довідка про відсутність судимості" },
      { en: "Tax residency implications", es: "Implicaciones de residencia fiscal", fr: "Implications de résidence fiscale", de: "Steuerresidenz-Folgen", it: "Implicazioni di residenza fiscale", pt: "Implicações de residência fiscal", pl: "Skutki rezydencji podatkowej", uk: "Наслідки податкового резидентства" },
    ],
    cost: { en: "€60–€300", es: "60–300 €", fr: "60–300 €", de: "60–300 €", it: "60–300 €", pt: "60–300 €", pl: "60–300 €", uk: "60–300 €" },
    tip: { en: "Portugal, Spain, Estonia, and UAE have the most established schemes.", es: "Portugal, España, Estonia y EAU tienen los esquemas más consolidados.", fr: "Portugal, Espagne, Estonie et EAU ont les régimes les plus établis.", de: "Portugal, Spanien, Estland und VAE haben die etabliertesten Programme.", it: "Portogallo, Spagna, Estonia ed Emirati hanno schemi più solidi.", pt: "Portugal, Espanha, Estónia e EAU têm os esquemas mais estabelecidos.", pl: "Portugalia, Hiszpania, Estonia i ZEA mają najlepiej rozwinięte programy.", uk: "Найрозвиненіші програми — Португалія, Іспанія, Естонія, ОАЕ." },
  },
  income: {
    where: { en: "Your bank, accountant, or client portals.", es: "Tu banco, contable o portales de clientes.", fr: "Votre banque, comptable ou espaces clients.", de: "Bank, Steuerberater oder Kunden-Portale.", it: "La tua banca, commercialista o portali clienti.", pt: "Banco, contabilista ou portais de clientes.", pl: "Bank, księgowa lub portale klientów.", uk: "Банк, бухгалтер або портали клієнтів." },
    steps: [
      { en: "Download 6 months of bank statements (stamped if possible).", es: "Descarga 6 meses de extractos (sellados si es posible).", fr: "Téléchargez 6 mois de relevés (tamponnés si possible).", de: "6 Monate Kontoauszüge herunterladen (möglichst gestempelt).", it: "Scarica 6 mesi di estratti (timbrati se possibile).", pt: "Descarregue 6 meses de extratos (carimbados se possível).", pl: "Pobierz 6 mies. wyciągów (z pieczęcią).", uk: "Завантажте 6 міс. виписок (з печаткою, якщо можна)." },
      { en: "Gather active client contracts or employer letter.", es: "Reúne contratos de clientes activos o carta del empleador.", fr: "Rassemblez contrats clients ou lettre de l'employeur.", de: "Aktive Kundenverträge oder Arbeitgeberbrief sammeln.", it: "Raccogli contratti clienti o lettera del datore.", pt: "Junte contratos ativos ou carta do empregador.", pl: "Zbierz aktywne umowy lub list pracodawcy.", uk: "Зберіть діючі контракти або лист роботодавця." },
      { en: "Get an accountant's letter confirming average monthly income.", es: "Pide al contable carta de ingresos medios mensuales.", fr: "Demandez à votre comptable une attestation de revenus moyens.", de: "Steuerberater-Schreiben zum Monatseinkommen besorgen.", it: "Ottieni una lettera del commercialista sul reddito medio.", pt: "Obtenha carta do contabilista do rendimento médio.", pl: "Uzyskaj zaświadczenie księgowego o średnim dochodzie.", uk: "Отримайте лист бухгалтера про середній місячний дохід." },
    ],
    forgotten: [
      { en: "Statements may need to be translated and stamped", es: "Los extractos pueden necesitar traducción y sello", fr: "Les relevés peuvent devoir être traduits et tamponnés", de: "Auszüge ggf. übersetzt und gestempelt", it: "Gli estratti vanno tradotti e timbrati", pt: "Extratos podem precisar tradução e carimbo", pl: "Wyciągi mogą wymagać tłumaczenia i pieczęci", uk: "Виписки можуть потребувати перекладу та печатки" },
    ],
    cost: { en: "Free–€100", es: "Gratis–100 €", fr: "Gratuit–100 €", de: "Kostenlos–100 €", it: "Gratis–100 €", pt: "Grátis–100 €", pl: "Bezpłatnie–100 €", uk: "Безкоштовно–100 €" },
  },
  funds: {
    where: { en: "Your bank — sometimes a special blocked account in the destination.", es: "Tu banco — a veces una cuenta bloqueada en el destino.", fr: "Votre banque — parfois un compte bloqué dans le pays.", de: "Ihre Bank — manchmal ein Sperrkonto im Zielland.", it: "La tua banca — a volte un conto bloccato nel paese.", pt: "O seu banco — às vezes conta bloqueada no destino.", pl: "Twój bank — czasem konto blokowane w kraju docelowym.", uk: "Ваш банк — інколи заблокований рахунок у країні." },
    steps: [
      { en: "Confirm the required amount (e.g. ~€11,900/year for Germany).", es: "Confirma la cantidad (p. ej. ~11.900 €/año en Alemania).", fr: "Confirmez le montant requis (env. 11 900 €/an pour l'Allemagne).", de: "Erforderlichen Betrag prüfen (z. B. ~11.900 €/Jahr Deutschland).", it: "Conferma l'importo (~11.900 €/anno per Germania).", pt: "Confirme o valor (~11.900 €/ano para Alemanha).", pl: "Sprawdź kwotę (np. ~11 900 €/rok dla Niemiec).", uk: "Підтвердіть суму (напр. ~11 900 €/рік для Німеччини)." },
      { en: "Open a blocked account (Sperrkonto) with Expatrio, Fintiba, or Coracle.", es: "Abre cuenta bloqueada (Sperrkonto) con Expatrio, Fintiba o Coracle.", fr: "Ouvrez un compte bloqué (Sperrkonto) chez Expatrio, Fintiba ou Coracle.", de: "Sperrkonto bei Expatrio, Fintiba oder Coracle eröffnen.", it: "Apri un conto bloccato (Sperrkonto) con Expatrio, Fintiba o Coracle.", pt: "Abra uma conta bloqueada com Expatrio, Fintiba ou Coracle.", pl: "Otwórz konto blokowane w Expatrio, Fintiba lub Coracle.", uk: "Відкрийте заблокований рахунок (Expatrio, Fintiba, Coracle)." },
      { en: "Transfer the full sum and receive the confirmation letter.", es: "Transfiere la suma y recibe la carta de confirmación.", fr: "Virez le montant et recevez la lettre de confirmation.", de: "Vollen Betrag überweisen, Bestätigung erhalten.", it: "Trasferisci la somma e ricevi la conferma.", pt: "Transfira a soma e receba a confirmação.", pl: "Przelej sumę i odbierz potwierdzenie.", uk: "Перекажіть повну суму та отримайте підтвердження." },
      { en: "Submit the letter with your visa application.", es: "Adjunta la carta a la solicitud de visado.", fr: "Joignez la lettre à votre demande de visa.", de: "Bestätigung dem Visumantrag beilegen.", it: "Allegala alla domanda di visto.", pt: "Anexe à candidatura de visto.", pl: "Dołącz do wniosku wizowego.", uk: "Додайте до візової заявки." },
    ],
    forgotten: [
      { en: "Transfer can take 1–2 weeks to clear", es: "La transferencia tarda 1–2 semanas en compensarse", fr: "Le virement peut mettre 1–2 semaines", de: "Überweisung dauert 1–2 Wochen", it: "Il bonifico richiede 1–2 settimane", pt: "Transferência demora 1–2 semanas", pl: "Przelew zajmuje 1–2 tygodnie", uk: "Переказ йде 1–2 тижні" },
    ],
    cost: { en: "€50–€150 setup", es: "50–150 € de apertura", fr: "50–150 € d'ouverture", de: "50–150 € Einrichtung", it: "50–150 € apertura", pt: "50–150 € de abertura", pl: "50–150 € na start", uk: "50–150 € відкриття" },
  },
  insurance: {
    where: { en: "Public scheme on arrival or a recognized private insurer.", es: "Sistema público al llegar o aseguradora privada reconocida.", fr: "Régime public à l'arrivée ou assureur privé reconnu.", de: "Gesetzliche Versicherung bei Ankunft oder anerkannter Privater.", it: "Sistema pubblico all'arrivo o assicuratore privato riconosciuto.", pt: "Sistema público à chegada ou seguradora reconhecida.", pl: "System publiczny po przyjeździe lub uznany prywatny.", uk: "Державна система після приїзду або визнаний приватний страховик." },
    steps: [
      { en: "Pick a provider accepted by the destination's authorities.", es: "Elige un proveedor aceptado por las autoridades.", fr: "Choisissez un assureur accepté par les autorités.", de: "Anbieter wählen, der von den Behörden akzeptiert ist.", it: "Scegli un fornitore accettato dalle autorità.", pt: "Escolha um seguro aceite pelas autoridades.", pl: "Wybierz dostawcę akceptowanego przez urząd.", uk: "Оберіть страховика, прийнятого владою." },
      { en: "Buy minimum coverage required (Schengen: €30,000+).", es: "Compra la cobertura mínima (Schengen: 30.000 €+).", fr: "Souscrivez la couverture minimale (Schengen : 30 000 €+).", de: "Mindestdeckung kaufen (Schengen: 30.000 €+).", it: "Acquista la copertura minima (Schengen: 30.000 €+).", pt: "Compre cobertura mínima (Schengen: 30.000 €+).", pl: "Kup minimalne pokrycie (Schengen: 30 000 €+).", uk: "Купіть мінімальне покриття (Шенген: 30 000 €+)." },
      { en: "Download the policy certificate in English.", es: "Descarga el certificado en inglés.", fr: "Téléchargez le certificat en anglais.", de: "Versicherungsschein auf Englisch herunterladen.", it: "Scarica il certificato in inglese.", pt: "Descarregue o certificado em inglês.", pl: "Pobierz polisę po angielsku.", uk: "Завантажте сертифікат англійською." },
      { en: "Switch to local public insurance once registered.", es: "Cambia al seguro público local una vez registrado.", fr: "Passez à l'assurance publique locale après l'enregistrement.", de: "Nach Anmeldung in gesetzliche Versicherung wechseln.", it: "Passa all'assicurazione pubblica locale dopo la registrazione.", pt: "Mude para seguro público após registo.", pl: "Po zameldowaniu przejdź na publiczne ubezpieczenie.", uk: "Після реєстрації перейдіть на державне страхування." },
    ],
    forgotten: [
      { en: "Coverage must start the day you enter the country", es: "La cobertura debe empezar el día de entrada", fr: "La couverture doit démarrer le jour d'entrée", de: "Deckung muss am Einreisetag beginnen", it: "La copertura inizia il giorno d'ingresso", pt: "Cobertura começa no dia de entrada", pl: "Ochrona musi działać od dnia wjazdu", uk: "Покриття має діяти з дня в'їзду" },
    ],
    cost: { en: "€30–€120 / month", es: "30–120 €/mes", fr: "30–120 €/mois", de: "30–120 €/Monat", it: "30–120 €/mese", pt: "30–120 €/mês", pl: "30–120 €/mies.", uk: "30–120 €/міс." },
  },
  housing: {
    where: { en: "Local town hall, Bürgeramt, or municipal office.", es: "Ayuntamiento, Bürgeramt u oficina municipal.", fr: "Mairie locale ou Bürgeramt.", de: "Bürgeramt oder Rathaus.", it: "Municipio o Bürgeramt.", pt: "Câmara municipal ou Bürgeramt.", pl: "Urząd miasta lub Bürgeramt.", uk: "Міська рада або Bürgeramt." },
    steps: [
      { en: "Sign a lease or get a landlord confirmation (Wohnungsgeberbestätigung).", es: "Firma alquiler u obtén confirmación del casero.", fr: "Signez le bail ou obtenez l'attestation du propriétaire.", de: "Mietvertrag oder Wohnungsgeberbestätigung besorgen.", it: "Firma il contratto o ottieni conferma del locatore.", pt: "Assine arrendamento ou obtenha confirmação do senhorio.", pl: "Podpisz umowę lub uzyskaj zaświadczenie wynajmującego.", uk: "Підпишіть оренду або отримайте підтвердження орендодавця." },
      { en: "Book an appointment at the registration office.", es: "Reserva cita en la oficina de registro.", fr: "Prenez rendez-vous au bureau d'enregistrement.", de: "Termin im Bürgeramt buchen.", it: "Prenota appuntamento all'ufficio di registrazione.", pt: "Marque no serviço de registo.", pl: "Zarezerwuj termin w urzędzie.", uk: "Запишіться в реєстраційний офіс." },
      { en: "Bring passport, lease, and the landlord confirmation.", es: "Lleva pasaporte, contrato y confirmación del casero.", fr: "Apportez passeport, bail et attestation.", de: "Pass, Mietvertrag und Wohnungsgeberbestätigung mitbringen.", it: "Porta passaporto, contratto e conferma.", pt: "Leve passaporte, contrato e confirmação.", pl: "Weź paszport, umowę, zaświadczenie.", uk: "Візьміть паспорт, договір та підтвердження." },
      { en: "Receive your registration certificate (Meldebescheinigung).", es: "Recibe el certificado de registro.", fr: "Recevez votre attestation de domicile.", de: "Meldebescheinigung erhalten.", it: "Ricevi il certificato di residenza.", pt: "Receba o certificado de registo.", pl: "Odbierz zaświadczenie o zameldowaniu.", uk: "Отримайте довідку про реєстрацію." },
    ],
    forgotten: [
      { en: "Most countries require registration within 14 days", es: "La mayoría exige registro en 14 días", fr: "Inscription requise sous 14 jours dans la plupart des pays", de: "Meist Anmeldung innerhalb 14 Tagen erforderlich", it: "Quasi sempre entro 14 giorni", pt: "Maioria exige registo em 14 dias", pl: "Większość wymaga rejestracji w 14 dni", uk: "Більшість країн вимагають реєстрацію за 14 днів" },
    ],
    cost: { en: "Free or €10–€30", es: "Gratis o 10–30 €", fr: "Gratuit ou 10–30 €", de: "Kostenlos oder 10–30 €", it: "Gratis o 10–30 €", pt: "Grátis ou 10–30 €", pl: "Bezpłatnie lub 10–30 €", uk: "Безкоштовно або 10–30 €" },
    tip: { en: "Without registration you can't get a tax ID, bank account, or contract.", es: "Sin registro no tienes ID fiscal, cuenta ni contrato.", fr: "Sans déclaration : pas de numéro fiscal, compte ou contrat.", de: "Ohne Anmeldung keine Steuer-ID, kein Konto, kein Vertrag.", it: "Senza registrazione niente codice fiscale, conto o contratto.", pt: "Sem registo não há NIF, conta ou contrato.", pl: "Bez meldunku nie ma NIP, konta ani umowy.", uk: "Без реєстрації немає податкового номера, рахунку, контракту." },
  },
  tax: {
    where: { en: "Issued automatically by the tax office after registration.", es: "Lo emite automáticamente Hacienda tras el registro.", fr: "Émis automatiquement par le fisc après déclaration.", de: "Wird automatisch vom Finanzamt nach Anmeldung zugeschickt.", it: "Emesso automaticamente dall'agenzia fiscale.", pt: "Emitido automaticamente pelas finanças após registo.", pl: "Wydawany automatycznie po zameldowaniu.", uk: "Видається автоматично податковою після реєстрації." },
    steps: [
      { en: "Complete your address registration first.", es: "Completa primero el registro de domicilio.", fr: "Faites d'abord votre déclaration de domicile.", de: "Zuerst Anmeldung erledigen.", it: "Prima la registrazione di residenza.", pt: "Faça primeiro o registo de morada.", pl: "Najpierw zamelduj się.", uk: "Спочатку зареєструйте адресу." },
      { en: "Wait 2–3 weeks for the tax ID letter by post.", es: "Espera 2–3 semanas la carta del ID fiscal.", fr: "Attendez 2–3 semaines la lettre du numéro fiscal.", de: "2–3 Wochen auf Brief mit Steuer-ID warten.", it: "Aspetta 2–3 settimane la lettera.", pt: "Aguarde 2–3 semanas pela carta.", pl: "Czekaj 2–3 tyg. na list.", uk: "Чекайте 2–3 тижні листа з номером." },
      { en: "Give the number to your employer or university.", es: "Da el número a tu empleador o universidad.", fr: "Communiquez le numéro à votre employeur ou université.", de: "Nummer an Arbeitgeber oder Uni geben.", it: "Comunica il numero al datore o all'università.", pt: "Dê o número ao empregador ou universidade.", pl: "Przekaż numer pracodawcy/uczelni.", uk: "Передайте номер роботодавцю чи університету." },
    ],
    forgotten: [
      { en: "Check if your home country has a double-tax treaty", es: "Comprueba si hay convenio de doble imposición", fr: "Vérifiez la convention de double imposition", de: "Doppelbesteuerungsabkommen prüfen", it: "Verifica convenzione doppia imposizione", pt: "Verifique convenção de dupla tributação", pl: "Sprawdź umowę o unikaniu podwójnego opodatkowania", uk: "Перевірте угоду про уникнення подвійного оподаткування" },
    ],
    cost: { en: "Free", es: "Gratis", fr: "Gratuit", de: "Kostenlos", it: "Gratis", pt: "Grátis", pl: "Bezpłatnie", uk: "Безкоштовно" },
  },
  bank: {
    where: { en: "A local bank branch or a digital bank (N26, Revolut, Wise).", es: "Banco local o banco digital (N26, Revolut, Wise).", fr: "Banque locale ou en ligne (N26, Revolut, Wise).", de: "Lokale Bank oder Online-Bank (N26, Revolut, Wise).", it: "Banca locale o digitale (N26, Revolut, Wise).", pt: "Banco local ou digital (N26, Revolut, Wise).", pl: "Bank lokalny lub cyfrowy (N26, Revolut, Wise).", uk: "Місцевий банк або цифровий (N26, Revolut, Wise)." },
    steps: [
      { en: "Pick a bank — digital banks open in minutes, traditional ones need an appointment.", es: "Elige banco — digital en minutos, tradicional con cita.", fr: "Choisissez : banque en ligne en minutes, banque classique avec RDV.", de: "Bank wählen — Online in Minuten, klassisch mit Termin.", it: "Scegli: digitale in minuti, tradizionale con appuntamento.", pt: "Escolha: digital em minutos, tradicional com marcação.", pl: "Wybierz: cyfrowy w minutach, tradycyjny z wizytą.", uk: "Оберіть: цифровий за хвилини, традиційний — з візитом." },
      { en: "Provide passport, address registration, and tax ID.", es: "Aporta pasaporte, registro de domicilio e ID fiscal.", fr: "Fournissez passeport, déclaration de domicile, numéro fiscal.", de: "Pass, Anmeldung, Steuer-ID vorlegen.", it: "Fornisci passaporto, residenza, codice fiscale.", pt: "Apresente passaporte, registo, NIF.", pl: "Pokaż paszport, meldunek, NIP.", uk: "Надайте паспорт, реєстрацію, податковий номер." },
      { en: "Wait for the card by post (5–10 days).", es: "Espera la tarjeta por correo (5–10 días).", fr: "Recevez la carte par courrier (5–10 jours).", de: "Karte per Post abwarten (5–10 Tage).", it: "Aspetta la carta per posta (5–10 giorni).", pt: "Aguarde o cartão (5–10 dias).", pl: "Poczekaj na kartę (5–10 dni).", uk: "Чекайте карту поштою (5–10 днів)." },
    ],
    forgotten: [
      { en: "Some landlords only accept transfers from local IBANs", es: "Algunos caseros solo aceptan IBAN local", fr: "Certains propriétaires n'acceptent que les IBAN locaux", de: "Manche Vermieter akzeptieren nur lokale IBANs", it: "Alcuni locatori vogliono solo IBAN locale", pt: "Alguns senhorios só aceitam IBAN local", pl: "Niektórzy wynajmujący chcą tylko lokalnego IBAN", uk: "Деякі орендодавці беруть лише місцевий IBAN" },
    ],
    cost: { en: "Free–€10/month", es: "Gratis–10 €/mes", fr: "Gratuit–10 €/mois", de: "Kostenlos–10 €/Monat", it: "Gratis–10 €/mese", pt: "Grátis–10 €/mês", pl: "Bezpłatnie–10 €/mies.", uk: "Безкоштовно–10 €/міс." },
  },
  marriage: {
    where: { en: "Civil registry of the country that issued the document.", es: "Registro civil del país emisor del documento.", fr: "État civil du pays émetteur du document.", de: "Standesamt des ausstellenden Landes.", it: "Anagrafe del paese emittente.", pt: "Conservatória do país emissor.", pl: "Urząd stanu cywilnego kraju wydania.", uk: "Орган РАЦСу країни, що видала документ." },
    steps: [
      { en: "Order a recent original (issued in the last 6 months).", es: "Pide original reciente (últimos 6 meses).", fr: "Commandez un original récent (moins de 6 mois).", de: "Aktuelles Original bestellen (max. 6 Monate alt).", it: "Ordina originale recente (max 6 mesi).", pt: "Peça original recente (últimos 6 meses).", pl: "Zamów świeży oryginał (max 6 mies.).", uk: "Замовте свіжий оригінал (до 6 міс.)." },
      { en: "Get an apostille from the foreign affairs ministry.", es: "Obtén apostilla del ministerio de exteriores.", fr: "Apostille au ministère des affaires étrangères.", de: "Apostille beim Auswärtigen Amt.", it: "Apostille dal ministero degli esteri.", pt: "Apostila no ministério dos negócios estrangeiros.", pl: "Apostille w MSZ.", uk: "Апостиль у МЗС." },
      { en: "Order a certified translation into the destination's language.", es: "Pide traducción jurada al idioma del destino.", fr: "Traduction assermentée vers la langue du pays.", de: "Beglaubigte Übersetzung in Zielsprache.", it: "Traduzione giurata in lingua destinazione.", pt: "Tradução certificada na língua do destino.", pl: "Tłumaczenie przysięgłe na język docelowy.", uk: "Завірений переклад мовою країни." },
    ],
    forgotten: [
      { en: "Some countries require legalization, not apostille", es: "Algunos países piden legalización en vez de apostilla", fr: "Certains pays exigent une légalisation au lieu d'apostille", de: "Manche Länder verlangen Legalisation statt Apostille", it: "Alcuni paesi vogliono legalizzazione, non apostille", pt: "Alguns países exigem legalização", pl: "Niektóre kraje wymagają legalizacji, nie apostille", uk: "Деякі країни вимагають легалізацію, не апостиль" },
    ],
    cost: { en: "€20–€80 per document", es: "20–80 € por documento", fr: "20–80 € par document", de: "20–80 € pro Dokument", it: "20–80 € a documento", pt: "20–80 € por documento", pl: "20–80 € za dokument", uk: "20–80 € за документ" },
  },
  familyvisa: {
    where: { en: "Destination's embassy in your home country.", es: "Embajada del destino en tu país.", fr: "Ambassade du pays de destination.", de: "Botschaft des Ziellandes in Ihrem Land.", it: "Ambasciata del paese di destinazione.", pt: "Embaixada do destino no seu país.", pl: "Ambasada kraju docelowego.", uk: "Посольство країни призначення." },
    steps: [
      { en: "Sponsor proves income, housing size, and insurance coverage.", es: "El patrocinador acredita renta, vivienda y seguro.", fr: "Le garant prouve revenus, logement, assurance.", de: "Sponsor weist Einkommen, Wohnraum, Versicherung nach.", it: "Lo sponsor prova reddito, alloggio, assicurazione.", pt: "Patrocinador prova rendimento, casa, seguro.", pl: "Sponsor pokazuje dochód, mieszkanie, ubezpieczenie.", uk: "Спонсор підтверджує дохід, житло, страхування." },
      { en: "Applicant gathers passport, marriage/birth certificates, photos.", es: "Solicitante: pasaporte, certificados, fotos.", fr: "Demandeur : passeport, actes, photos.", de: "Antragsteller: Pass, Urkunden, Fotos.", it: "Richiedente: passaporto, atti, foto.", pt: "Requerente: passaporte, certidões, fotos.", pl: "Wnioskodawca: paszport, akty, zdjęcia.", uk: "Заявник: паспорт, свідоцтва, фото." },
      { en: "Book the embassy appointment and submit biometrics.", es: "Reserva cita y entrega biometría.", fr: "Prenez RDV et donnez vos biométries.", de: "Termin und Biometrie.", it: "Prenota appuntamento e biometria.", pt: "Marque e biometria.", pl: "Termin i biometria.", uk: "Запишіться та здайте біометрію." },
      { en: "Wait 2–6 months for processing.", es: "Espera 2–6 meses de tramitación.", fr: "Comptez 2–6 mois de traitement.", de: "Bearbeitung 2–6 Monate.", it: "Attesa 2–6 mesi.", pt: "Espera 2–6 meses.", pl: "Czas oczekiwania 2–6 mies.", uk: "Очікування 2–6 міс." },
    ],
    forgotten: [
      { en: "Language test (A1/A2) is required in some countries", es: "Algunos países piden examen de idioma (A1/A2)", fr: "Test de langue (A1/A2) requis dans certains pays", de: "Sprachtest (A1/A2) in einigen Ländern Pflicht", it: "Esame di lingua (A1/A2) in alcuni paesi", pt: "Teste de língua (A1/A2) em alguns países", pl: "Egzamin językowy (A1/A2) w niektórych krajach", uk: "У деяких країнах потрібен мовний іспит (A1/A2)" },
    ],
    cost: { en: "€75–€200", es: "75–200 €", fr: "75–200 €", de: "75–200 €", it: "75–200 €", pt: "75–200 €", pl: "75–200 €", uk: "75–200 €" },
  },
  return: {
    where: { en: "Any airline website or booking platform.", es: "Cualquier web de aerolínea o plataforma.", fr: "Site d'une compagnie ou plateforme de réservation.", de: "Website einer Airline oder Buchungsplattform.", it: "Sito di compagnia aerea o piattaforma.", pt: "Site de companhia ou plataforma.", pl: "Strona linii lotniczej lub platforma rezerwacji.", uk: "Сайт авіакомпанії або платформа бронювання." },
    steps: [
      { en: "Book a refundable or onward ticket within the allowed stay.", es: "Reserva billete reembolsable o de continuación.", fr: "Réservez un billet remboursable ou de continuation.", de: "Erstattbares oder Weiterreise-Ticket buchen.", it: "Prenota biglietto rimborsabile o di prosecuzione.", pt: "Reserve bilhete reembolsável ou de seguimento.", pl: "Zarezerwuj bilet zwrotny lub kontynuacyjny.", uk: "Замовте поворотний або продовжуючий квиток." },
      { en: "Print or save the e-ticket and full itinerary.", es: "Imprime o guarda el e-ticket y el itinerario.", fr: "Imprimez ou enregistrez l'e-billet et l'itinéraire.", de: "E-Ticket und Reiseplan drucken oder speichern.", it: "Stampa o salva e-ticket e itinerario.", pt: "Imprima ou guarde o e-ticket e itinerário.", pl: "Wydrukuj lub zapisz e-bilet i plan podróży.", uk: "Роздрукуйте або збережіть квиток та маршрут." },
      { en: "Carry it at the border — agents may ask.", es: "Llévalo en la frontera — pueden pedirlo.", fr: "Ayez-le à la frontière — on peut le demander.", de: "An der Grenze mitführen — kann verlangt werden.", it: "Tienilo alla frontiera — può essere richiesto.", pt: "Leve na fronteira — podem pedir.", pl: "Miej na granicy — mogą poprosić.", uk: "Майте на кордоні — можуть запитати." },
    ],
    forgotten: [
      { en: "Onward ticket services exist if you don't want to commit", es: "Hay servicios de billete onward si no quieres comprometerte", fr: "Des services de billet \"onward\" existent", de: "Es gibt Onward-Ticket-Services", it: "Esistono servizi di onward ticket", pt: "Existem serviços de onward ticket", pl: "Istnieją usługi onward ticket", uk: "Існують сервіси onward ticket" },
    ],
    cost: { en: "Varies", es: "Variable", fr: "Variable", de: "Variabel", it: "Variabile", pt: "Variável", pl: "Zmienny", uk: "Залежить" },
  },
  id: {
    where: { en: "Bring whatever official document you have.", es: "Trae cualquier documento oficial que tengas.", fr: "Apportez tout document officiel disponible.", de: "Bringen Sie jedes verfügbare offizielle Dokument mit.", it: "Porta qualsiasi documento ufficiale disponibile.", pt: "Traga qualquer documento oficial.", pl: "Przynieś dowolny oficjalny dokument.", uk: "Принесіть будь-який офіційний документ." },
    steps: [
      { en: "Gather any ID — passport, national ID, birth certificate, driver's licence.", es: "Reúne cualquier ID — pasaporte, DNI, partida, permiso de conducir.", fr: "Rassemblez toute pièce — passeport, CNI, acte, permis.", de: "Beliebigen Ausweis sammeln — Pass, ID, Urkunde, Führerschein.", it: "Raccogli qualsiasi ID — passaporto, carta, atto, patente.", pt: "Junte qualquer ID — passaporte, BI, certidão, carta de condução.", pl: "Zbierz jakikolwiek dokument — paszport, dowód, akt, prawo jazdy.", uk: "Зберіть будь-який документ — паспорт, ID, свідоцтво, права." },
      { en: "Keep originals safe; carry copies day-to-day.", es: "Guarda originales seguros; lleva copias a diario.", fr: "Conservez les originaux en sécurité ; portez des copies.", de: "Originale sicher verwahren; täglich Kopien dabei.", it: "Conserva gli originali; porta copie ogni giorno.", pt: "Guarde originais; ande com cópias.", pl: "Trzymaj oryginały bezpiecznie; noś kopie.", uk: "Тримайте оригінали в безпеці; носіть копії." },
      { en: "If you have nothing, authorities will still register you.", es: "Si no tienes nada, las autoridades igual te registrarán.", fr: "Sans rien, les autorités vous enregistreront quand même.", de: "Auch ohne Dokumente werden Sie registriert.", it: "Anche senza nulla, le autorità ti registrano.", pt: "Mesmo sem nada, as autoridades registam-no.", pl: "Nawet bez nic władze cię zarejestrują.", uk: "Навіть без нічого вас зареєструють." },
    ],
    forgotten: [
      { en: "Photos of documents in cloud can substitute when originals are lost", es: "Las fotos en la nube sirven si pierdes los originales", fr: "Les photos cloud peuvent suppléer un original perdu", de: "Cloud-Fotos können verlorene Originale ersetzen", it: "Le foto in cloud sostituiscono gli originali persi", pt: "Fotos na nuvem substituem originais perdidos", pl: "Zdjęcia w chmurze zastąpią utracony oryginał", uk: "Хмарні фото можуть замінити втрачений оригінал" },
    ],
    cost: { en: "Free", es: "Gratis", fr: "Gratuit", de: "Kostenlos", it: "Gratis", pt: "Grátis", pl: "Bezpłatnie", uk: "Безкоштовно" },
  },
  asylum: {
    where: { en: "Border police or first government office you reach.", es: "Policía fronteriza o primera oficina oficial.", fr: "Police aux frontières ou premier service officiel.", de: "Grenzpolizei oder erste Behörde.", it: "Polizia di frontiera o primo ufficio ufficiale.", pt: "Polícia de fronteira ou primeiro serviço oficial.", pl: "Straż graniczna lub pierwszy urząd.", uk: "Прикордонна служба чи перший держорган." },
    steps: [
      { en: "State clearly that you are seeking asylum.", es: "Indica claramente que solicitas asilo.", fr: "Déclarez clairement demander l'asile.", de: "Klar erklären, dass Sie Asyl beantragen.", it: "Dichiara chiaramente di chiedere asilo.", pt: "Diga claramente que pede asilo.", pl: "Jasno powiedz, że ubiegasz się o azyl.", uk: "Чітко заявіть, що шукаєте притулку." },
      { en: "You'll be fingerprinted and registered.", es: "Te tomarán huellas y te registrarán.", fr: "Vos empreintes seront prises et vous serez enregistré.", de: "Fingerabdrücke und Registrierung.", it: "Verrai schedato e registrato.", pt: "Serão tiradas impressões e registo.", pl: "Odciski palców i rejestracja.", uk: "Знімуть відбитки та зареєструють." },
      { en: "Receive a temporary protection certificate while your case is reviewed.", es: "Recibes certificado de protección temporal mientras se examina.", fr: "Recevez une attestation de protection temporaire.", de: "Bescheinigung über vorübergehenden Schutz erhalten.", it: "Ricevi certificato di protezione temporanea.", pt: "Receba certificado de proteção temporária.", pl: "Otrzymasz zaświadczenie ochrony tymczasowej.", uk: "Отримаєте посвідчення тимчасового захисту на час розгляду." },
      { en: "You can request free legal aid — UNHCR and local NGOs help.", es: "Puedes pedir asistencia legal gratuita — ACNUR y ONG.", fr: "Vous pouvez demander une aide juridique gratuite — HCR et ONG.", de: "Kostenlose Rechtshilfe verfügbar — UNHCR und NGOs.", it: "Puoi chiedere assistenza legale gratuita — UNHCR e ONG.", pt: "Pode pedir apoio jurídico gratuito — ACNUR e ONGs.", pl: "Możesz prosić o darmową pomoc prawną — UNHCR i NGO.", uk: "Можна просити безкоштовну юр. допомогу — УВКБ ООН та НУО." },
    ],
    forgotten: [
      { en: "You have the right to an interpreter at every step", es: "Tienes derecho a intérprete en cada paso", fr: "Vous avez droit à un interprète à chaque étape", de: "Sie haben Anspruch auf einen Dolmetscher", it: "Hai diritto a un interprete in ogni fase", pt: "Tem direito a intérprete em cada etapa", pl: "Masz prawo do tłumacza na każdym etapie", uk: "Маєте право на перекладача на кожному етапі" },
    ],
    cost: { en: "Free", es: "Gratis", fr: "Gratuit", de: "Kostenlos", it: "Gratis", pt: "Grátis", pl: "Bezpłatnie", uk: "Безкоштовно" },
  },
  register: {
    where: { en: "Local immigration or reception office.", es: "Oficina local de inmigración o acogida.", fr: "Bureau local d'immigration ou d'accueil.", de: "Lokales Migrations- oder Aufnahmeamt.", it: "Ufficio locale di immigrazione o accoglienza.", pt: "Serviço local de imigração ou acolhimento.", pl: "Lokalny urząd ds. cudzoziemców.", uk: "Місцевий міграційний чи прийомний офіс." },
    steps: [
      { en: "Present yourself within the legal window.", es: "Preséntate dentro del plazo legal.", fr: "Présentez-vous dans le délai légal.", de: "Innerhalb der gesetzlichen Frist erscheinen.", it: "Presentati entro il termine legale.", pt: "Apresente-se no prazo legal.", pl: "Zgłoś się w wymaganym terminie.", uk: "З'явіться в законний термін." },
      { en: "Provide biometrics and a brief statement.", es: "Da biometría y declaración breve.", fr: "Fournissez biométries et déclaration brève.", de: "Biometrie und kurze Aussage.", it: "Fornisci biometria e breve dichiarazione.", pt: "Dê biometria e declaração breve.", pl: "Biometria i krótkie oświadczenie.", uk: "Здайте біометрію та коротку заяву." },
      { en: "Receive your protection certificate and case number.", es: "Recibe certificado y número de caso.", fr: "Recevez l'attestation et un numéro de dossier.", de: "Schutzbescheinigung und Aktenzeichen erhalten.", it: "Ricevi certificato e numero pratica.", pt: "Receba certificado e número de processo.", pl: "Odbierz zaświadczenie i numer sprawy.", uk: "Отримайте посвідчення та номер справи." },
    ],
    forgotten: [
      { en: "Keep the case number — it unlocks healthcare and housing", es: "Guarda el número — desbloquea salud y vivienda", fr: "Conservez le numéro — il ouvre santé et logement", de: "Aktenzeichen aufbewahren — öffnet Gesundheit und Wohnung", it: "Conserva il numero — sblocca sanità e alloggio", pt: "Guarde o número — abre saúde e alojamento", pl: "Zachowaj numer — daje dostęp do zdrowia i mieszkania", uk: "Зберігайте номер — відкриває охорону здоров'я та житло" },
    ],
    cost: { en: "Free", es: "Gratis", fr: "Gratuit", de: "Kostenlos", it: "Gratis", pt: "Grátis", pl: "Bezpłatnie", uk: "Безкоштовно" },
  },
  health: {
    where: { en: "Designated reception centers or partner clinics.", es: "Centros de acogida o clínicas asociadas.", fr: "Centres d'accueil ou cliniques partenaires.", de: "Aufnahmezentren oder Partnerkliniken.", it: "Centri di accoglienza o cliniche partner.", pt: "Centros de acolhimento ou clínicas parceiras.", pl: "Centra recepcyjne lub kliniki partnerskie.", uk: "Прийомні центри або клініки-партнери." },
    steps: [
      { en: "Attend the basic health screening (free).", es: "Asiste al examen médico básico (gratis).", fr: "Passez le bilan de santé de base (gratuit).", de: "Basis-Gesundheitsuntersuchung (kostenlos).", it: "Visita medica base (gratis).", pt: "Faça a triagem básica (grátis).", pl: "Podstawowe badania (bezpłatne).", uk: "Базовий медогляд (безкоштовно)." },
      { en: "Receive vaccinations as needed.", es: "Recibe vacunas si es necesario.", fr: "Recevez les vaccins nécessaires.", de: "Bei Bedarf Impfungen.", it: "Vaccinazioni se necessarie.", pt: "Vacinas se necessárias.", pl: "Szczepienia, jeśli trzeba.", uk: "Вакцинації за потреби." },
      { en: "Get your health card linked to your case number.", es: "Vincula tu tarjeta sanitaria al número de caso.", fr: "Liez votre carte santé à votre numéro de dossier.", de: "Gesundheitskarte mit Aktenzeichen verknüpfen.", it: "Tessera sanitaria collegata al numero pratica.", pt: "Cartão de saúde ligado ao número.", pl: "Karta zdrowia powiązana z numerem sprawy.", uk: "Прив'яжіть медкарту до номера справи." },
    ],
    forgotten: [
      { en: "Bring any medical records you have", es: "Lleva cualquier historial médico", fr: "Apportez vos antécédents médicaux", de: "Vorhandene Krankenakten mitbringen", it: "Porta cartelle cliniche disponibili", pt: "Leve historial médico", pl: "Przynieś dokumentację medyczną", uk: "Принесіть наявну медичну документацію" },
    ],
    cost: { en: "Free", es: "Gratis", fr: "Gratuit", de: "Kostenlos", it: "Gratis", pt: "Grátis", pl: "Bezpłatnie", uk: "Безкоштовно" },
  },
});

// ------- Public helpers -------
export function useLocalized() {
  const [lang] = useLang();
  return useMemo(() => ({
    lang,
    reasons: REASONS_L.map((r) => ({ id: r.id, emoji: r.emoji, label: pick(r.label, lang), description: pick(r.description, lang) })),
    category: (c: string) => pick(CATEGORIES_L[c], lang) || c,
    item: (id: string) => {
      const it = ITEMS_L[id];
      return it ? { title: pick(it.title, lang), description: pick(it.description, lang) } : null;
    },
    glossary: GLOSSARY_L.map((g) => ({ term: pick(g.term, lang), meaning: pick(g.meaning, lang) })),
    howto: (id: string) => {
      const h = HOWTO_L[id];
      if (!h) return null;
      return {
        where: pick(h.where, lang),
        steps: pickArr(h.steps, lang),
        forgotten: pickArr(h.forgotten, lang),
        cost: pick(h.cost, lang),
        tip: h.tip ? pick(h.tip, lang) : undefined,
      };
    },
    countryName: (code: string) => {
      try { return new Intl.DisplayNames([lang], { type: "region" }).of(code) ?? code; } catch { return code; }
    },
  }), [lang]);
}
