import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Coins } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { COST_PRESETS } from "@/lib/borderless-extras";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/cost")({
  head: () => ({
    meta: [
      { title: "Relocation cost calculator — Borderless" },
      { name: "description", content: "Estimate visa fees, housing deposit, insurance, transport, translations and emergency savings." },
      { property: "og:title", content: "Relocation cost calculator — Borderless" },
      { property: "og:description", content: "Estimate visa fees, housing deposit, insurance, transport, translations and emergency savings." },
      { property: "og:url", content: "https://crosspath.lovable.app/cost" },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/cost" }],
  }),
  component: CostPage,
});

function CostPage() {
  const t = useT();
  const [preset, setPreset] = useState(COST_PRESETS[0].id);
  const base = COST_PRESETS.find((p) => p.id === preset) ?? COST_PRESETS[0];

  const [visa, setVisa] = useState(base.visa);
  const [flight, setFlight] = useState(base.flight);
  const [deposit, setDeposit] = useState(base.housingDeposit);
  const [rent, setRent] = useState(base.monthlyRent);
  const [insurance, setInsurance] = useState(base.insurance);
  const [translations, setTranslations] = useState(base.translations);
  const [transport, setTransport] = useState(base.transport);
  const [savings, setSavings] = useState(base.initialSavings);

  function applyPreset(id: string) {
    const p = COST_PRESETS.find((x) => x.id === id);
    if (!p) return;
    setPreset(id);
    setVisa(p.visa); setFlight(p.flight); setDeposit(p.housingDeposit);
    setRent(p.monthlyRent); setInsurance(p.insurance); setTranslations(p.translations);
    setTransport(p.transport); setSavings(p.initialSavings);
  }

  const subtotal = useMemo(
    () => visa + flight + deposit + rent + insurance + translations + transport + savings,
    [visa, flight, deposit, rent, insurance, translations, transport, savings],
  );
  const buffer = Math.round(subtotal * 0.15);
  const total = subtotal + buffer;

  const rows: { label: string; value: number; set: (n: number) => void; max: number }[] = [
    { label: "Visa fees", value: visa, set: setVisa, max: 600 },
    { label: "Flight / transport to country", value: flight, set: setFlight, max: 2000 },
    { label: "Housing deposit", value: deposit, set: setDeposit, max: 5000 },
    { label: "First month rent", value: rent, set: setRent, max: 3000 },
    { label: "Insurance (1 month)", value: insurance, set: setInsurance, max: 400 },
    { label: "Translations & apostilles", value: translations, set: setTranslations, max: 400 },
    { label: "Local transport setup", value: transport, set: setTransport, max: 300 },
    { label: "Emergency savings to land with", value: savings, set: setSavings, max: 6000 },
  ];

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/tools" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <ArrowLeft className="h-3 w-3" /> {t("nav.tools")}
        </Link>
      </div>
      <PageHeader eyebrow={t("nav.tools")} title={t("cost.title")} subtitle={t("cost.subtitle")} />

      <div className="px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("cost.preset")}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {COST_PRESETS.map((p) => {
            const active = p.id === preset;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                  background: active ? "oklch(0.74 0.13 235 / 0.12)" : "var(--color-card)",
                  color: active ? "var(--color-primary)" : "var(--color-foreground)",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-6 mt-6 overflow-hidden rounded-2xl border border-border p-5" style={{ background: "var(--gradient-primary)" }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "oklch(0.14 0.03 260 / 0.7)" }}>{t("cost.total")}</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-primary-foreground">€{total.toLocaleString()}</p>
        <p className="mt-1 text-[11px]" style={{ color: "oklch(0.14 0.03 260 / 0.7)" }}>
          €{subtotal.toLocaleString()} + €{buffer.toLocaleString()} buffer · {t("cost.buffer")}
        </p>
      </div>

      <ul className="mt-6 space-y-4 px-6">
        {rows.map((r) => (
          <li key={r.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium text-foreground">{r.label}</p>
              <p className="font-mono text-sm text-primary">€{r.value.toLocaleString()}</p>
            </div>
            <input
              type="range"
              min={0}
              max={r.max}
              step={r.max > 500 ? 50 : 10}
              value={r.value}
              onChange={(e) => r.set(Number(e.target.value))}
              aria-label={r.label}
              className="mt-3 w-full accent-[var(--color-primary)]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>€0</span>
              <span>€{r.max.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-6 mt-6 flex items-start gap-2 rounded-2xl border border-border bg-card p-4">
        <Coins className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Estimates in EUR. Real costs vary by city and personal choices — use this as a starting point, not a quote.
        </p>
      </div>
    </AppShell>
  );
}