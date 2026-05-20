import { createFileRoute } from "@tanstack/react-router";
import { Phone, FileWarning, Globe2, Building2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useTrip } from "@/lib/trip-store";
import { COUNTRIES } from "@/lib/borderless-data";
import { useT } from "@/lib/i18n";
import { useLocalizedExtras } from "@/lib/borderless-i18n-extras";
import { useLocalized } from "@/lib/borderless-i18n";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Emergency help — Borderless" },
      { name: "description", content: "Embassy contacts, lost passport steps, emergency numbers and official portals." },
      { property: "og:title", content: "Emergency help — Borderless" },
      { property: "og:description", content: "Embassy contacts, lost passport steps, emergency numbers and official portals." },
      { property: "og:url", content: "https://crosspath.lovable.app/help" },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/help" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "What to do if you lose your passport abroad",
          step: [
            { "@type": "HowToStep", name: "Stay calm", text: "Stay calm. Note the time and place where you last had your passport." },
            { "@type": "HowToStep", name: "Report to police", text: "Report the loss to the local police and ask for a written report." },
            { "@type": "HowToStep", name: "Contact embassy", text: "Contact your country's embassy or consulate to start an emergency travel document." },
            { "@type": "HowToStep", name: "Notify insurance", text: "If you have travel insurance, notify them — many cover replacement fees." },
          ],
        }),
      },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const t = useT();
  const { help } = useLocalizedExtras();
  const { countryName } = useLocalized();
  const [trip] = useTrip();
  const fromCountry = COUNTRIES.find((c) => c.code === trip?.from);
  const toCountry = COUNTRIES.find((c) => c.code === trip?.to);

  const fromName = fromCountry ? countryName(fromCountry.code) : "";
  const toName = toCountry ? countryName(toCountry.code) : "";
  const locatorQuery = fromCountry && toCountry
    ? `embassy of ${fromCountry.name} in ${toCountry.name}`
    : "find my embassy";
  const locatorUrl = `https://www.google.com/maps/search/${encodeURIComponent(locatorQuery)}`;
  const locatorNote = fromCountry && toCountry
    ? help.embassyTemplate.replace("{from}", fromName).replace("{to}", toName)
    : help.embassyFallback;

  const QUICK: Array<{
    icon: typeof Phone;
    title: string;
    value: string;
    note: string;
    href: string;
    external?: boolean;
  }> = [
    { icon: Phone, title: help.emergencyTitle, value: "112", note: help.emergencyNote, href: "tel:112" },
    { icon: FileWarning, title: help.lostTitle, value: help.lostValue, note: help.lostNote, href: "#lost-passport" },
    { icon: Building2, title: help.embassyTitle, value: help.embassyValue, note: locatorNote, href: locatorUrl, external: true },
    { icon: Globe2, title: help.euTitle, value: "immigration.europa.eu", note: help.euNote, href: "https://immigration-portal.ec.europa.eu/", external: true },
  ];

  return (
    <AppShell>
      <PageHeader eyebrow={t("nav.help")} title={t("help.title")} subtitle={help.subtitle} />

      <h2 className="px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{help.quickContacts}</h2>
      <div className="mt-3 px-6 grid grid-cols-2 gap-3">
        {QUICK.map((q) => {
          const Icon = q.icon;
          return (
            <a
              key={q.title}
              href={q.href}
              target={q.external ? "_blank" : undefined}
              rel={q.external ? "noopener noreferrer" : undefined}
              className="block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary focus:border-primary focus:outline-none"
            >
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
              <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{q.title}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{q.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{q.note}</p>
            </a>
          );
        })}
      </div>

      <div id="lost-passport" className="mt-8 px-6 scroll-mt-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{help.lostHeader}</h2>
        <ol className="mt-3 space-y-2">
          {help.steps.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}>
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-foreground">{s}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 px-6">
        <div className="rounded-2xl border border-border p-5" style={{ background: "var(--gradient-card)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{help.tipLabel}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{help.tipText}</p>
        </div>
      </div>
    </AppShell>
  );
}