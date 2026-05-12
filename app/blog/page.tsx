import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { fallbackBlogPosts } from "@/lib/blogs";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog | Muhammad Hasnain",
  description: "Thoughts on full-stack development, portfolio design, admin systems, and polished web experiences.",
};

async function getPosts() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error || !data?.length) {
      return fallbackBlogPosts;
    }

    const seen = new Set<string>();
    return [...fallbackBlogPosts, ...(data as BlogPost[])].filter((post) => {
      if (seen.has(post.slug)) {
        return false;
      }
      seen.add(post.slug);
      return true;
    });
  } catch {
    return fallbackBlogPosts;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#F6F1EA] text-[#111111]">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 lg:pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#666666] transition hover:text-[#D6453D]">
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
        <div className="mt-20 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D6453D]">Blog</p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.92] tracking-[0.03em] sm:text-7xl">
            Notes on design, code, and delivery.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#666666]">
            Practical writing about premium interfaces, full-stack architecture, content systems, and building portfolio websites that feel credible.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-xl border border-black/[0.08] bg-black/[0.035] shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="aspect-[1.3] overflow-hidden bg-[#EFE7DD]">
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  ) : null}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-black tracking-[0.02em]">{post.title}</h2>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#D6453D]" />
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#666666]">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-black/[0.08] bg-[#F6F1EA] px-3 py-1.5 text-xs font-semibold text-[#666666]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
