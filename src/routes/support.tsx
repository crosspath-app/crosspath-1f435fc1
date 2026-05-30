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
