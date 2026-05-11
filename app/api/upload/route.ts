import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const auth = await requireAdminUser(request);

  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const bucket = process.env.SUPABASE_PROJECT_IMAGES_BUCKET || "project-images";
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${auth.user.id}/${crypto.randomUUID()}.${extension}`;
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
