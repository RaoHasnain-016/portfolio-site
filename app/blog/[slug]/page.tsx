import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fallbackBlogPosts } from "@/lib/blogs";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return fallbackBlogPosts.find((post) => post.slug === slug) || null;
    }

    return data as BlogPost;
  } catch {
    return fallbackBlogPosts.find((post) => post.slug === slug) || null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Blog Post | Muhammad Hasnain" };
  }

  return {
    title: `${post.title} | Muhammad Hasnain`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F6F1EA] text-[#111111]">
      <article className="mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-6 lg:pb-28">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#666666] transition hover:text-[#D6453D]">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
        <header className="mt-16">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-black/[0.08] bg-black/[0.035] px-3 py-1.5 text-xs font-semibold text-[#666666]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-[0.03em] sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-7 text-lg leading-8 text-[#666666]">{post.excerpt}</p>
        </header>

        {post.cover_image_url ? (
          <div className="mt-12 overflow-hidden rounded-xl border border-black/[0.08] bg-[#EFE7DD] shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} className="max-h-[34rem] w-full object-cover" />
          </div>
        ) : null}

        <div className="mt-12 space-y-7 text-lg leading-9 text-[#333333]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
