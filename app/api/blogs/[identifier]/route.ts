import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { fallbackBlogPosts } from "@/lib/blogs";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { BlogPostInput } from "@/types/blog";

type Params = {
  params: Promise<{ identifier: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { identifier } = await params;

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", identifier)
      .eq("published", true)
      .single();

    if (error || !data) {
      const fallback = fallbackBlogPosts.find((post) => post.slug === identifier);
      return fallback
        ? NextResponse.json(fallback)
        : NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    const fallback = fallbackBlogPosts.find((post) => post.slug === identifier);
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const { identifier } = await params;
  const body = (await request.json()) as BlogPostInput;
  const now = new Date().toISOString();
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      cover_image_url: body.cover_image_url || null,
      tags: body.tags || [],
      published: body.published,
      published_at: body.published ? body.published_at || now : null,
      updated_at: now,
    })
    .eq("id", identifier)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const { identifier } = await params;
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", identifier);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
