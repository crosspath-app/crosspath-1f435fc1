import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Globe2, Plane } from "lucide-react";
import { AppShell } from "@/components/borderless/AppShell";
import { COUNTRIES, REASONS } from "@/lib/borderless-data";
import { saveTrip, loadTrip } from "@/lib/trip-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Borderless — Move abroad without the bureaucracy" },
      { name: "description", content: "Tell us where you're going. We'll generate the documents, deadlines and steps." },
      { property: "og:title", content: "Borderless — Move abroad without the bureaucracy" },
      { property: "og:description", content: "Tell us where you're going. We'll generate the documents, deadlines and steps." },
      { property: "og:url", content: "https://crosspath.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const existing = typeof window !== "undefined" ? loadTrip() : null;
  const [from, setFrom] = useState(existing?.from ?? "PL");
  const [to, setTo] = useState(existing?.to ?? "DE");
  const [reason, setReason] = useState(existing?.reason ?? "study");

  function handleGenerate() {
    saveTrip(from, to, reason);
    navigate({ to: "/checklist" });
  }

  const fromCountry = COUNTRIES.find((c) => c.code === from)!;
  const toCountry = COUNTRIES.find((c) => c.code === to)!;

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative px-6 pt-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Globe2 className="h-4 w-4 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">Borderless</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">v0.1</span>
        </div>

        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary">Boarding pass</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-tight text-foreground">
            Move anywhere.<br />
            <span className="text-muted-foreground">Skip the paperwork maze.</span>
          </h1>
        </div>

        {/* Boarding-pass card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-border" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-stretch">
            <div className="flex-1 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">From</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{fromCountry.code}</p>
              <p className="text-xs text-muted-foreground">{fromCountry.name}</p>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <div className="h-px w-8 bg-border" />
              <Plane className="my-2 h-5 w-5 rotate-90 text-primary" strokeWidth={1.6} />
              <div className="h-px w-8 bg-border" />
            </div>
            <div className="flex-1 p-5 text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">To</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{toCountry.code}</p>
              <p className="text-xs text-muted-foreground">{toCountry.name}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-border px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Purpose</span>
            <span className="text-sm text-foreground">{REASONS.find((r) => r.id === reason)?.label}</span>
          </div>
        </div>
      </section>

      {/* Selectors */}
      <section className="mt-10 px-6 space-y-6">
        <Selector label="From" value={from} onChange={setFrom} />
        <Selector label="To" value={to} onChange={setTo} />

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Reason</p>
          <div className="grid grid-cols-2 gap-2">
            {REASONS.map((r) => {
              const active = reason === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setReason(r.id)}
                  className="flex items-start gap-3 rounded-2xl border p-3 text-left transition-all"
                  style={{
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                    background: active ? "oklch(0.74 0.13 235 / 0.08)" : "var(--color-card)",
                  }}
                >
                  <span className="text-xl leading-none">{r.emoji}</span>
                  <span>
                    <span className="block text-sm font-medium text-foreground">{r.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{r.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="group mt-2 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold tracking-tight text-primary-foreground transition-transform active:scale-[0.98]"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        >
          <span>Generate my move plan</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-center text-[11px] text-muted-foreground">
          Personalized in seconds · Works offline · No account needed
        </p>
      </section>
    </AppShell>
  );
}

function Selector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `selector-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <div className="relative rounded-2xl border border-border bg-card">
        <select
          id={id}
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent px-4 py-4 pr-12 text-base font-medium text-foreground outline-none"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code} className="bg-card text-foreground">
              {c.flag}  {c.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">▾</span>
      </div>
    </div>
  );
}
