-- ============================================
-- ORACLE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. TODOS TABLE
CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BRIEFINGS TABLE (stores daily briefing snapshots)
CREATE TABLE IF NOT EXISTS briefings (
  id BIGSERIAL PRIMARY KEY,
  generated_at TIMESTAMPTZ NOT NULL,
  fetch_time_ms INTEGER,
  jobs JSONB DEFAULT '[]',
  scholarships JSONB DEFAULT '[]',
  intel JSONB DEFAULT '[]',
  video JSONB,
  book JSONB,
  rainmaker JSONB,
  night_school JSONB,
  is_monday BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. NOTES TABLE (daily learnings, reflections, job logs)
CREATE TABLE IF NOT EXISTS notes (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_briefings_generated_at ON briefings(generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_category ON notes(category);
CREATE INDEX IF NOT EXISTS idx_todos_done ON todos(done);

-- Enable Row Level Security (open access — password gate is client-side)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Allow all operations (password protection is at the app level)
CREATE POLICY "Allow all on todos" ON todos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on briefings" ON briefings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on notes" ON notes FOR ALL USING (true) WITH CHECK (true);
