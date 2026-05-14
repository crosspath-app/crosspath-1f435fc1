import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { COMPARE_ROWS } from "@/lib/borderless-data";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare countries — Borderless" },
      { name: "description", content: "Side-by-side comparison of visa difficulty, work rights, and processing times." },
      { property: "og:title", content: "Compare countries — Borderless" },
      { property: "og:description", content: "Side-by-side comparison of visa difficulty, work rights, and processing times." },
      { property: "og:url", content: "https://crosspath.lovable.app/compare" },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/compare" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Compare"
        title="Compare relocation destinations"
        subtitle="Visa times, work rights, and rules — a quick glance to help you decide."
      />
      <div className="px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 border-b border-border bg-muted/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Country</span>
            <span>Student hrs</span>
            <span>Visa time</span>
            <span>Work</span>
          </div>
          {COMPARE_ROWS.map((row, i) => (
            <div
              key={row.country}
              className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 px-4 py-3 text-sm text-foreground"
              style={{ borderTop: i === 0 ? undefined : "1px solid var(--color-border)" }}
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{row.flag}</span>
                <span className="truncate">{row.country}</span>
              </span>
              <span className="text-muted-foreground">{row.studentHours}</span>
              <span className="text-muted-foreground">{row.visaTime}</span>
              <span className="text-primary">{row.workRights}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Data is indicative and updated periodically. Always verify with the official embassy or consulate before making decisions.
        </p>
      </div>
    </AppShell>
  );
}