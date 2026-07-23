import type { BlogPost } from "@/types/blog";

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "fallback-blog-1",
    title: "Career Compass AI: FastAPI, PostgreSQL & GPT Career Guidance",
    slug: "career-compass-ai-roadmaps",
    excerpt:
      "How Career Compass AI combines a recommendation engine, FastAPI backend, Firebase Auth, and GPT-powered chatbot for real-time career guidance.",
    content:
      "Career Compass AI is my Final Year Project — an AI-powered web platform built with React, FastAPI, PostgreSQL, Firebase Authentication, and OpenAI API integration.\n\nThe recommendation engine stores structured career signals in PostgreSQL and surfaces personalized guidance. The FastAPI backend handles auth flows, data validation, and chatbot endpoints.\n\nThe GPT-powered chatbot turns assessment results into practical next steps, making the platform useful beyond generic AI text generation.",
    cover_image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    tags: ["Career Compass AI", "FastAPI", "OpenAI"],
    published: true,
    published_at: new Date("2026-01-06T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-06T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-06T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-2",
    title: "Agentic QA: Evaluating Chatbot Accuracy with AI/ML Pipelines",
    slug: "agentic-qa-chatbot-evaluation",
    excerpt:
      "Building an in-house agentic QA product that automatically tests chatbot responses for accuracy, relevance, and consistency.",
    content:
      "Agentic QA is an AI chatbot accuracy and quality analysis tool I built to solve a real problem: how do you know your chatbot is giving reliable answers?\n\nThe Django/Python backend runs automated test cases and evaluation pipelines. The React dashboard visualizes performance metrics including accuracy, relevance, and consistency scores.\n\nThis project strengthened my work around LLM evaluation, prompt engineering, and building practical AI quality tooling.",
    cover_image_url:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
    tags: ["Agentic QA", "Django", "LLM Evaluation"],
    published: true,
    published_at: new Date("2026-01-05T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-05T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-05T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-3",
    title: "DevConnect: Building a Secure Developer Collaboration Platform",
    slug: "devconnect-platform-architecture",
    excerpt:
      "How DevConnect brings developer profiles, dashboards, JWT authentication, RBAC, and secure middleware into one MERN platform.",
    content:
      "DevConnect is a developer collaboration platform I founded and solo-built from system architecture to deployment.\n\nThe TypeScript backend implements JWT authentication, RBAC, and protected middleware. React dashboards keep the interface modular and responsive.\n\nThe engineering goal: developers should manage their profile and collaborate without the product feeling heavy or confusing.",
    cover_image_url:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    tags: ["DevConnect", "MERN", "Authentication"],
    published: true,
    published_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-4",
    title: "Survey Online: Real-Time Surveys with Next.js and Supabase",
    slug: "survey-online-platform",
    excerpt:
      "Building a full-stack survey platform with Next.js, Supabase, and PostgreSQL for real-time creation, distribution, and analysis.",
    content:
      "Survey Online enables users to create, distribute, and analyze surveys in real time.\n\nBuilt with Next.js and Supabase, the platform uses PostgreSQL for structured response storage and TypeScript throughout for type-safe development.\n\nThe focus was on fast survey creation flows and clear analytics for survey owners.",
    cover_image_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    tags: ["Survey Online", "Next.js", "Supabase"],
    published: true,
    published_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-5",
    title: "CropMax: Designing an Agriculture Website With Admin Control",
    slug: "cropmax-agriculture-cms",
    excerpt:
      "How CropMax balances SEO, mobile-first UI, product management, and inquiry handling for an agriculture technology brand.",
    content:
      "CropMax was delivered for a real industry client — an SEO-optimized agriculture web platform with Supabase/PostgreSQL data management and crop analytics.\n\nThe admin dashboard makes product and content updates practical without touching code. The frontend focuses on fast scanning, clean product sections, and responsive behavior across devices.",
    cover_image_url:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1400&q=80",
    tags: ["CropMax", "Supabase", "SEO"],
    published: true,
    published_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-6",
    title: "Construction Business Software: Dashboards for Daily Operations",
    slug: "construction-business-software-dashboards",
    excerpt:
      "How a construction management system organizes projects, workforce activity, invoices, billing, analytics, and role access.",
    content:
      "The Construction Management System covers project tracking, workforce management, invoices, billing, analytics, and RBAC-secured dashboards for different business roles.\n\nBuilt with the MERN Stack, TypeScript, and PostgreSQL, the product keeps daily construction operations visible and access-controlled.",
    cover_image_url:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    tags: ["Construction Software", "RBAC", "MERN"],
    published: true,
    published_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
];
