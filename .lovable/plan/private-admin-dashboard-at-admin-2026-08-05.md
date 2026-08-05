# Private admin dashboard at /admin

A stats page only you can see. Everyone else — signed out or signed in — gets a "not found / no access" state, and the database itself refuses to hand them the data.

## How access is controlled

Two layers, because the first one alone is never enough:

1. **UI layer** — `/admin` checks your role and renders nothing but an access-denied card if you are not an admin. The route is excluded from `sitemap.xml` and marked `noindex`, so Google never lists it.
2. **Database layer (the real protection)** — roles live in their own `user_roles` table, never on `profiles`, and every admin read is gated by a `has_role()` security-definer check. Even if someone typed the URL, guessed the query, or edited the JavaScript in their browser, the database returns zero rows.

Your own account gets the `admin` role seeded once. Nobody can grant themselves a role from the app: there is no UI or policy that allows inserting into `user_roles`.

## What the dashboard shows

- Total registered users, plus new sign-ups in the last 7 and 30 days
- How many users completed onboarding vs dropped off
- Top nationalities, top destination countries, and split by move reason (study / work / nomad / travel / protection)
- Deadline tracker usage: total deadlines saved, how many have email reminders on, how many expire in the next 30 days
- A simple sign-ups-over-time list for the last 8 weeks

All of it is aggregate counts. No email addresses, no individual user rows — that keeps the page useful for a portfolio screenshot without turning it into a personal-data export, which also keeps the GDPR/RODO statement on `/privacy` accurate.

## Technical detail

**Migration**
- `create type public.app_role as enum ('admin','user')`
- `public.user_roles (id, user_id -> auth.users, role, unique(user_id, role))`, GRANT select to `authenticated`, GRANT all to `service_role`, RLS on, policy: users may read their own role rows only. No insert/update/delete policy — role changes happen only through a migration.
- `public.has_role(_user_id uuid, _role app_role)` — `stable security definer set search_path = public`.
- Add admin-read policies to `profiles` and `document_deadlines`: `using (public.has_role(auth.uid(),'admin'))` alongside the existing owner-only policies.
- `public.admin_stats()` — a `security definer` function that returns a single JSON object of the aggregate counts above and starts with `if not public.has_role(auth.uid(),'admin') then raise exception 'forbidden'; end if;`. GRANT execute to `authenticated` only.
- Seed your user id into `user_roles` as `admin` (separate data insert once the account is identified).

**Frontend**
- `src/hooks/use-role.ts` — reads the caller's own row from `user_roles`.
- `src/routes/admin.tsx` — uses `AppShell`, calls `supabase.rpc('admin_stats')`, renders stat cards and simple bar rows in the existing navy/muted-blue design tokens. Loading, denied, and error states. `head()` sets `robots: noindex, nofollow` and no canonical.
- Link to `/admin` shown in `/account` only when the role check passes; not added to the public nav, footer, `sitemap.xml`, or the PDF report.

**Not included**
- No user-management actions (no editing or deleting other users) — read-only stats.
- No exposure of individual emails or profile rows in the dashboard.
