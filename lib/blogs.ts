import type { BlogPost } from "@/types/blog";

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "fallback-blog-1",
    title: "DevConnect: Building a Secure Developer Collaboration Platform",
    slug: "devconnect-platform-architecture",
    excerpt:
      "How DevConnect brings developer profiles, dashboards, JWT authentication, RBAC, and secure middleware into one MERN platform.",
    content:
      "DevConnect is a developer collaboration platform focused on identity, trust, and clean product workflows. The core product includes developer profiles, authenticated dashboards, protected routes, and role-based permissions.\n\nThe backend is structured around secure REST APIs, JWT authentication, middleware validation, and MongoDB data models that can grow with the platform. On the frontend, React components keep the interface modular and easy to extend.\n\nThe main engineering goal is simple: developers should be able to manage their profile and collaborate without the product feeling heavy or confusing.",
    cover_image_url:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    tags: ["DevConnect", "MERN", "Authentication"],
    published: true,
    published_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-2",
    title: "Career Compass AI: Turning Assessments Into Roadmaps",
    slug: "career-compass-ai-roadmaps",
    excerpt:
      "A look at the AI SaaS workflow behind assessments, prompt design, OpenAI integration, and personalized learning roadmaps.",
    content:
      "Career Compass AI combines a full-stack SaaS flow with AI-assisted career guidance. Users move through assessment steps, the product collects structured signals, and the AI layer turns those signals into practical direction.\n\nThe system uses TypeScript, MERN architecture, OpenAI API calls, prompt engineering, and multi-step AI workflows. The important part is not only generating text, but shaping the output so users receive clear next actions.\n\nThis project strengthened my work around AI agents, data flow design, and building useful AI features inside real web applications.",
    cover_image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    tags: ["Career Compass AI", "OpenAI", "AI SaaS"],
    published: true,
    published_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-03T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-3",
    title: "CropMax: Designing an Agriculture Website With Admin Control",
    slug: "cropmax-agriculture-cms",
    excerpt:
      "How CropMax balances SEO, mobile-first UI, product management, and inquiry handling for an agriculture technology brand.",
    content:
      "CropMax needed to feel clear on mobile, trustworthy for agriculture customers, and easy to update from the admin side. The project centered on product presentation, search-friendly pages, and inquiry workflows.\n\nA CMS-style dashboard makes it easier to manage products and content without touching the code every time. The frontend focuses on fast scanning, clean product sections, and responsive behavior across devices.\n\nThe result is a practical business website that supports marketing and operations at the same time.",
    cover_image_url:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1400&q=80",
    tags: ["CropMax", "CMS", "SEO"],
    published: true,
    published_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-02T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-4",
    title: "Construction Business Software: Dashboards for Daily Operations",
    slug: "construction-business-software-dashboards",
    excerpt:
      "How a construction management system organizes projects, workforce activity, invoices, billing, analytics, and role access.",
    content:
      "Construction operations need software that keeps daily work visible. This business system focuses on project tracking, workforce management, invoices, billing, analytics, and dashboards for different roles.\n\nThe product structure uses RBAC so each user sees the right tools and data. Managers can review progress and financial activity, while operational users can focus on the workflows assigned to them.\n\nThis project is a strong example of full-stack business software where data modeling, permissions, and interface clarity matter as much as visual polish.",
    cover_image_url:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    tags: ["Construction Software", "RBAC", "Dashboards"],
    published: true,
    published_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "fallback-blog-5",
    title: "Portfolio Admin App: Managing Projects, Blogs, and Profile Content",
    slug: "portfolio-admin-app-content-system",
    excerpt:
      "How the portfolio app works as a full-stack content system with admin controls, project CRUD, blog publishing, and responsive presentation.",
    content:
      "The portfolio admin app is built to make professional content easy to manage. Instead of editing code for every update, the admin screens handle profile content, project records, blog posts, images, and publishing workflows.\n\nThe public portfolio focuses on responsive presentation, animated skills, project proof, and clear contact paths. The admin side supports the content workflow behind that public experience.\n\nThis project connects the same skills shown in my CV: TypeScript, React, API design, database-backed content, authentication-aware workflows, and polished frontend delivery.",
    cover_image_url:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=80",
    tags: ["Portfolio App", "Next.js", "Content System"],
    published: true,
    published_at: new Date("2025-12-31T00:00:00.000Z").toISOString(),
    created_at: new Date("2025-12-31T00:00:00.000Z").toISOString(),
    updated_at: new Date("2025-12-31T00:00:00.000Z").toISOString(),
  },
];
