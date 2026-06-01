import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Crosspath — Donate" },
      { name: "description", content: "Keep Crosspath free and ad-free. Tip the project to fund new countries, languages and updates." },
      { property: "og:title", content: "Support Crosspath — Donate" },
      { property: "og:description", content: "Keep Crosspath free and ad-free." },
      { property: "og:url", content: "https://crosspath.lovable.app/support" },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/support" }],
  }),
  component: SupportPage,
});

// Replace these with your real donation / checkout URLs.
const DONATE_URLS = {
  kofi: "https://ko-fi.com/crosspathsupport",
};

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

      {/* Premium */}
      <section className="mt-10 px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {t("support.premium.eyebrow")}
        </p>
        <div
          className="overflow-hidden rounded-3xl border border-border p-5"
          style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <h2 className="text-lg font-semibold text-foreground">
                  {t("support.premium.title")}
                </h2>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("support.premium.subtitle")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold tracking-tight text-foreground">$4</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("support.premium.perMonth")}
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-2">
            {premiumPerks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <a
            href={PREMIUM_URL}
            className="group mt-6 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold tracking-tight text-primary-foreground transition-transform active:scale-[0.98]"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            <span>{t("support.premium.cta")}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {t("support.premium.note")}
          </p>
        </div>
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
