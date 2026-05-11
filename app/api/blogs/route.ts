import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { fallbackHeaders } from "@/lib/api-errors";
import { fallbackBlogPosts } from "@/lib/blogs";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { BlogPostInput } from "@/types/blog";

export async function GET(request: NextRequest) {
  const includeDrafts = request.nextUrl.searchParams.get("drafts") === "true";

  if (includeDrafts) {
    const auth = await requireAdminUser(request);
    if (!auth.user) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }
  }

  try {
    const supabase = getSupabaseAdminClient();
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (!includeDrafts) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(includeDrafts ? [] : fallbackBlogPosts, { headers: fallbackHeaders(error) });
    }

    return NextResponse.json(data?.length ? data : includeDrafts ? [] : fallbackBlogPosts);
  } catch (error) {
    return NextResponse.json(includeDrafts ? [] : fallbackBlogPosts, { headers: fallbackHeaders(error) });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const body = (await request.json()) as BlogPostInput;

  if (!body.title || !body.slug || !body.excerpt || !body.content) {
    return NextResponse.json(
      { error: "Title, slug, excerpt, and content are required." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
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
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
