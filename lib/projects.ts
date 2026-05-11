import type { Project } from "@/types/project";

export const fallbackProjects: Project[] = [
  {
    id: "fallback-1",
    title: "Executive Brand Portfolio",
    slug: "executive-brand-portfolio",
    description:
      "A premium portfolio experience built for personal branding, trust, and stronger first impressions.",
    long_description:
      "A refined portfolio system with clear service positioning, polished case-study presentation, and a visual structure designed to help clients understand value quickly.",
    image_url:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: "https://github.com",
    live_demo_url: "#contact",
    tech_stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    created_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-2",
    title: "Luxury Business Website",
    slug: "luxury-business-website",
    description:
      "A polished corporate site crafted to highlight services, team, and brand authority.",
    long_description:
      "A corporate web presence focused on credibility, service clarity, fast browsing, and layouts that make the business feel established from the first screen.",
    image_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: "https://github.com",
    live_demo_url: "#contact",
    tech_stack: ["React", "Tailwind", "SEO", "Content Strategy"],
    created_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-3",
    title: "Operations Dashboard",
    slug: "operations-dashboard",
    description:
      "A modern dashboard that improves workflow, reporting, and operational visibility for managers.",
    long_description:
      "A workflow-oriented dashboard concept built around clean data views, simple navigation, and faster decision-making for operational teams.",
    image_url:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    screenshot_urls: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    ],
    github_url: "https://github.com",
    live_demo_url: "#contact",
    tech_stack: ["Next.js", "Supabase", "Charts", "API"],
    created_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
