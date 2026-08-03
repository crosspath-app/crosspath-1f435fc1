import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";
import { BellRing, CalendarClock, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/deadlines")({
  head: () => ({
    meta: [
      { title: "Document Deadline Reminders — Crosspath.move" },
      { name: "description", content: "Track visa, permit and insurance expiry dates and get an email reminder before each document deadline." },
      { property: "og:title", content: "Document Deadline Reminders — Crosspath.move" },
      { property: "og:description", content: "Track visa, permit and insurance expiry dates and get an email reminder before each document deadline." },
      { property: "og:url", content: "https://crosspath.site/deadlines" },
    ],
    links: [{ rel: "canonical", href: "https://crosspath.site/deadlines" }],
  }),
  component: DeadlinesPage,
});

type Deadline = {
  id: string;
  title: string;
  notes: string | null;
  deadline_date: string;
  remind_days_before: number;
  email_enabled: boolean;
};

const REMIND_OPTIONS = [7, 14, 30, 60, 90];

function daysUntil(date: string) {
  const d = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

function DeadlinesPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Deadline[]>([]);
  const [busy, setBusy] = useState(true);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [remind, setRemind] = useState(30);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("document_deadlines")
      .select("id, title, notes, deadline_date, remind_days_before, email_enabled")
      .order("deadline_date", { ascending: true });
    if (error) toast.error(error.message);
    else setItems(data ?? []);
    setBusy(false);
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  async function add() {
    if (!user) return;
    if (!title.trim() || !date) {
      toast.error("Add a document name and expiry date");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("document_deadlines").insert({
      user_id: user.id,
      title: title.trim().slice(0, 120),
      notes: notes.trim().slice(0, 500) || null,
      deadline_date: date,
      remind_days_before: remind,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    setTitle("");
    setNotes("");
    setDate("");
    toast.success("Reminder scheduled");
    load();
  }

  async function toggleEmail(item: Deadline) {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, email_enabled: !i.email_enabled } : i)));
    const { error } = await supabase
      .from("document_deadlines")
      .update({ email_enabled: !item.email_enabled })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      load();
    }
  }

  async function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    const { error } = await supabase.from("document_deadlines").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      load();
    }
  }

  if (loading || !user) {
    return (
      <AppShell>
        <div className="flex h-full items-center justify-center pt-24">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Deadlines"
        title="Document reminders"
        subtitle="Track visa, permit and insurance expiry dates. We email you before each one runs out."
      />

      <div className="px-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Add a deadline</h2>
          <div className="mt-3 flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Document</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                placeholder="e.g. Residence permit"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Expires on</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Remind me</span>
                <select
                  value={remind}
                  onChange={(e) => setRemind(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  {REMIND_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d} days before</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Notes (optional)</span>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                placeholder="Appointment reference, office, documents needed…"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              onClick={add}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Schedule reminder
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Your deadlines</h2>
        {busy ? (
          <div className="mt-4 flex justify-center"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Nothing tracked yet. Add your visa, permit or insurance expiry above and we&apos;ll warn you in time.
          </p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {items.map((item) => {
              const left = daysUntil(item.deadline_date);
              const urgent = left <= item.remind_days_before;
              return (
                <li key={item.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarClock className="h-3.5 w-3.5" strokeWidth={1.8} />
                        {new Date(item.deadline_date + "T00:00:00").toLocaleDateString(undefined, {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                      {item.notes && <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.notes}</p>}
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      aria-label="Delete deadline"
                      className="shrink-0 rounded-lg border border-border p-2 text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
                    <span
                      className="rounded-full px-2 py-0.5 font-mono"
                      style={{
                        background: urgent ? "oklch(0.72 0.16 40 / 0.15)" : "var(--color-muted)",
                        color: urgent ? "oklch(0.72 0.16 40)" : "var(--color-muted-foreground)",
                      }}
                    >
                      {left < 0 ? `expired ${-left}d ago` : `${left}d left`}
                    </span>
                    <span className="text-muted-foreground">alert {item.remind_days_before}d before</span>
                    <button
                      onClick={() => toggleEmail(item)}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors"
                      style={{
                        borderColor: item.email_enabled ? "var(--color-primary)" : "var(--color-border)",
                        color: item.email_enabled ? "var(--color-primary)" : "var(--color-muted-foreground)",
                      }}
                    >
                      <BellRing className="h-3 w-3" strokeWidth={1.8} />
                      {item.email_enabled ? "Email on" : "Email off"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
          Reminders are sent to {user.email}. Manage your account in{" "}
          <Link to="/account" className="text-primary hover:underline">settings</Link>.
        </p>
      </div>
    </AppShell>
  );
}