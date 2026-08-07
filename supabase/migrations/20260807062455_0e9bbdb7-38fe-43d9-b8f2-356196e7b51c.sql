CREATE TABLE public.seo_url_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  captured_on date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  verdict text,
  coverage_state text,
  indexing_state text,
  google_canonical text,
  last_crawl_time timestamptz,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  ctr numeric NOT NULL DEFAULT 0,
  position numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (url, captured_on)
);

GRANT SELECT ON public.seo_url_snapshots TO authenticated;
GRANT ALL ON public.seo_url_snapshots TO service_role;

ALTER TABLE public.seo_url_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view SEO snapshots"
  ON public.seo_url_snapshots FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX seo_url_snapshots_url_date_idx ON public.seo_url_snapshots (url, captured_on DESC);