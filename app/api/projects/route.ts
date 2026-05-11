import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { fallbackHeaders } from "@/lib/api-errors";
import { fallbackProjects } from "@/lib/projects";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { ProjectInput } from "@/types/project";

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(fallbackProjects, { headers: fallbackHeaders(error) });
    }

    return NextResponse.json(data?.length ? data : fallbackProjects);
  } catch (error) {
    return NextResponse.json(fallbackProjects, { headers: fallbackHeaders(error) });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const body = (await request.json()) as ProjectInput;

  if (!body.title || !body.slug || !body.description) {
    return NextResponse.json(
      { error: "Title, slug, and description are required." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: body.title,
      slug: body.slug,
      description: body.description,
      long_description: body.long_description || null,
      image_url: body.image_url || null,
      screenshot_urls: body.screenshot_urls || [],
      github_url: body.github_url || null,
      live_demo_url: body.live_demo_url || null,
      tech_stack: body.tech_stack || [],
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
