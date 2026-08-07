import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-role";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { COUNTRIES, REASONS } from "@/lib/borderless-data";
import { BarChart3, BellRing, Loader2, Lock, Users } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Crosspath.move" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Bucket = { key: string; value: number };

type Stats = {
  total_users: number;
  new_7d: number;
  new_30d: number;
  onboarded: number;
  not_onboarded: number;
  consented: number;
  nationalities: Bucket[];
  destinations: Bucket[];
  reasons: Bucket[];
  signups_by_week: Bucket[];
  deadlines_total: number;
  deadlines_email_on: number;
  deadlines_due_30d: number;
  deadline_users: number;
};

function countryLabel(code: string) {
  const c = COUNTRIES.find((x) => x.code === code);
  return c ? `${c.flag} ${c.name}` : code;
}

function reasonLabel(id: string) {
  const r = REASONS.find((x) => x.id === id);
  return r ? `${r.emoji} ${r.label}` : id;
}

function Stat({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Bars({ title, data, format }: { title: string; data: Bucket[]; format?: (k: string) => string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {data.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">No data yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {data.map((d) => (
            <li key={d.key}>
              <div className="flex items-center justify-between text-xs text-foreground">
                <span>{format ? format(d.key) : d.key}</span>
                <span className="text-muted-foreground font-mono">{d.value}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(d.value / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (roleLoading) return;
    if (!isAdmin) {
      setBusy(false);
      return;
    }
    supabase.rpc("admin_stats").then(({ data, error: err }) => {
      if (err) setError(err.message);
      else setStats(data as unknown as Stats);
      setBusy(false);
    });
  }, [isAdmin, roleLoading]);

  if (authLoading || roleLoading || busy) {
    return (
      <AppShell>
        <div className="flex items-center justify-center px-6 py-24 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!isAdmin) {
    return (
      <AppShell>
        <PageHeader eyebrow="Restricted" title="No access" subtitle="This area is limited to the site operator." />
        <div className="px-6 pb-16">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Lock className="h-5 w-5 text-primary" strokeWidth={1.8} />
            <p className="mt-3 text-sm text-muted-foreground">
              {user ? "Your account does not have administrator permissions." : "Sign in with an administrator account to continue."}
            </p>
            <Link to={user ? "/" : "/auth"} className="mt-4 inline-block text-sm text-primary hover:underline">
              {user ? "Back to the planner" : "Go to sign in"}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Operator only"
        title="Admin dashboard"
        subtitle="Aggregate, anonymous usage statistics. No individual accounts or email addresses are shown."
      />
      <div className="space-y-6 px-6 pb-16">
        <Link
          to="/seo"
          className="inline-flex items-center gap-2 rounded-xl border border-primary bg-card px-3 py-2 text-xs font-medium text-primary hover:bg-accent"
        >
          <BarChart3 className="h-3.5 w-3.5" /> Search visibility dashboard
        </Link>
        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{error}</p>
        )}
        {stats && (
          <>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <h2 className="text-sm font-semibold text-foreground">Accounts</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Total users" value={stats.total_users} />
              <Stat label="New · 7 days" value={stats.new_7d} />
              <Stat label="New · 30 days" value={stats.new_30d} />
              <Stat
                label="Onboarded"
                value={stats.onboarded}
                hint={`${stats.not_onboarded} did not finish`}
              />
              <Stat label="Privacy consent" value={stats.consented} />
              <Stat
                label="Completion"
                value={`${stats.total_users ? Math.round((stats.onboarded / stats.total_users) * 100) : 0}%`}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <BellRing className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <h2 className="text-sm font-semibold text-foreground">Deadline tracker</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Deadlines saved" value={stats.deadlines_total} />
              <Stat label="Users tracking" value={stats.deadline_users} />
              <Stat label="Email reminders on" value={stats.deadlines_email_on} />
              <Stat label="Due in 30 days" value={stats.deadlines_due_30d} />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <BarChart3 className="h-4 w-4 text-primary" strokeWidth={1.8} />
              <h2 className="text-sm font-semibold text-foreground">Distribution</h2>
            </div>
            <Bars title="Top nationalities" data={stats.nationalities} format={countryLabel} />
            <Bars title="Top destinations" data={stats.destinations} format={countryLabel} />
            <Bars title="Reason for moving" data={stats.reasons} format={reasonLabel} />
            <Bars title="Sign-ups by week" data={stats.signups_by_week} />
          </>
        )}
      </div>
    </AppShell>
  );
}
