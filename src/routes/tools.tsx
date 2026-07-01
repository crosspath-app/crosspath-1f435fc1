import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenText, Calculator, Scale, ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — Crosspath.move" },
      { name: "description", content: "Translate bureaucratic terms, estimate relocation costs, and check what you can legally do abroad." },
      { property: "og:title", content: "Tools — Crosspath.move" },
      { property: "og:description", content: "Translate bureaucratic terms, estimate relocation costs, and check what you can legally do abroad." },
      { property: "og:url", content: "https://crosspath.lovable.app/tools" },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/tools" }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const t = useT();
  const tiles = [
    { to: "/terms", icon: BookOpenText, title: t("tools.terms.title"), desc: t("tools.terms.desc") },
    { to: "/cost", icon: Calculator, title: t("tools.cost.title"), desc: t("tools.cost.desc") },
    { to: "/legal", icon: Scale, title: t("tools.legal.title"), desc: t("tools.legal.desc") },
  ] as const;
  return (
    <AppShell>
      <PageHeader eyebrow={t("nav.tools")} title={t("tools.title")} subtitle={t("tools.subtitle")} />
      <div className="px-6 space-y-3">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.to}
              to={tile.to}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-foreground">{tile.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tile.desc}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}