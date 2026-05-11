import type { BlogPost } from "@/types/blog";

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "fallback-blog-1",
    title: "How I Build Premium Developer Portfolios",
    slug: "how-i-build-premium-developer-portfolios",
    excerpt:
      "A practical look at structure, spacing, motion, admin workflows, and content systems behind a polished personal brand website.",
    content:
      "A premium portfolio is not only a beautiful first screen. It needs a clear story, strong project proof, fast interactions, and a simple way to keep the content fresh.\n\nI usually start with positioning, then design the homepage hierarchy, then connect projects, blog posts, images, and profile content to an admin workflow.\n\nThe goal is simple: visitors should understand who you are, what you build, and why they should trust you within a few seconds.",
    cover_image_url:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    tags: ["Portfolio", "Next.js", "Design"],
    published: true,
    published_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
    created_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
    updated_at: new Date("2026-01-04T00:00:00.000Z").toISOString(),
  },
];
