# Developer Portfolio

Modern animated developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Supabase Auth/Database/Storage, API routes, and a server-action contact form.

## Features

- Fixed responsive navigation with active section state
- Animated hero, section reveals, progress bars, and project cards
- Supabase-backed projects grid
- Project image zoom modal with backdrop blur, ESC, and close button support
- Contact form validation with a Resend-powered server action
- Floating portfolio chatbot powered by resume, profile, project, and contact context
- Protected `/admin` dashboard using Supabase Auth
- Admin CRUD for projects
- Supabase Storage image upload handler
- API routes for public reads and authenticated mutations

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_PROJECT_IMAGES_BUCKET=project-images
ADMIN_EMAILS=you@example.com

OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_TIMEOUT_MS=8000

RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

3. In Supabase SQL Editor, run:

```sql
-- Copy and run the full contents of supabase/schema.sql
```

The SQL creates these required database/storage resources:

- `public.projects`
- `public.portfolio_profile`
- `public.blog_posts`
- public storage bucket `project-images`

If the admin dashboard shows `Could not find the table 'public.portfolio_profile' in the schema cache`, the SQL has not been run for the Supabase project currently configured in `.env.local`, or `.env.local` points to a different Supabase project than the one where the SQL was run.

4. Create an admin user in Supabase Auth with email/password. If `ADMIN_EMAILS` is set, the email must be included in that comma-separated list.

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` for the portfolio and `http://localhost:3000/admin` for the dashboard.

## API Routes

- `GET /api/projects`
- `GET /api/projects/[slug]`
- `POST /api/projects` with `Authorization: Bearer <supabase_access_token>`
- `PUT /api/projects/[id]` with `Authorization: Bearer <supabase_access_token>`
- `DELETE /api/projects/[id]` with `Authorization: Bearer <supabase_access_token>`
- `POST /api/upload` with `multipart/form-data` and `Authorization: Bearer <supabase_access_token>`
- `POST /api/contact`
- `POST /api/chatbot`
- `GET /api/profile`
- `PUT /api/profile` with `Authorization: Bearer <supabase_access_token>`
- `GET /api/blogs`
- `GET /api/blogs?drafts=true` with `Authorization: Bearer <supabase_access_token>`
- `POST /api/blogs` with `Authorization: Bearer <supabase_access_token>`
- `PUT /api/blogs/[id]` with `Authorization: Bearer <supabase_access_token>`
- `DELETE /api/blogs/[id]` with `Authorization: Bearer <supabase_access_token>`

## Deploy

Deploy to Vercel, add the same environment variables, run the Supabase SQL once, and create the admin auth user before using `/admin`.
