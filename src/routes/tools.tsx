import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenText, Calculator, Scale, ArrowRight, Shield, Gavel, BookMarked, LifeBuoy } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Relocation Tools — Visa Terms, Costs & Legal Checks" },
      { name: "description", content: "Translate immigration and visa jargon, estimate relocation costs and check what you can legally do on your visa abroad." },
      { property: "og:title", content: "Relocation Tools — Visa Terms, Costs & Legal Checks" },
      { property: "og:description", content: "Translate immigration and visa jargon, estimate relocation costs and check what you can legally do on your visa abroad." },
      { property: "og:url", content: "https://crosspath.lovable.app/tools" },
      { name: "twitter:title", content: "Relocation Tools — Crosspath.move" },
      { name: "twitter:description", content: "Visa jargon translator, relocation cost calculator and legal rights checker for people moving abroad." },
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
    { to: "/rights", icon: Shield, title: "Know Your Rights", desc: "Border and in-country protections with the legal basis for each." },
    { to: "/case-law", icon: Gavel, title: "Landmark Case Law", desc: "Leading ECtHR and CJEU judgments on migration and asylum." },
    { to: "/asylum", icon: LifeBuoy, title: "Asylum & Protection", desc: "Refugee, subsidiary and temporary protection explained — with rights and legal aid contacts." },
    { to: "/methodology", icon: BookMarked, title: "Methodology & Sources", desc: "The primary sources and editorial policy behind every guide." },
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