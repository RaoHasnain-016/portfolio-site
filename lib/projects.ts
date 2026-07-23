import type { Project } from "@/types/project";

export const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    title: "Career Compass AI",
    slug: "career-compass-ai",
    description:
      "AI-powered web platform with a personalized recommendation engine, FastAPI backend, PostgreSQL, Firebase Auth, and GPT-powered chatbot.",
    long_description:
      "Final Year Project built as an AI-powered career guidance platform. Features a personalized recommendation engine backed by PostgreSQL, a FastAPI backend with Firebase Authentication, and an integrated GPT-powered chatbot for real-time career guidance.",
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["React", "FastAPI", "PostgreSQL", "Firebase Auth", "OpenAI API"],
    created_at: new Date("2026-01-06T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-2",
    title: "Agentic QA",
    slug: "agentic-qa",
    description:
      "In-house agentic QA product that automatically tests and evaluates chatbot responses for accuracy, relevance, and consistency.",
    long_description:
      "Built an AI chatbot accuracy and quality analysis tool with automated evaluation pipelines. Django/Python backend runs automated test cases while a React dashboard visualizes performance metrics for LLM response quality.",
    image_url:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["Python", "Django", "React", "OpenAI API", "LLM Evaluation"],
    created_at: new Date("2026-01-05T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-3",
    title: "DevConnect",
    slug: "devconnect",
    description:
      "Developer collaboration web platform solo-built from system architecture to deployment with RBAC, JWT auth, and React dashboards.",
    long_description:
      "DevConnect is a developer collaboration platform focused on identity, trust, and clean product workflows. Solo-built with TypeScript backend, Role-Based Access Control, JWT authentication, and responsive React dashboards.",
    image_url:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: "https://github.com/RaoHasnain-016",
    live_demo_url: "https://devconnect.codes",
    tech_stack: ["React", "Node.js", "MongoDB", "TypeScript", "JWT Auth", "RBAC"],
    created_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-4",
    title: "Survey Online",
    slug: "survey-online",
    description:
      "Full-stack survey web platform enabling users to create, distribute, and analyze surveys in real time.",
    long_description:
      "Built with Next.js and Supabase, Survey Online lets users create surveys, share them instantly, and analyze responses in real time with PostgreSQL-backed data storage and TypeScript throughout.",
    image_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    created_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-5",
    title: "vSpark",
    slug: "vspark",
    description:
      "University event management web platform for COMSATS with registration, announcements, and admin panel.",
    long_description:
      "Team project building a full-stack event management platform for COMSATS University. Covers event registration, announcements, and an admin panel for organizers.",
    image_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1505373877848-8d6723d52c02?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    created_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-6",
    title: "CropMax",
    slug: "cropmax",
    description:
      "SEO-optimized agriculture web platform for an industry client with Supabase/PostgreSQL data management and crop analytics.",
    long_description:
      "Delivered for a real industry client, CropMax presents agricultural products with SEO-focused mobile UI, Supabase/PostgreSQL-based data management, crop analytics, and an admin dashboard.",
    image_url:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["React", "Node.js", "Supabase", "PostgreSQL", "Admin Dashboard"],
    created_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-7",
    title: "Construction Management System",
    slug: "construction-management-system",
    description:
      "Full business management web system covering project tracking, workforce management, billing, and RBAC-secured dashboards.",
    long_description:
      "Client project building a construction business management system with project tracking, workforce management, invoices, billing, analytics, and role-based dashboards secured with RBAC.",
    image_url:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["MERN Stack", "TypeScript", "PostgreSQL", "RBAC", "Billing"],
    created_at: new Date("2025-12-31T00:00:00.000Z").toISOString(),
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
