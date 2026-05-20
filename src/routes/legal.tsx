import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronDown, ExternalLink, ShieldAlert } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useT } from "@/lib/i18n";
import { useLocalizedExtras } from "@/lib/borderless-i18n-extras";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Can I legally…? — Borderless" },
      { name: "description", content: "Quick legal answers about visas, work, freelancing, family and travel rights abroad." },
      { property: "og:title", content: "Can I legally…? — Borderless" },
      { property: "og:description", content: "Quick legal answers about visas, work, freelancing, family and travel rights abroad." },
      { property: "og:url", content: "https://crosspath.lovable.app/legal" },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/legal" }],
  }),
  component: LegalPage,
});

function badgeColor(short: string) {
  if (short.includes("Yes")) return "oklch(0.72 0.15 165 / 0.18)";
  if (short.includes("No")) return "oklch(0.65 0.18 25 / 0.18)";
  return "oklch(0.74 0.13 235 / 0.18)";
}

function LegalPage() {
  const t = useT();
  const { legal: LEGAL_QA } = useLocalizedExtras();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/tools" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <ArrowLeft className="h-3 w-3" /> {t("nav.tools")}
        </Link>
      </div>
      <PageHeader eyebrow={t("nav.tools")} title={t("legal.title")} subtitle={t("legal.subtitle")} />

      <ul className="space-y-3 px-6">
        {LEGAL_QA.map((qa) => {
          const isOpen = openId === qa.id;
          return (
            <li key={qa.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : qa.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{qa.q}</p>
                  <span
                    className="mt-2 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground"
                    style={{ background: badgeColor(qa.short) }}
                  >
                    {qa.short}
                  </span>
                </div>
                <ChevronDown
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {isOpen && (
                <div className="space-y-2 border-t border-border px-4 pb-4 pt-3">
                  <p className="text-xs leading-relaxed text-foreground">{qa.answer}</p>
                  {qa.region && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{qa.region}</p>
                  )}
                  {qa.source && (
                    <a
                      href={qa.source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary"
                    >
                      {qa.source.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mx-6 mt-6 flex items-start gap-2 rounded-2xl border border-border bg-card p-4">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
        <p className="text-xs leading-relaxed text-muted-foreground">{t("legal.disclaimer")}</p>
      </div>
    </AppShell>
  );
}