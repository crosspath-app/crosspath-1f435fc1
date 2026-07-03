import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, GraduationCap, Briefcase, Laptop, Plane, ArrowUpDown } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { COMPARE_COUNTRIES, type CompareCountry } from "@/lib/borderless-data";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Visas & Countries — Crosspath.move" },
      { name: "description", content: "Compare visa difficulty, work rights, student permits and immigration processing times side-by-side across countries." },
      { property: "og:title", content: "Compare Visas & Countries — Crosspath.move" },
      { property: "og:description", content: "Compare visa difficulty, work rights, student permits and immigration processing times side-by-side across countries." },
      { property: "og:url", content: "https://crosspath.lovable.app/compare" },
      { name: "twitter:title", content: "Compare Visas & Countries — Crosspath.move" },
      { name: "twitter:description", content: "Compare visa difficulty, work rights and processing times across relocation destinations." },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/compare" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [purpose, setPurpose] = useState<"study" | "work" | "nomad" | "travel">("study");
  const [sortBy, setSortBy] = useState<"score" | "cost" | "english" | "visa">("score");
  const [expanded, setExpanded] = useState<string | null>(null);

  const scored = useMemo(() => {
    return COMPARE_COUNTRIES.map((c) => ({ c, score: purposeScore(c, purpose) })).sort((a, b) => {
      if (sortBy === "cost") return a.c.costIndex - b.c.costIndex;
      if (sortBy === "english") return b.c.englishScore - a.c.englishScore;
      if (sortBy === "visa") return visaWeeks(a.c.visaTime) - visaWeeks(b.c.visaTime);
      return b.score - a.score;
    });
  }, [purpose, sortBy]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Compare"
        title="Find your best destination"
        subtitle="Each country is scored for your purpose, then ranked by visa speed, cost, English, healthcare, safety and work rights."
      />
      <div className="px-6 space-y-4">
        {/* Purpose pills */}
        <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1 pb-1">
          {PURPOSES.map((p) => {
            const Icon = p.icon;
            const active = purpose === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPurpose(p.id)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                  background: active ? "color-mix(in oklab, var(--color-primary) 14%, transparent)" : "var(--color-card)",
                  color: active ? "var(--color-primary)" : "var(--color-foreground)",
                }}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
            {scored.length} destinations
          </span>
          <label className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1">
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none bg-transparent pr-1 text-[11px] font-medium text-foreground outline-none"
              aria-label="Sort"
            >
              <option value="score">Best match</option>
              <option value="visa">Fastest visa</option>
              <option value="cost">Lowest cost</option>
              <option value="english">Most English</option>
            </select>
          </label>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {scored.map(({ c, score }) => (
            <CountryCard
              key={c.code}
              country={c}
              score={score}
              open={expanded === c.code}
              onToggle={() => setExpanded(expanded === c.code ? null : c.code)}
            />
          ))}
        </div>

        <p className="text-[11px] leading-relaxed text-muted-foreground pt-2">
          Indicative data from embassies, OECD, EF EPI and Numbeo (2024). Always confirm with the official consulate before you commit.
        </p>
      </div>
    </AppShell>
  );
}

const PURPOSES = [
  { id: "study" as const,  label: "Study",  icon: GraduationCap },
  { id: "work" as const,   label: "Work",   icon: Briefcase },
  { id: "nomad" as const,  label: "Nomad",  icon: Laptop },
  { id: "travel" as const, label: "Travel", icon: Plane },
];

function visaWeeks(s: string): number {
  const m = s.match(/(\d+)/g);
  if (!m) return 12;
  const nums = m.map(Number);
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return /month/i.test(s) ? avg * 4 : /day/i.test(s) ? avg / 7 : avg;
}

function purposeScore(c: CompareCountry, p: "study" | "work" | "nomad" | "travel"): number {
  const speed = Math.max(0, 100 - visaWeeks(c.visaTime) * 6);
  const affordability = Math.max(0, 100 - c.costIndex);
  const work = c.workRights === "Open" ? 100 : c.workRights === "Sponsored" ? 65 : c.workRights === "Restricted" ? 45 : 35;
  const nomad = c.nomadVisa === "Yes" ? 100 : c.nomadVisa === "Pilot" ? 70 : 30;
  const studentH = /unlimited/i.test(c.studentHours) ? 100 : (parseInt(c.studentHours) || 16) * 4;
  const weights = {
    study:  { speed: 0.15, eng: 0.15, heal: 0.15, safe: 0.1,  cost: 0.2,  work: 0.1,  nomad: 0,    stud: 0.15 },
    work:   { speed: 0.1,  eng: 0.15, heal: 0.1,  safe: 0.1,  cost: 0.15, work: 0.4,  nomad: 0,    stud: 0 },
    nomad:  { speed: 0.1,  eng: 0.2,  heal: 0.05, safe: 0.15, cost: 0.2,  work: 0,    nomad: 0.3,  stud: 0 },
    travel: { speed: 0.25, eng: 0.2,  heal: 0.1,  safe: 0.25, cost: 0.2,  work: 0,    nomad: 0,    stud: 0 },
  }[p];
  return Math.round(
    speed * weights.speed +
    c.englishScore * weights.eng +
    c.healthcareScore * weights.heal +
    c.safetyScore * weights.safe +
    affordability * weights.cost +
    work * weights.work +
    nomad * weights.nomad +
    Math.min(100, studentH) * weights.stud
  );
}

function CountryCard({ country: c, score, open, onToggle }: {
  country: CompareCountry; score: number; open: boolean; onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card transition-colors">
      <button onClick={onToggle} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="text-2xl leading-none">{c.flag}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-semibold text-foreground">{c.country}</h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{c.region}</span>
          </div>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {c.visaTime} · {c.workRights} work · {c.language}
          </p>
        </div>
        <ScoreBadge value={score} />
        <ChevronDown
          className="h-4 w-4 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>

      {open && (
        <div className="border-t border-border px-4 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Visa time"     value={c.visaTime} />
            <Metric label="Student work"  value={c.studentHours} />
            <Metric label="Nomad visa"    value={c.nomadVisa} />
            <Metric label="Income tax"    value={c.taxRate} />
            <Metric label="Currency"      value={c.currency} />
            <Metric label="Cost index"    value={`${c.costIndex} / 100`} hint="NYC = 100" />
          </div>

          <div className="space-y-2">
            <Bar label="English friendliness" value={c.englishScore} />
            <Bar label="Healthcare"           value={c.healthcareScore} />
            <Bar label="Safety"               value={c.safetyScore} />
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-[11px] leading-relaxed text-foreground">
              <span className="text-primary font-medium">Good for · </span>{c.goodFor}
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              <span className="text-foreground font-medium">Watch out · </span>{c.watchOut}
            </p>
          </div>

          {(c.prYears || c.citizenshipYears || c.dualCitizenship || c.postStudyWork) && (
            <div className="rounded-xl border border-border bg-background/40 p-3">
              <p className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground font-mono">Legal pathway</p>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                {c.prYears !== undefined && (
                  <>
                    <dt className="text-muted-foreground">Permanent residency</dt>
                    <dd className="text-foreground font-medium text-right">{c.prYears} yrs</dd>
                  </>
                )}
                {c.citizenshipYears !== undefined && (
                  <>
                    <dt className="text-muted-foreground">Citizenship</dt>
                    <dd className="text-foreground font-medium text-right">{c.citizenshipYears} yrs</dd>
                  </>
                )}
                {c.dualCitizenship && (
                  <>
                    <dt className="text-muted-foreground">Dual citizenship</dt>
                    <dd className="text-foreground font-medium text-right">{c.dualCitizenship}</dd>
                  </>
                )}
                {c.postStudyWork && (
                  <>
                    <dt className="text-muted-foreground">Post-study work</dt>
                    <dd className="text-foreground font-medium text-right">{c.postStudyWork}</dd>
                  </>
                )}
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreBadge({ value }: { value: number }) {
  const tone = value >= 75 ? "var(--color-primary)" : value >= 55 ? "oklch(0.78 0.15 85)" : "oklch(0.7 0.18 30)";
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold"
      style={{ borderColor: tone, color: tone, background: `color-mix(in oklab, ${tone} 12%, transparent)` }}
      aria-label={`Match score ${value}`}
    >
      {value}
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-3 py-2">
      <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</p>
      <p className="mt-1 text-xs font-medium text-foreground">{value}</p>
      {hint && <p className="text-[9px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium font-mono">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: "var(--gradient-primary, var(--color-primary))" }}
        />
      </div>
    </div>
  );
}