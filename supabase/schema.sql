-- Run this in the Supabase SQL editor (Project > SQL Editor > New query) once,
-- right after creating the project. See setup.md for the full walkthrough.

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Row Level Security: the anon key used by the website can INSERT but not
-- read back other people's submissions. You'll read the data yourself from
-- the Supabase Table Editor (or Studio SQL editor) using your account, which
-- bypasses RLS.

alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "Allow public insert on contact_submissions"
  on contact_submissions for insert
  to anon
  with check (true);

create policy "Allow public insert on newsletter_subscribers"
  on newsletter_subscribers for insert
  to anon
  with check (true);

-- No select/update/delete policies are created for the anon role on purpose —
-- that means the public site can submit forms but can't read or edit them back.
