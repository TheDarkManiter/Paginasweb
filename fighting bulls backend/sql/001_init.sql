-- Minimal schema for local dev
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text,
  phone text,
  interest text,
  age_range text,
  email text,
  preferred_time text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads (email);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  program text NOT NULL,
  experience_level text NOT NULL,
  preferred_schedule text NOT NULL,
  source text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments (email);
