import { createFileRoute } from "@tanstack/react-router";
import { Phone, FileWarning, Globe2, Building2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useTrip } from "@/lib/trip-store";
import { COUNTRIES } from "@/lib/borderless-data";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Emergency help — Crosspath" },
      { name: "description", content: "Embassy contacts, lost passport steps, emergency numbers and official portals." },
      { property: "og:title", content: "Emergency help — Crosspath" },
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

const STEPS = [
  "Stay calm. Note the time and place where you last had your passport.",
  "Report the loss to the local police and ask for a written report.",
  "Contact your country's embassy or consulate to start an emergency travel document.",
  "If you have travel insurance, notify them — many cover replacement fees.",
];

function HelpPage() {
  const [trip] = useTrip();
  const fromCountry = COUNTRIES.find((c) => c.code === trip?.from);
  const toCountry = COUNTRIES.find((c) => c.code === trip?.to);

  const locatorQuery = fromCountry && toCountry
    ? `embassy of ${fromCountry.name} in ${toCountry.name}`
    : "find my embassy";
  const locatorUrl = `https://www.google.com/maps/search/${encodeURIComponent(locatorQuery)}`;
  const locatorNote = fromCountry && toCountry
    ? `Nearest ${fromCountry.name} consulate in ${toCountry.name}`
    : "Set your trip on the home screen to personalize";

  const QUICK: Array<{
    icon: typeof Phone;
    title: string;
    value: string;
    note: string;
    href: string;
    external?: boolean;
  }> = [
    { icon: Phone, title: "Emergency", value: "112", note: "EU-wide emergency line", href: "tel:112" },
    { icon: FileWarning, title: "Lost passport", value: "Step-by-step", note: "Report, file, request emergency travel doc", href: "#lost-passport" },
    { icon: Building2, title: "Find embassy", value: "Locator", note: locatorNote, href: locatorUrl, external: true },
    { icon: Globe2, title: "EU Immigration Portal", value: "immigration.europa.eu", note: "Official guidance", href: "https://immigration-portal.ec.europa.eu/", external: true },
  ];

  return (
    <AppShell>
      <PageHeader eyebrow="Help" title="Emergency help and resources" subtitle="Quick contacts and clear steps for the moments that matter." />

      <h2 className="px-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Quick contacts</h2>
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
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{q.title}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{q.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{q.note}</p>
            </a>
          );
        })}
      </div>

      <div id="lost-passport" className="mt-8 px-6 scroll-mt-6">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Lost passport — what to do</h2>
        <ol className="mt-3 space-y-2">
          {STEPS.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs text-primary-foreground font-mono"
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
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">Tip</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Keep a digital copy of your passport, visa, and insurance card in your phone — Crosspath will soon let you store them encrypted.
          </p>
        </div>
      </div>
    </AppShell>
  );
}