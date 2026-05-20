import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useT } from "@/lib/i18n";
import { useLocalizedExtras } from "@/lib/borderless-i18n-extras";

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
  const t = useT();
  const { compareRows: COMPARE_ROWS, compareHead, compareNote } = useLocalizedExtras();
  return (
    <AppShell>
      <PageHeader
        eyebrow={t("nav.compare")}
        title={t("compare.title")}
        subtitle={t("compare.subtitle")}
      />
      <div className="px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 border-b border-border bg-muted/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>{compareHead.country}</span>
            <span>{compareHead.studentHours}</span>
            <span>{compareHead.visaTime}</span>
            <span>{compareHead.workRights}</span>
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

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">{compareNote}</p>
      </div>
    </AppShell>
  );
}