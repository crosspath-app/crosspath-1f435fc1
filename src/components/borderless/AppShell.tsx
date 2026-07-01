import { Link, useLocation } from "@tanstack/react-router";
import { Home, ListChecks, BarChart3, LifeBuoy, Wrench, UserCircle2 } from "lucide-react";
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
    <div className="relative min-h-screen w-full bg-background lg:flex lg:items-stretch lg:justify-center lg:gap-12 lg:px-12 lg:py-12">
      {/* Desktop side panel */}
      <aside className="hidden lg:flex lg:w-[420px] lg:flex-col lg:justify-between lg:py-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Crosspath.move</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground">
            Move abroad,<br />skip the paperwork.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Personalized relocation checklists, deadlines and plain‑language guides for anywhere in the world.
            Designed mobile‑first — preview it the way millions of people will use it.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="rounded-xl border border-border bg-card/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">65+</p>
            <p className="mt-1">destinations</p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">8</p>
            <p className="mt-1">languages</p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">6</p>
            <p className="mt-1">move purposes</p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">0€</p>
            <p className="mt-1">always free</p>
          </div>
        </div>
      </aside>

      {/* Phone-frame container (desktop) / fullscreen (mobile) */}
      <div
        className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-background lg:my-0 lg:h-[860px] lg:min-h-0 lg:max-h-[calc(100vh-6rem)] lg:w-[400px] lg:overflow-hidden lg:rounded-[42px] lg:border lg:border-border lg:shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
             style={{ background: "radial-gradient(circle, oklch(0.62 0.14 230 / 0.35), transparent 70%)" }} />
        <LanguageSwitcher />
        <AccountButton />
        <main className="relative flex-1 pb-24 lg:overflow-y-auto">{children}</main>
        <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/80 backdrop-blur-xl lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:w-auto lg:max-w-none lg:translate-x-0">
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

        {/* Footer links */}
        <div className="absolute bottom-16 left-0 right-0 z-20 flex items-center justify-center gap-3 px-4 py-2 text-[9px] text-muted-foreground uppercase tracking-[0.15em] font-mono lg:hidden">
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
    <div className="absolute left-4 top-4 z-20">
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