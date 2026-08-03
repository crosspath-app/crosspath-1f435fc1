CREATE TABLE public.document_deadlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  notes text,
  deadline_date date NOT NULL,
  remind_days_before integer NOT NULL DEFAULT 30,
  email_enabled boolean NOT NULL DEFAULT true,
  last_reminded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_deadlines TO authenticated;
GRANT ALL ON public.document_deadlines TO service_role;

ALTER TABLE public.document_deadlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own deadlines" ON public.document_deadlines
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own deadlines" ON public.document_deadlines
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own deadlines" ON public.document_deadlines
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own deadlines" ON public.document_deadlines
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER set_document_deadlines_updated_at
  BEFORE UPDATE ON public.document_deadlines
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_document_deadlines_user ON public.document_deadlines(user_id, deadline_date);