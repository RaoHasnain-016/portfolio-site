create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  long_description text,
  image_url text,
  screenshot_urls text[] not null default '{}',
  github_url text,
  live_demo_url text,
  tech_stack text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.projects
add column if not exists screenshot_urls text[] not null default '{}';

create table if not exists public.portfolio_profile (
  id text primary key default 'main',
  first_name text not null default 'Muhammad',
  last_name text not null default 'Hasnain',
  eyebrow text not null default 'Available for selected builds',
  roles text[] not null default array['Full Stack Developer', 'Next.js Specialist', 'UI Experience Builder'],
  hero_description text not null default 'I design and build premium full-stack web experiences with calm layouts, elegant motion, authenticated dashboards, and clean content workflows.',
  about_heading text not null default 'Building interfaces that feel precise, calm, and credible.',
  about_body text not null default 'My work combines product structure, engineering discipline, and visual restraint. I care about the details that make a portfolio feel expensive: measured spacing, fast feedback, useful admin flows, sharp typography, and motion that supports the story.',
  profile_image_url text not null default '/images/profile.png',
  email text not null default 'you@example.com',
  social_links text[] not null default array['LinkedIn', 'GitHub', 'Email'],
  skills text[] not null default '{}',
  marquee_items text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.portfolio_profile enable row level security;

drop policy if exists "Portfolio profile is publicly readable"
on public.portfolio_profile;

create policy "Portfolio profile is publicly readable"
on public.portfolio_profile
for select
using (true);

drop policy if exists "Authenticated users can update portfolio profile"
on public.portfolio_profile;

create policy "Authenticated users can update portfolio profile"
on public.portfolio_profile
for all
to authenticated
using (true)
with check (true);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  tags text[] not null default '{}',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

drop policy if exists "Published blog posts are publicly readable"
on public.blog_posts;

create policy "Published blog posts are publicly readable"
on public.blog_posts
for select
using (published = true);

drop policy if exists "Authenticated users can manage blog posts"
on public.blog_posts;

create policy "Authenticated users can manage blog posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);

alter table public.projects enable row level security;

drop policy if exists "Projects are publicly readable"
on public.projects;

create policy "Projects are publicly readable"
on public.projects
for select
using (true);

drop policy if exists "Authenticated users can insert projects"
on public.projects;

create policy "Authenticated users can insert projects"
on public.projects
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update projects"
on public.projects;

create policy "Authenticated users can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete projects"
on public.projects;

create policy "Authenticated users can delete projects"
on public.projects
for delete
to authenticated
using (true);

insert into public.projects (
  title,
  slug,
  description,
  long_description,
  image_url,
  github_url,
  live_demo_url,
  tech_stack
) values
(
  'Executive Brand Portfolio',
  'executive-brand-portfolio',
  'A premium portfolio experience built for personal branding, trust, and stronger first impressions.',
  'A refined portfolio system with clear service positioning, polished case-study presentation, and a visual structure designed to help clients understand value quickly.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'https://github.com',
  '#contact',
  array['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion']
) on conflict (slug) do nothing;

insert into public.portfolio_profile (
  id,
  first_name,
  last_name,
  eyebrow,
  roles,
  hero_description,
  about_heading,
  about_body,
  profile_image_url,
  email,
  social_links,
  skills,
  marquee_items
) values (
  'main',
  'Muhammad',
  'Hasnain',
  'Available for selected builds',
  array['Full Stack Developer', 'Next.js Specialist', 'UI Experience Builder'],
  'I design and build premium full-stack web experiences with calm layouts, elegant motion, authenticated dashboards, and clean content workflows.',
  'Building interfaces that feel precise, calm, and credible.',
  'My work combines product structure, engineering discipline, and visual restraint. I care about the details that make a portfolio feel expensive: measured spacing, fast feedback, useful admin flows, sharp typography, and motion that supports the story.',
  '/images/profile.png',
  'you@example.com',
  array['LinkedIn', 'GitHub', 'Email'],
  array['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'API Routes', 'Server Actions', 'Auth', 'Storage', 'Responsive UI'],
  array['Full Stack Developer', 'Next.js Apps', 'React Interfaces', 'TypeScript Code', 'Supabase Auth', 'Database Projects', 'Admin Dashboards', 'Project CRUD', 'Image Uploads', 'API Routes', 'Server Actions', 'Framer Motion', 'Tailwind CSS', 'Responsive UI', 'Contact Forms', 'Open To Work']
) on conflict (id) do nothing;

insert into public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  tags,
  published,
  published_at
) values (
  'How I Build Premium Developer Portfolios',
  'how-i-build-premium-developer-portfolios',
  'A practical look at structure, spacing, motion, admin workflows, and content systems behind a polished personal brand website.',
  'A premium portfolio is not only a beautiful first screen. It needs a clear story, strong project proof, fast interactions, and a simple way to keep the content fresh.

I usually start with positioning, then design the homepage hierarchy, then connect projects, blog posts, images, and profile content to an admin workflow.

The goal is simple: visitors should understand who you are, what you build, and why they should trust you within a few seconds.',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
  array['Portfolio', 'Next.js', 'Design'],
  true,
  now()
) on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "Project images are publicly readable"
on storage.objects;

create policy "Project images are publicly readable"
on storage.objects
for select
using (bucket_id = 'project-images');

drop policy if exists "Authenticated users can upload project images"
on storage.objects;

create policy "Authenticated users can upload project images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can update project images"
on storage.objects;

create policy "Authenticated users can update project images"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-images')
with check (bucket_id = 'project-images');

drop policy if exists "Authenticated users can delete project images"
on storage.objects;

create policy "Authenticated users can delete project images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-images');
