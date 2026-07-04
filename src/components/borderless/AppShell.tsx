import { Link, useLocation } from "@tanstack/react-router";
import { Home, ListChecks, BarChart3, LifeBuoy, Wrench, UserCircle2, Globe2 } from "lucide-react";
import type { ReactNode } from "react";
import { LANGS, useLang, useT, type Lang } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";

const tabs = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/checklist", key: "nav.checklist", icon: ListChecks },
  { to: "/compare", key: "nav.compare", icon: BarChart3 },
  { to: "/tools", key: "nav.tools", icon: Wrench },
  { to: "/help", key: "nav.help", icon: LifeBuoy },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="relative min-h-screen w-full bg-background lg:flex">
      {/* Desktop-only sidebar */}
      <DesktopSidebar pathname={location.pathname} />

      {/* App surface — phone frame on mobile, full-width on desktop */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-background lg:mx-0 lg:min-h-screen lg:w-full lg:max-w-none lg:flex-1">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07] lg:opacity-[0.04]" />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl lg:h-[520px] lg:w-[520px] lg:-top-40"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.14 230 / 0.35), transparent 70%)" }}
        />
        <LanguageSwitcher />
        <AccountButton />
        <main className="relative flex-1 pb-24 lg:pb-16">
          <div className="lg:mx-auto lg:max-w-3xl lg:px-4 lg:pt-4">{children}</div>
        </main>

        {/* Mobile bottom-tab nav */}
        <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/80 backdrop-blur-xl lg:hidden">
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

        {/* Mobile footer links */}
        <div className="fixed bottom-16 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-center gap-3 px-4 py-2 text-[9px] text-muted-foreground uppercase tracking-[0.15em] font-mono lg:hidden">
          <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
          <span>·</span>
          <Link to="/about" className="hover:text-foreground transition">About</Link>
          <span>·</span>
          <Link to="/support" className="hover:text-foreground transition">Support</Link>
        </div>
      </div>
    </div>
  );
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  const t = useT();
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-border bg-card/40 backdrop-blur lg:flex lg:flex-col">
      <div className="flex items-center gap-2 px-6 pt-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
          <Globe2 className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Crosspath</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">.move</p>
        </div>
      </div>

      <nav className="mt-8 flex-1 px-3">
        <p className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Navigate</p>
        <ul className="space-y-1">
          {tabs.map((tab) => {
            const active = pathname === tab.to;
            const Icon = tab.icon;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{
                    background: active ? "var(--color-accent)" : "transparent",
                    color: active ? "var(--color-primary)" : "var(--color-foreground)",
                  }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  <span>{t(tab.key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-6 pb-6">
        <div className="rounded-xl border border-border bg-background/50 p-3 text-xs text-muted-foreground">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">Info, not legal advice</p>
          <p className="mt-1.5 leading-relaxed">Sources traced to EUR-Lex, EUAA and UNHCR.</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/methodology" className="hover:text-foreground">Sources</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/support" className="hover:text-foreground">Support</Link>
        </div>
      </div>
    </aside>
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
    <div className="absolute right-4 top-4 z-20 lg:right-6 lg:top-6">
      <label className="sr-only" htmlFor="lang-switcher">{t("lang.label")}</label>
      <div className="relative flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1.5 backdrop-blur">
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

function AccountButton() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <div className="absolute left-4 top-4 z-20 lg:left-auto lg:right-[8.5rem] lg:top-6">
      <Link
        to={user ? "/account" : "/auth"}
        className="flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1.5 backdrop-blur transition hover:bg-accent"
        aria-label={user ? "Account" : "Sign in"}
      >
        <UserCircle2 className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground">
          {user ? "Account" : "Sign in"}
        </span>
      </Link>
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
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">{eyebrow}</p>
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