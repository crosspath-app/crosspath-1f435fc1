import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Check, ChevronDown, ExternalLink, Sparkles, MapPin, AlertCircle, Lightbulb, Coins } from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { COUNTRIES, REASONS, GLOSSARY, HOW_TO } from "@/lib/borderless-data";
import { useTrip, useChecked } from "@/lib/trip-store";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Your move plan — Borderless" },
      { name: "description", content: "Personalized checklist, deadlines, and Move Score for your relocation." },
      { property: "og:title", content: "Your move plan — Borderless" },
      { property: "og:description", content: "Personalized checklist, deadlines, and Move Score for your relocation." },
      { property: "og:url", content: "https://crosspath.lovable.app/checklist" },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/checklist" },
    ],
  }),
  component: ChecklistPage,
});

function ChecklistPage() {
  const [trip] = useTrip();
  const { checked, toggle } = useChecked();
  const [openId, setOpenId] = useState<string | null>(null);

  if (!trip) {
    return (
      <AppShell>
        <PageHeader eyebrow="Checklist" title="No trip yet" subtitle="Create one from the home screen to see your personalized plan." />
        <div className="px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to start
          </Link>
        </div>
      </AppShell>
    );
  }

  const fromC = COUNTRIES.find((c) => c.code === trip.from)!;
  const toC = COUNTRIES.find((c) => c.code === trip.to)!;
  const reason = REASONS.find((r) => r.id === trip.reason)!;
  const total = trip.checklist.length;
  const done = trip.checklist.filter((c) => checked[c.id]).length;
  const readiness = Math.round((done / total) * 100);

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <ArrowLeft className="h-3 w-3" /> Edit trip
        </Link>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          {fromC.flag} {fromC.code} → {toC.flag} {toC.code} · {reason.label}
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-foreground">
          Your move plan
        </h1>
      </div>

      {/* Score cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 px-6">
        <ScoreCard label="Move Score" value={trip.moveScore} suffix="/100" />
        <ScoreCard label="Readiness" value={readiness} suffix="%" accent />
      </div>

      <div className="mx-6 mt-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
        <Calendar className="h-4 w-4 text-primary" strokeWidth={1.6} />
        <span className="text-xs text-muted-foreground">Estimated timeline</span>
        <span className="ml-auto text-sm font-medium text-foreground">~{trip.timelineWeeks} weeks</span>
      </div>

      {/* Checklist */}
      <div className="mt-8 px-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Documents & steps</h2>
        <ul className="mt-3 space-y-2.5">
          {trip.checklist.map((item) => {
            const isDone = !!checked[item.id];
            const isOpen = openId === item.id;
            const how = HOW_TO[item.id];
            return (
              <li
                key={item.id}
                className="rounded-2xl border p-4 transition-colors"
                style={{
                  borderColor: isDone ? "oklch(0.72 0.15 165 / 0.5)" : "var(--color-border)",
                  background: isDone ? "oklch(0.72 0.15 165 / 0.06)" : "var(--color-card)",
                }}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(item.id)}
                    aria-label={isDone ? "Mark incomplete" : "Mark done"}
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors"
                    style={{
                      borderColor: isDone ? "var(--success)" : "var(--color-border)",
                      background: isDone ? "var(--success)" : "transparent",
                    }}
                  >
                    {isDone && <Check className="h-3.5 w-3.5 text-background" strokeWidth={3} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.category}
                        <ChevronDown
                          className="h-3.5 w-3.5 transition-transform"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="font-mono">~{item.estimatedDays}d</span>
                      <span className="text-border">·</span>
                      <span>{item.copies} {item.copies === 1 ? "copy" : "copies"}</span>
                      {how?.cost && (
                        <>
                          <span className="text-border">·</span>
                          <span className="font-mono">{how.cost}</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {isOpen && how && (
                  <div className="mt-4 ml-9 space-y-4 border-t border-border pt-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Where to get it</p>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground">{how.where}</p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">How to do it</p>
                      <ol className="mt-2 space-y-1.5">
                        {how.steps.map((s, i) => (
                          <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-foreground">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-muted font-mono text-[10px] text-muted-foreground">
                              {i + 1}
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-xl border border-border bg-background/50 p-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">What people forget</p>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {how.forgotten.map((f, i) => (
                          <li key={i} className="text-xs leading-relaxed text-foreground">· {f}</li>
                        ))}
                      </ul>
                    </div>

                    {how.tip && (
                      <div className="flex gap-2 rounded-xl p-3" style={{ background: "oklch(0.74 0.13 235 / 0.08)" }}>
                        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.8} />
                        <p className="text-xs leading-relaxed text-foreground">{how.tip}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Coins className="h-3 w-3" /> {how.cost}
                      </span>
                      {item.officialUrl && item.officialUrl !== "#" && (
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center gap-1 text-primary"
                        >
                          Official site <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {isOpen && !how && (
                  <div className="mt-4 ml-9 border-t border-border pt-4 text-xs text-muted-foreground">
                    Detailed guidance for this step is coming soon. Check the official site for the latest requirements.
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Glossary */}
      <div className="mt-10 px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.6} />
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Plain-language glossary</h2>
        </div>
        <ul className="mt-3 space-y-2">
          {GLOSSARY.slice(0, 4).map((g) => (
            <li key={g.term} className="rounded-xl border border-border bg-card p-3">
              <p className="text-sm font-semibold text-foreground">{g.term}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.meaning}</p>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}

function ScoreCard({ label, value, suffix, accent }: { label: string; value: number; suffix: string; accent?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border p-4"
      style={{ background: accent ? "var(--gradient-primary)" : "var(--gradient-card)" }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: accent ? "oklch(0.14 0.03 260 / 0.7)" : "var(--color-muted-foreground)" }}
      >
        {label}
      </p>
      <p
        className="mt-2 text-3xl font-semibold tracking-tight"
        style={{ color: accent ? "var(--color-primary-foreground)" : "var(--color-foreground)" }}
      >
        {value}
        <span className="text-base font-normal opacity-70">{suffix}</span>
      </p>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: accent ? "oklch(0.14 0.03 260 / 0.25)" : "var(--color-muted)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: accent ? "oklch(0.14 0.03 260)" : "var(--gradient-primary)",
          }}
        />
      </div>
    </div>
  );
}