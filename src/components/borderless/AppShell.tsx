import { Link, useLocation } from "@tanstack/react-router";
import { Home, ListChecks, BarChart3, LifeBuoy, Wrench, Languages } from "lucide-react";
import type { ReactNode } from "react";
import { LANGS, useLang, useT, type Lang } from "@/lib/i18n";

const tabs = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/checklist", key: "nav.checklist", icon: ListChecks },
  { to: "/compare", key: "nav.compare", icon: BarChart3 },
  { to: "/tools", key: "nav.tools", icon: Wrench },
  { to: "/help", key: "nav.help", icon: LifeBuoy },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const t = useT();
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.62 0.14 230 / 0.35), transparent 70%)" }} />
      <LanguageSwitcher />
      <main className="relative flex-1 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/80 backdrop-blur-xl">
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const active = location.pathname === t.to;
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <Link
                  to={t.to}
                  className="flex flex-col items-center gap-1 py-3 text-[9px] font-medium uppercase tracking-[0.12em] transition-colors"
                  style={{ color: active ? "var(--color-primary)" : "var(--color-muted-foreground)" }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                  <span>{useTLabel(t.key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function useTLabel(key: string) {
  const t = useT();
  return t(key);
}

function LanguageSwitcher() {
  const [lang, setLang] = useLang();
  const t = useT();
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  return (
    <div className="absolute right-4 top-4 z-20">
      <label className="sr-only" htmlFor="lang-switcher">{t("lang.label")}</label>
      <div className="relative flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1.5 backdrop-blur">
        <Languages className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
        <span className="text-xs">{current.flag}</span>
        <select
          id="lang-switcher"
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          aria-label={t("lang.label")}
          className="appearance-none bg-transparent pr-3 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground outline-none"
        >
          {LANGS.map((l) => (
            <option key={l.code} value={l.code} className="bg-card text-foreground">
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-6 pt-10 pb-6">
      {eyebrow && (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-foreground">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}