import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AppShell } from "@/components/borderless/AppShell";
import { COUNTRIES } from "@/lib/borderless-data";
import { useLocalized } from "@/lib/borderless-i18n";
import { saveTrip } from "@/lib/trip-store";
import { ArrowRight, Loader2, Plane } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Crosspath.move" },
      { name: "description", content: "Tell us about your move so we can build your first checklist." },
    ],
  }),
  component: OnboardingPage,
});

type Step = 0 | 1 | 2;

function OnboardingPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const L = useLocalized();
  const [step, setStep] = useState<Step>(0);
  const [nationality, setNationality] = useState("PL");
  const [destination, setDestination] = useState("DE");
  const [reason, setReason] = useState("study");
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);

  // Redirect anonymous users to sign-in
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  // If already onboarded, jump straight to checklist
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("onboarded_at, nationality, destination_country, move_reason")
        .eq("id", user.id)
        .maybeSingle();
      if (data?.onboarded_at) {
        navigate({ to: "/checklist" });
        return;
      }
      if (data?.nationality) setNationality(data.nationality);
      if (data?.destination_country) setDestination(data.destination_country);
      if (data?.move_reason) setReason(data.move_reason);
      setChecking(false);
    })();
  }, [user, navigate]);

  async function finish() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      nationality,
      destination_country: destination,
      move_reason: reason,
      home_country: nationality,
      onboarded_at: new Date().toISOString(),
    });
    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }
    saveTrip(nationality, destination, reason);
    toast.success("Your move plan is ready ✈️");
    navigate({ to: "/checklist" });
  }

  if (loading || checking || !user) {
    return (
      <AppShell>
        <div className="flex h-full items-center justify-center pt-24">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  const fromCountry = COUNTRIES.find((c) => c.code === nationality);
  const toCountry = COUNTRIES.find((c) => c.code === destination);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 px-6 pt-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Welcome aboard</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Let's plan your first move
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Three quick questions — we'll build a checklist tailored to your nationality, destination and reason.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full"
              style={{ background: i <= step ? "var(--color-primary)" : "var(--color-border)" }}
            />
          ))}
        </div>

        {step === 0 && (
          <StepWrap
            title="What's your nationality?"
            hint="Used to determine visa rules and reciprocity."
          >
            <CountrySelect value={nationality} onChange={setNationality} />
          </StepWrap>
        )}

        {step === 1 && (
          <StepWrap
            title="Where are you moving to?"
            hint="We'll fetch the local requirements for this country."
          >
            <CountrySelect value={destination} onChange={setDestination} />
            {fromCountry && toCountry && (
              <div className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground">
                <span>{fromCountry.flag} {fromCountry.code}</span>
                <Plane className="h-4 w-4 rotate-90 text-primary" strokeWidth={1.6} />
                <span>{toCountry.flag} {toCountry.code}</span>
              </div>
            )}
          </StepWrap>
        )}

        {step === 2 && (
          <StepWrap
            title="Why are you moving?"
            hint="Each reason unlocks a different set of required documents."
          >
            <div className="grid grid-cols-2 gap-2">
              {L.reasons.map((r) => {
                const active = reason === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
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
          </StepWrap>
        )}

        <div className="mt-2 flex items-center gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((step - 1) as Step)}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-accent"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => (step < 2 ? setStep((step + 1) as Step) : finish())}
            disabled={saving}
            className="group flex flex-1 items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold tracking-tight text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            <span>{step < 2 ? "Continue" : saving ? "Building your plan…" : "Generate my checklist"}</span>
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function StepWrap({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

function CountrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent px-4 py-4 pr-12 text-base font-medium text-foreground outline-none"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code} className="bg-card text-foreground">
            {c.name}  {c.flag}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">▾</span>
    </div>
  );
}