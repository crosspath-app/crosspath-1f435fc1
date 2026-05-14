import { Link, useLocation } from "@tanstack/react-router";
import { Home, ListChecks, BarChart3, LifeBuoy } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/checklist", label: "Checklist", icon: ListChecks },
  { to: "/compare", label: "Compare", icon: BarChart3 },
  { to: "/help", label: "Help", icon: LifeBuoy },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.62 0.14 230 / 0.35), transparent 70%)" }} />
      <main className="relative flex-1 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-background/80 backdrop-blur-xl">
        <ul className="grid grid-cols-4">
          {tabs.map((t) => {
            const active = location.pathname === t.to;
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <Link
                  to={t.to}
                  className="flex flex-col items-center gap-1 py-3 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors"
                  style={{ color: active ? "var(--color-primary)" : "var(--color-muted-foreground)" }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                  <span>{t.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
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