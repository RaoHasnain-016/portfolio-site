import type { Project } from "@/types/project";

export const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    title: "DevConnect",
    slug: "devconnect",
    description:
      "Developer collaboration platform with profiles, dashboards, JWT authentication, RBAC, secure middleware, and scalable MERN architecture.",
    long_description:
      "DevConnect is built around developer identity, collaboration, and secure product workflows. It includes developer profiles, authenticated dashboards, role-based access control, protected middleware, and backend structure designed for growth.",
    image_url:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "https://devconnect.codes",
    tech_stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "RBAC"],
    created_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-2",
    title: "Career Compass AI",
    slug: "career-compass-ai",
    description:
      "AI-powered career SaaS using MERN, TypeScript, OpenAI API, prompt engineering, and multi-step AI agent workflows.",
    long_description:
      "Career Compass AI helps users understand career direction through guided assessments, AI-generated insights, and learning roadmaps. The system combines full-stack product flows with LLM prompts and agent-style multi-step reasoning.",
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["MERN", "TypeScript", "OpenAI API", "AI Agents", "Prompt Engineering"],
    created_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-3",
    title: "CropMax",
    slug: "cropmax",
    description:
      "Agriculture technology website with SEO-focused mobile UI, CMS admin dashboard, product management, and inquiry workflows.",
    long_description:
      "CropMax presents agricultural products with a fast, responsive marketing experience and a practical admin workflow for managing products, content, and customer inquiries.",
    image_url:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["React.js", "Tailwind CSS", "CMS", "SEO", "Responsive UI"],
    created_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-4",
    title: "Construction Company Business Software",
    slug: "construction-company-business-software",
    description:
      "Business management system for project tracking, workforce management, invoices, billing, analytics, and role-based dashboards.",
    long_description:
      "A business software platform designed for construction operations. It organizes project progress, workforce activity, invoices, billing, analytics, and access-controlled dashboards for different business roles.",
    image_url:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#contact",
    tech_stack: ["MERN", "RBAC", "Analytics", "Invoices", "Dashboards"],
    created_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-5",
    title: "Portfolio Admin App",
    slug: "portfolio-admin-app",
    description:
      "Personal portfolio application with project management, blog publishing, profile editing, image upload workflows, and a responsive public portfolio.",
    long_description:
      "A full-stack portfolio app built to manage professional content from one place. It includes authenticated admin screens, profile updates, project CRUD, blog publishing, image uploads, contact handling, and a polished responsive frontend.",
    image_url:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: null,
    live_demo_url: "#home",
    tech_stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    created_at: new Date("2026-01-05T00:00:00.000Z").toISOString(),
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
