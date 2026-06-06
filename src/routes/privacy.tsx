import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Eye, Trash2, Mail, Lock, Clock, Globe, FileText } from "lucide-react";
import { AppShell, PageHeader } from "@/components/borderless/AppShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Crosspath" },
      { name: "description", content: "How Crosspath collects, uses and protects your personal data. GDPR and RODO compliant." },
      { property: "og:title", content: "Privacy Policy — Crosspath" },
      { property: "og:description", content: "How Crosspath collects, uses and protects your personal data. GDPR and RODO compliant." },
      { property: "og:url", content: "https://crosspath.lovable.app/privacy" },
    ],
    links: [
      { rel: "canonical", href: "https://crosspath.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <AppShell>
      <div className="px-6 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono"
        >
          <ArrowLeft className="h-3 w-3" /> Home
        </Link>
      </div>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: 5 June 2026. This page explains how we collect, use and protect your data under GDPR (EU) and RODO (Poland)."
      />

      <div className="px-6 pb-12 space-y-6">
        {/* Controller */}
        <PolicySection icon={<Globe className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="1. Who we are">
          <p className="text-sm text-foreground leading-relaxed">
            <strong className="text-foreground">Crosspath</strong> is an independent project built to help people move abroad without getting lost in bureaucracy. The service is operated as a personal project. For any privacy questions, contact us at the email listed in this policy.
          </p>
        </PolicySection>

        {/* What we collect */}
        <PolicySection icon={<Eye className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="2. What data we collect">
          <p className="text-sm text-foreground leading-relaxed">
            When you create an account or use the app, we collect:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
            <li><strong className="text-foreground">Account data:</strong> email address, display name, password (hashed by our auth provider — we never see it in plain text).</li>
            <li><strong className="text-foreground">Move profile:</strong> nationality, destination country, and reason for moving (used only to generate your personalized checklist).</li>
            <li><strong className="text-foreground">Usage data:</strong> anonymous analytics about which features are used most (no personal identifiers).</li>
            <li><strong className="text-foreground">Device data:</strong> browser type, language preference, and screen size (for UI optimization).</li>
          </ul>
          <p className="mt-3 text-sm text-foreground leading-relaxed">
            We do <strong>not</strong> collect: passport numbers, ID scans, financial data, or any sensitive documents.
          </p>
        </PolicySection>

        {/* Legal basis */}
        <PolicySection icon={<FileText className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="3. Legal basis for processing">
          <p className="text-sm text-foreground leading-relaxed">
            Under GDPR/RODO, we process your data on the following legal bases:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
            <li><strong className="text-foreground">Consent (Art. 6(1)(a) GDPR):</strong> You explicitly agree to our privacy policy when creating an account.</li>
            <li><strong className="text-foreground">Contract performance (Art. 6(1)(b) GDPR):</strong> We need your move details to generate the checklist you requested.</li>
            <li><strong className="text-foreground">Legitimate interest (Art. 6(1)(f) GDPR):</strong> Anonymous analytics to improve the service.</li>
          </ul>
        </PolicySection>

        {/* How we use */}
        <PolicySection icon={<ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="4. How we use your data">
          <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
            <li>To create and manage your account.</li>
            <li>To generate personalized relocation checklists, deadlines, and guides.</li>
            <li>To remember your preferences across sessions.</li>
            <li>To send important service updates (e.g., new country guides).</li>
            <li>To improve the app through aggregated, anonymized usage patterns.</li>
          </ul>
          <p className="mt-3 text-sm text-foreground leading-relaxed">
            We <strong>never</strong> sell your data. We <strong>never</strong> share it with third parties for advertising. We <strong>never</strong> use it for automated decision-making that affects your legal rights.
          </p>
        </PolicySection>

        {/* Storage & security */}
        <PolicySection icon={<Lock className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="5. Storage and security">
          <p className="text-sm text-foreground leading-relaxed">
            Your data is stored on secure servers within the European Union. All connections use TLS encryption. Passwords are hashed using industry-standard algorithms. Access to the database is restricted and monitored.
          </p>
        </PolicySection>

        {/* Retention */}
        <PolicySection icon={<Clock className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="6. Data retention">
          <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
            <li><strong className="text-foreground">Active accounts:</strong> Data is kept for as long as your account is active.</li>
            <li><strong className="text-foreground">Deleted accounts:</strong> We delete your personal data within 30 days of account deletion. Anonymized analytics may be retained longer.</li>
            <li><strong className="text-foreground">Inactive accounts:</strong> If you do not log in for 24 months, we may email you before deletion.</li>
          </ul>
        </PolicySection>

        {/* Your rights */}
        <PolicySection icon={<Eye className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="7. Your rights (GDPR / RODO)">
          <p className="text-sm text-foreground leading-relaxed">
            You have the right to:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
            <li><strong className="text-foreground">Access:</strong> Request a copy of all data we hold about you.</li>
            <li><strong className="text-foreground">Rectification:</strong> Correct any inaccurate or incomplete data.</li>
            <li><strong className="text-foreground">Erasure ("right to be forgotten"):</strong> Delete your account and all associated data.</li>
            <li><strong className="text-foreground">Restriction:</strong> Limit how we process your data in certain circumstances.</li>
            <li><strong className="text-foreground">Portability:</strong> Receive your data in a structured, machine-readable format.</li>
            <li><strong className="text-foreground">Objection:</strong> Object to processing based on legitimate interests.</li>
            <li><strong className="text-foreground">Withdraw consent:</strong> Revoke your consent at any time (this does not affect prior lawful processing).</li>
          </ul>
          <p className="mt-3 text-sm text-foreground leading-relaxed">
            To exercise any right, contact us or delete your account from the Account page. We respond to all requests within 30 days.
          </p>
        </PolicySection>

        {/* Cookies */}
        <PolicySection icon={<FileText className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="8. Cookies and tracking">
          <p className="text-sm text-foreground leading-relaxed">
            We use only essential cookies required for authentication and basic app functionality. We do not use third-party tracking cookies, pixel tags, or fingerprinting. Anonymous usage metrics are collected without cookies where possible.
          </p>
        </PolicySection>

        {/* Third parties */}
        <PolicySection icon={<Globe className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="9. Third-party services">
          <p className="text-sm text-foreground leading-relaxed">
            We rely on the following trusted providers for infrastructure:
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
            <li><strong className="text-foreground">Lovable Cloud</strong> — authentication, database, and hosting.</li>
          </ul>
          <p className="mt-3 text-sm text-foreground leading-relaxed">
            These providers process data under their own privacy policies and Data Processing Agreements compliant with GDPR.
          </p>
        </PolicySection>

        {/* Children */}
        <PolicySection icon={<ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="10. Children's privacy">
          <p className="text-sm text-foreground leading-relaxed">
            Crosspath is not intended for users under 16. We do not knowingly collect data from children. If you believe a child has provided us with personal data, contact us and we will delete it immediately.
          </p>
        </PolicySection>

        {/* Changes */}
        <PolicySection icon={<FileText className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="11. Changes to this policy">
          <p className="text-sm text-foreground leading-relaxed">
            We may update this policy as laws or our service evolves. Material changes will be notified by email or in-app notice. The "Last updated" date at the top of this page always reflects the current version.
          </p>
        </PolicySection>

        {/* Contact */}
        <PolicySection icon={<Mail className="h-4 w-4 text-primary" strokeWidth={1.8} />} title="12. Contact us">
          <p className="text-sm text-foreground leading-relaxed">
            For privacy questions, data requests, or complaints:
          </p>
          <div className="mt-3 rounded-2xl border border-border bg-card/60 p-4">
            <p className="text-sm text-foreground font-medium">Crosspath Privacy</p>
            <p className="mt-1 text-sm text-muted-foreground">Email: crosspath.support@gmail.com</p>
            <p className="text-sm text-muted-foreground">Response time: within 30 days</p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            If you are in the EU and believe your rights have been violated, you also have the right to lodge a complaint with your local Data Protection Authority (UODO in Poland, CNIL in France, ICO in the UK, etc.).
          </p>
        </PolicySection>

        {/* Delete account */}
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-3">
          <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-destructive" strokeWidth={1.8} />
          <div>
            <p className="text-sm font-medium text-foreground">Want to delete your data?</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Go to your <Link to="/account" className="text-primary underline underline-offset-2">Account page</Link> and sign out, then contact us to request full deletion. We will confirm within 48 hours and remove everything within 30 days.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function PolicySection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
