import { createFileRoute } from "@tanstack/react-router";
import { Phone, FileWarning, Globe2, Building2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Emergency help — Borderless" },
      { name: "description", content: "Embassy contacts, lost passport steps, emergency numbers and official portals." },
    ],
  }),
  component: HelpPage,
});

const QUICK = [
  { icon: Phone, title: "Emergency", value: "112", note: "EU-wide emergency line" },
  { icon: FileWarning, title: "Lost passport", value: "Step-by-step", note: "Report, file, request emergency travel doc" },
  { icon: Building2, title: "Find embassy", value: "Locator", note: "Nearest consulate based on your nationality" },
  { icon: Globe2, title: "EU Immigration Portal", value: "immigration.europa.eu", note: "Official guidance" },
];

const STEPS = [
  "Stay calm. Note the time and place where you last had your passport.",
  "Report the loss to the local police and ask for a written report.",
  "Contact your country's embassy or consulate to start an emergency travel document.",
  "If you have travel insurance, notify them — many cover replacement fees.",
];

function HelpPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Help" title="When things go sideways." subtitle="Quick contacts and clear steps for the moments that matter." />

      <div className="px-6 grid grid-cols-2 gap-3">
        {QUICK.map((q) => {
          const Icon = q.icon;
          return (
            <div key={q.title} className="rounded-2xl border border-border bg-card p-4">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
              <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{q.title}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{q.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{q.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Lost passport — what to do</p>
        <ol className="mt-3 space-y-2">
          {STEPS.map((s, i) => (
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
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Tip</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Keep a digital copy of your passport, visa, and insurance card in your phone — Borderless will soon let you store them encrypted.
          </p>
        </div>
      </div>
    </AppShell>
  );
}