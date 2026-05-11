import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { fallbackProjects } from "@/lib/projects";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { ProjectInput } from "@/types/project";

type Params = {
  params: Promise<{ identifier: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { identifier } = await params;

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", identifier)
      .single();

    if (error || !data) {
      const fallback = fallbackProjects.find((project) => project.slug === identifier);
      return fallback
        ? NextResponse.json(fallback)
        : NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    const fallback = fallbackProjects.find((project) => project.slug === identifier);
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const { identifier } = await params;
  const body = (await request.json()) as ProjectInput;
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .update({
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
  const { error } = await supabase.from("projects").delete().eq("id", identifier);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
