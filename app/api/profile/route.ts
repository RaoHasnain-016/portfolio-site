import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { fallbackHeaders } from "@/lib/api-errors";
import { defaultProfile } from "@/lib/profile";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { PortfolioProfileInput } from "@/types/profile";

export async function GET() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("portfolio_profile")
      .select("*")
      .eq("id", "main")
      .single();

    if (error || !data) {
      return NextResponse.json(defaultProfile, { headers: fallbackHeaders(error) });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(defaultProfile, { headers: fallbackHeaders(error) });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const body = (await request.json()) as PortfolioProfileInput;

  if (!body.first_name || !body.last_name || !body.about_heading || !body.about_body) {
    return NextResponse.json(
      { error: "Name, about heading, and about body are required." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("portfolio_profile")
    .upsert({
      id: "main",
      first_name: body.first_name,
      last_name: body.last_name,
      eyebrow: body.eyebrow,
      roles: body.roles || [],
      hero_description: body.hero_description,
      about_heading: body.about_heading,
      about_body: body.about_body,
      profile_image_url: body.profile_image_url || "/images/profile.png",
      email: body.email,
      social_links: body.social_links || [],
      skills: body.skills || [],
      marquee_items: body.marquee_items || [],
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
