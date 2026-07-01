import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AppShell } from "@/components/borderless/AppShell";
import { Loader2, LogOut, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Crosspath.move" },
      { name: "description", content: "Manage your Crosspath.move account, profile and saved move plans." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [homeCountry, setHomeCountry] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, home_country")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setDisplayName(data.display_name ?? "");
        setHomeCountry(data.home_country ?? "");
      }
      setProfileLoading(false);
    })();
  }, [user]);

  async function save() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: displayName, home_country: homeCountry });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
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
      <div className="flex flex-col gap-6 px-6 pt-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Your account</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {displayName || user.email}
          </h1>
          <p className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <UserIcon className="h-3.5 w-3.5" />
            {user.email}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Profile</h2>
          <div className="mt-3 flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Display name</span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={profileLoading}
                maxLength={80}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Home country</span>
              <input
                value={homeCountry}
                onChange={(e) => setHomeCountry(e.target.value)}
                disabled={profileLoading}
                maxLength={80}
                placeholder="e.g. Poland"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              onClick={save}
              disabled={saving || profileLoading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save profile
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Back to app
          </Link>
          <Link
            to="/privacy"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Privacy Policy
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            About the Founder
          </Link>
          <button
            onClick={async () => {
              await signOut();
              toast.success("Signed out");
              navigate({ to: "/auth" });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-card px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </AppShell>
  );
}