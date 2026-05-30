import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Coffee, Crown, Check, ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Crosspath — Donate" },
      { name: "description", content: "Keep Crosspath free and ad-free. Tip the project to fund future updates" },
      { property: "og:title", content: "Support Crosspath " },
      { property: "og:description", content: "Keep Crosspath free and ad-free. Tip the project." },
      { property: "og:url", content: "https://crosspath.lovable.app/support" },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/support" }],
  }),
  component: SupportPage,
});

// Replace these with your real donation / checkout URLs.
const DONATE_URLS = {

  kofi: "ko-fi.com/crosspathsupport",

function SupportPage() {
  const t = useT();
  const tips = [
   
    { amount: "$10", label: t("support.tip.fuel"), url: DONATE_URLS.kofi, icon: Heart },

  ];
  return (
    <AppShell>
      <PageHeader
        eyebrow={t("support.eyebrow")}
        title={t("support.title")}
        subtitle={t("support.subtitle")}
      />

      {/* Donation tiers */}
      <section className="px-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {t("support.tipJar")}
        </p>
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <a
              key={tip.amount}
              href={tip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {tip.amount} · {tip.label}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {t("support.oneTime")}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          );
        })}
      </section>

      <section className="mt-10 px-6 pb-6 text-center">
        <p className="text-[11px] text-muted-foreground">{t("support.thanks")}</p>
        <Link to="/" className="mt-2 inline-block text-xs text-primary underline-offset-4 hover:underline">
          {t("support.back")}
        </Link>
      </section>
    </AppShell>
  );
}
