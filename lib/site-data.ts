import { defaultProfile } from "@/lib/profile";
import { fallbackProjects } from "@/lib/projects";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { PortfolioProfile } from "@/types/profile";
import type { Project } from "@/types/project";

function mergeProjects(projects: Project[]) {
  const seen = new Set<string>();
  return [...fallbackProjects, ...projects].filter((project) => {
    const key = project.slug || project.id;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function resolveProfileImage(url: string | null | undefined) {
  if (!url || url === "/images/profile.png") {
    return defaultProfile.profile_image_url;
  }

  if (url.startsWith("http")) {
    return url;
  }

  return url;
}

export function normalizeProfile(profile: PortfolioProfile): PortfolioProfile {
  return {
    ...defaultProfile,
    ...profile,
    email: profile.email || defaultProfile.email,
    social_links: profile.social_links?.length ? profile.social_links : defaultProfile.social_links,
    skills: profile.skills?.length ? profile.skills : defaultProfile.skills,
    marquee_items: profile.marquee_items?.length ? profile.marquee_items : defaultProfile.marquee_items,
    profile_image_url: resolveProfileImage(profile.profile_image_url),
  };
}

export async function getSiteProfile(): Promise<PortfolioProfile> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("portfolio_profile").select("*").eq("id", "main").single();

    if (error || !data) {
      return defaultProfile;
    }

    return normalizeProfile(data as PortfolioProfile);
  } catch {
    return defaultProfile;
  }
}

export async function getSiteProjects(): Promise<Project[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return fallbackProjects;
    }

    return mergeProjects(data as Project[]);
  } catch {
    return fallbackProjects;
  }
}
