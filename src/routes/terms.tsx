import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { TERMS } from "@/lib/borderless-extras";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Visa & Immigration Terms Translator — Crosspath.move" },
      { name: "description", content: "Plain-language definitions for confusing visa, residence permit and immigration terminology used on official forms and government portals." },
      { property: "og:title", content: "Visa & Immigration Terms Translator — Crosspath.move" },
      { property: "og:description", content: "Plain-language definitions for confusing visa, residence permit and immigration terminology." },
      { property: "og:url", content: "https://crosspath.lovable.app/terms" },
      { name: "twitter:title", content: "Visa & Immigration Terms Translator — Crosspath.move" },
      { name: "twitter:description", content: "Plain-language meanings for confusing visa and immigration phrases." },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const t = useT();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return TERMS;
    return TERMS.filter((e) => {
      const hay = [e.term, e.bureaucratic, e.plain, ...(e.aliases ?? [])].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [q]);

  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link to="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          <ArrowLeft className="h-3 w-3" /> {t("nav.tools")}
        </Link>
      </div>
      <PageHeader eyebrow={t("nav.tools")} title={t("terms.title")} subtitle={t("terms.subtitle")} />
      <div className="px-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("terms.search")}
            aria-label={t("terms.search")}
            className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="mt-6 px-6">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">{t("terms.empty")}</p>
        )}
        <ul className="space-y-3">
          {filtered.map((entry) => (
            <li key={entry.term} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-mono">{entry.term}</p>
              <div className="mt-2.5 rounded-xl bg-muted/40 p-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-mono">Bureaucratic</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80 italic">"{entry.bureaucratic}"</p>
              </div>
              <div className="mt-2 flex gap-2 rounded-xl p-3" style={{ background: "oklch(0.74 0.13 235 / 0.08)" }}>
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.8} />
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-mono">Plain</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">{entry.plain}</p>
                  {entry.example && (
                    <p className="mt-1.5 text-[11px] text-muted-foreground">e.g. {entry.example}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}