-- Portfolio v2: richer case-study fields for the redesigned site.
-- Safe to run more than once. Run in the Supabase SQL Editor.

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS pdf_url        TEXT,
  ADD COLUMN IF NOT EXISTS video_url      TEXT,
  ADD COLUMN IF NOT EXISTS client         TEXT,
  ADD COLUMN IF NOT EXISTS year           TEXT,
  ADD COLUMN IF NOT EXISTS summary        TEXT,            -- one-line hook for cards
  ADD COLUMN IF NOT EXISTS overview       TEXT,            -- opening paragraph of the case study
  ADD COLUMN IF NOT EXISTS role           TEXT[],          -- e.g. {Concept,"Character design"}
  ADD COLUMN IF NOT EXISTS deliverables   TEXT[],
  ADD COLUMN IF NOT EXISTS tags           TEXT[],
  ADD COLUMN IF NOT EXISTS accent_color   TEXT,            -- e.g. #e3262b
  ADD COLUMN IF NOT EXISTS challenge      TEXT[],
  ADD COLUMN IF NOT EXISTS goals          TEXT[],
  ADD COLUMN IF NOT EXISTS process_steps  JSONB,           -- [{"title": "...", "body": "..."}]
  ADD COLUMN IF NOT EXISTS outcome        TEXT[],
  ADD COLUMN IF NOT EXISTS takeaway       TEXT,
  ADD COLUMN IF NOT EXISTS gallery        JSONB,           -- [{"src","alt","caption","layout":"full|half","width","height"}]
  ADD COLUMN IF NOT EXISTS published      BOOLEAN DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);

-- The v1 seed rows had no images or real case studies; hide them instead of deleting.
UPDATE projects SET published = false
WHERE slug IN ('vibrant-education-campaign', 'pongal-vadai-youtube', 'raja-studio-print')
  AND thumbnail_url IS NULL;

-- Public storage buckets for project media (no-op if they already exist)
INSERT INTO storage.buckets (id, name, public) VALUES
  ('project-images', 'project-images', true),
  ('project-documents', 'project-documents', true),
  ('project-videos', 'project-videos', true)
ON CONFLICT (id) DO NOTHING;
