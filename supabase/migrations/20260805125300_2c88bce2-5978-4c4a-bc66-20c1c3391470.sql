CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all deadlines"
  ON public.document_deadlines FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  SELECT jsonb_build_object(
    'total_users', (SELECT count(*) FROM public.profiles),
    'new_7d', (SELECT count(*) FROM public.profiles WHERE created_at > now() - interval '7 days'),
    'new_30d', (SELECT count(*) FROM public.profiles WHERE created_at > now() - interval '30 days'),
    'onboarded', (SELECT count(*) FROM public.profiles WHERE onboarded_at IS NOT NULL),
    'not_onboarded', (SELECT count(*) FROM public.profiles WHERE onboarded_at IS NULL),
    'consented', (SELECT count(*) FROM public.profiles WHERE privacy_consent_at IS NOT NULL),
    'nationalities', COALESCE((
      SELECT jsonb_agg(x) FROM (
        SELECT nationality AS key, count(*) AS value
        FROM public.profiles WHERE nationality IS NOT NULL
        GROUP BY nationality ORDER BY count(*) DESC LIMIT 8
      ) x), '[]'::jsonb),
    'destinations', COALESCE((
      SELECT jsonb_agg(x) FROM (
        SELECT destination_country AS key, count(*) AS value
        FROM public.profiles WHERE destination_country IS NOT NULL
        GROUP BY destination_country ORDER BY count(*) DESC LIMIT 8
      ) x), '[]'::jsonb),
    'reasons', COALESCE((
      SELECT jsonb_agg(x) FROM (
        SELECT move_reason AS key, count(*) AS value
        FROM public.profiles WHERE move_reason IS NOT NULL
        GROUP BY move_reason ORDER BY count(*) DESC
      ) x), '[]'::jsonb),
    'signups_by_week', COALESCE((
      SELECT jsonb_agg(x ORDER BY (x->>'key')) FROM (
        SELECT jsonb_build_object(
          'key', to_char(date_trunc('week', created_at), 'YYYY-MM-DD'),
          'value', count(*)
        ) AS x
        FROM public.profiles
        WHERE created_at > now() - interval '8 weeks'
        GROUP BY date_trunc('week', created_at)
      ) s), '[]'::jsonb),
    'deadlines_total', (SELECT count(*) FROM public.document_deadlines),
    'deadlines_email_on', (SELECT count(*) FROM public.document_deadlines WHERE email_enabled),
    'deadlines_due_30d', (SELECT count(*) FROM public.document_deadlines
      WHERE deadline_date BETWEEN current_date AND current_date + 30),
    'deadline_users', (SELECT count(DISTINCT user_id) FROM public.document_deadlines)
  ) INTO result;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_stats() TO authenticated;