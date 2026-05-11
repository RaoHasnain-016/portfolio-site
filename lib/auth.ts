import { NextRequest } from "next/server";
import { getSupabaseAuthClient } from "@/lib/supabase";

export async function requireAdminUser(request: NextRequest) {
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return { user: null, error: "Missing bearer token" };
  }

  const supabase = getSupabaseAuthClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { user: null, error: "Invalid or expired admin session" };
  }

  const allowedEmails = process.env.ADMIN_EMAILS?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails?.length) {
    const email = data.user.email?.toLowerCase();
    if (!email || !allowedEmails.includes(email)) {
      return { user: null, error: "User is not allowed to manage this portfolio" };
    }
  }

  return { user: data.user, error: null };
}
