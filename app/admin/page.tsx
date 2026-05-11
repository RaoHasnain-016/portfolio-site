"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews Supabase and remote project images. */

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, LogOut, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import { getSupabaseBrowserClient, hasSupabasePublicEnv } from "@/lib/supabase";
import { defaultProfile } from "@/lib/profile";
import { slugify } from "@/lib/projects";
import type { Project, ProjectInput } from "@/types/project";
import type { PortfolioProfile, PortfolioProfileInput } from "@/types/profile";

type ProjectForm = ProjectInput & {
  id?: string;
};

const emptyProject: ProjectForm = {
  title: "",
  slug: "",
  description: "",
  long_description: "",
  image_url: "",
  screenshot_urls: [],
  github_url: "",
  live_demo_url: "",
  tech_stack: [],
};

const socialFields = ["LinkedIn", "GitHub", "TikTok", "Facebook", "Instagram"] as const;

function tagsToText(tags: string[]) {
  return tags.join(", ");
}

function textToTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function socialLinksToMap(links: string[]) {
  return links.reduce<Record<string, string>>((current, item) => {
    const [label, href = ""] = item.split("|").map((part) => part.trim());

    if (label) {
      current[label.toLowerCase()] = href;
    }

    return current;
  }, {});
}

function updateSocialLinks(currentValue: string, label: string, href: string) {
  const linkMap = socialLinksToMap(textToTags(currentValue));
  linkMap[label.toLowerCase()] = href.trim();

  return socialFields
    .map((field) => {
      const value = linkMap[field.toLowerCase()] || "";
      return value ? `${field}|${value}` : field;
    })
    .join(", ");
}

function getSocialLinkValue(currentValue: string, label: string) {
  return socialLinksToMap(textToTags(currentValue))[label.toLowerCase()] || "";
}

function imageWithVersion(src: string, version?: string) {
  if (!src || !version) {
    return src;
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${encodeURIComponent(version)}`;
}

function setupErrorMessage(message: string) {
  return `Supabase database setup missing: ${message}. Run supabase/schema.sql in the SQL Editor for the Supabase project used by .env.`;
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = useMemo(() => (hasSupabasePublicEnv() ? getSupabaseBrowserClient() : null), []);
  const envError = supabase ? "" : "Supabase environment variables are not configured.";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profileForm, setProfileForm] = useState<PortfolioProfile>(defaultProfile);
  const [form, setForm] = useState<ProjectForm>(emptyProject);
  const [tagText, setTagText] = useState("");
  const [screenshotText, setScreenshotText] = useState("");
  const [roleText, setRoleText] = useState(defaultProfile.roles.join(", "));
  const [skillText, setSkillText] = useState(defaultProfile.skills.join(", "));
  const [marqueeText, setMarqueeText] = useState(defaultProfile.marquee_items.join(", "));
  const [socialText, setSocialText] = useState(defaultProfile.social_links.join(", "));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(form.id);

  const loadProjects = useCallback(async () => {
    const response = await fetch("/api/projects", { cache: "no-store" });
    const setupError = response.headers.get("X-Portfolio-Setup-Error");
    const data = (await response.json()) as Project[];
    if (setupError) {
      setError(setupErrorMessage(setupError));
    }
    setProjects(data.filter((project) => !project.id.startsWith("fallback-")));
  }, []);

  const loadProfile = useCallback(async () => {
    const response = await fetch("/api/profile", { cache: "no-store" });
    const setupError = response.headers.get("X-Portfolio-Setup-Error");
    const data = (await response.json()) as PortfolioProfile;
    if (setupError) {
      setError(setupErrorMessage(setupError));
    }
    setProfileForm(data);
    setRoleText(tagsToText(data.roles || []));
    setSkillText(tagsToText(data.skills || []));
    setMarqueeText(tagsToText(data.marquee_items || []));
    setSocialText(tagsToText(data.social_links || []));
  }, []);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token || null;
      setAccessToken(token);
      if (token) {
        loadProjects();
        loadProfile();
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token || null);
      if (session?.access_token) {
        loadProjects();
        loadProfile();
      }
    });

    return () => data.subscription.unsubscribe();
  }, [loadProfile, loadProjects, supabase]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      return;
    }

    setLoading(true);
    setError("");
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    setAccessToken(data.session?.access_token || null);
    await loadProjects();
    await loadProfile();
  }

  async function handleLogout() {
    await supabase?.auth.signOut();
    setAccessToken(null);
    setProjects([]);
  }

  function updateForm(key: keyof ProjectForm, value: string | string[]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      slug: key === "title" && !current.id ? slugify(String(value)) : current.slug,
    }));
  }

  function updateProfile(key: keyof PortfolioProfile, value: string | string[]) {
    setProfileForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function buildProfilePayload(profile: PortfolioProfile): PortfolioProfileInput {
    return {
      first_name: profile.first_name.trim(),
      last_name: profile.last_name.trim(),
      eyebrow: profile.eyebrow.trim(),
      roles: textToTags(roleText),
      hero_description: profile.hero_description.trim(),
      about_heading: profile.about_heading.trim(),
      about_body: profile.about_body.trim(),
      profile_image_url: profile.profile_image_url.trim() || "/images/profile.png",
      email: profile.email.trim(),
      social_links: textToTags(socialText),
      skills: textToTags(skillText),
      marquee_items: textToTags(marqueeText),
    };
  }

  function resetForm() {
    setForm(emptyProject);
    setTagText("");
    setScreenshotText("");
  }

  async function uploadImage(file: File) {
    if (!accessToken) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    setError("");
    setStatus("Uploading image...");
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: data,
    });
    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      setError(result.error || "Image upload failed.");
      setStatus("");
      return;
    }

    updateForm("image_url", result.url);
    setStatus("Image uploaded.");
  }

  async function uploadProfileImage(file: File) {
    if (!accessToken) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    setError("");
    setStatus("Uploading profile image...");
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: data,
    });
    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      setError(result.error || "Profile image upload failed.");
      setStatus("");
      return;
    }

    const updatedProfile = {
      ...profileForm,
      profile_image_url: result.url,
    };

    setProfileForm(updatedProfile);
    setStatus("Saving profile image...");

    const saveResponse = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildProfilePayload(updatedProfile)),
    });
    const saveResult = (await saveResponse.json()) as PortfolioProfile | { error?: string };

    if (!saveResponse.ok) {
      setError("error" in saveResult && saveResult.error ? saveResult.error : "Profile image save failed.");
      setStatus("");
      return;
    }

    await loadProfile();
    setProfileForm(saveResult as PortfolioProfile);
    setStatus("Profile image updated.");
  }

  async function uploadScreenshot(file: File) {
    if (!accessToken) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    setStatus("Uploading screenshot...");
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: data,
    });
    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      setError(result.error || "Screenshot upload failed.");
      setStatus("");
      return;
    }

    setScreenshotText((current) => tagsToText([...textToTags(current), result.url as string]));
    setStatus("Screenshot uploaded.");
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) {
      return;
    }

    setLoading(true);
    setError("");
    setStatus("");

    const payload = buildProfilePayload(profileForm);

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as PortfolioProfile | { error?: string };
    setLoading(false);

    if (!response.ok) {
      setError("error" in result && result.error ? result.error : "Profile save failed.");
      return;
    }

    setStatus("Portfolio content updated.");
    await loadProfile();
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) {
      return;
    }

    setLoading(true);
    setError("");
    setStatus("");

    const payload: ProjectInput = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      description: form.description.trim(),
      long_description: form.long_description || null,
      image_url: form.image_url || null,
      screenshot_urls: textToTags(screenshotText),
      github_url: form.github_url || null,
      live_demo_url: form.live_demo_url || null,
      tech_stack: textToTags(tagText),
    };

    const response = await fetch(form.id ? `/api/projects/${form.id}` : "/api/projects", {
      method: form.id ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as Project | { error?: string };
    setLoading(false);

    if (!response.ok) {
      setError("error" in result && result.error ? result.error : "Project save failed.");
      return;
    }

    setStatus(form.id ? "Project updated." : "Project created.");
    resetForm();
    await loadProjects();
  }

  async function deleteProject(id: string) {
    if (!accessToken || !window.confirm("Delete this project?")) {
      return;
    }

    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error || "Project delete failed.");
      return;
    }

    setStatus("Project deleted.");
    await loadProjects();
  }

  function editProject(project: Project) {
    setForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      long_description: project.long_description || "",
      image_url: project.image_url || "",
      screenshot_urls: project.screenshot_urls || [],
      github_url: project.github_url || "",
      live_demo_url: project.live_demo_url || "",
      tech_stack: project.tech_stack || [],
    });
    setTagText(tagsToText(project.tech_stack || []));
    setScreenshotText(tagsToText(project.screenshot_urls || []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!accessToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F1EA] px-5 text-[#111111]">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-xl border border-black/[0.08] bg-black/[0.035] p-6 shadow-[0_30px_90px_rgba(17,17,17,0.10)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6453D]">Admin</p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.03em]">Portfolio Login</h1>
          <p className="mt-3 text-sm leading-6 text-[#666666]">
            Sign in with a Supabase Auth admin user. Add ADMIN_EMAILS to restrict access by email.
          </p>
          <div className="mt-6 grid gap-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
              className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 outline-none focus:border-[#D6453D]"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 outline-none focus:border-[#D6453D]"
            />
            {envError || error ? <p className="text-sm text-[#B83A33]">{envError || error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D6453D] disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Sign In
            </button>
          </div>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] text-[#111111]">
      <header className="border-b border-black/[0.08] bg-[#F6F1EA]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6453D]">Dashboard</p>
            <h1 className="text-2xl font-black uppercase tracking-[0.03em]">Manage Projects</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => router.push("/")} className="inline-flex items-center gap-2 rounded-md border border-black/[0.1] px-4 py-2 text-sm font-semibold hover:border-[#D6453D] hover:text-[#D6453D]">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </button>
            <button onClick={() => router.push("/admin/blog")} className="inline-flex items-center gap-2 rounded-md border border-black/[0.1] px-4 py-2 text-sm font-semibold hover:border-[#D6453D] hover:text-[#D6453D]">
              Blog Settings
            </button>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D6453D]">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-6">
        <form onSubmit={saveProfile} className="grid gap-5 rounded-xl border border-black/[0.08] bg-black/[0.035] p-5 shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D6453D]">Portfolio Content</p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-[0.03em]">Profile, About & Skills</h2>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D6453D] disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Content
            </button>
          </div>

          {error ? <p className="rounded-md bg-[#D6453D]/10 px-3 py-2 text-sm text-[#B83A33]">{error}</p> : null}
          {status ? <p className="rounded-md bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700">{status}</p> : null}

          <div className="grid gap-4 lg:grid-cols-[12rem_1fr_1fr]">
            <div className="grid gap-3">
              <div className="aspect-square overflow-hidden rounded-full border border-black/[0.08] bg-[#F6F1EA] p-2">
                <img src={imageWithVersion(profileForm.profile_image_url, profileForm.updated_at)} alt="Profile preview" className="h-full w-full rounded-full object-cover" />
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-black/[0.18] px-4 py-3 text-sm font-semibold text-[#666666] hover:border-[#D6453D] hover:text-[#D6453D]">
                <Upload className="h-4 w-4" />
                Upload Pic
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      uploadProfileImage(file);
                    }
                    event.currentTarget.value = "";
                  }}
                />
              </label>
            </div>

            <div className="grid gap-4">
              {[
                ["first_name", "First Name"],
                ["last_name", "Last Name"],
                ["eyebrow", "Hero Badge"],
                ["email", "Email"],
                ["profile_image_url", "Profile Image URL"],
              ].map(([key, label]) => (
                <label key={key} className="grid gap-2 text-sm font-medium text-[#666666]">
                  {label}
                  <input
                    value={String(profileForm[key as keyof PortfolioProfile] || "")}
                    onChange={(event) => updateProfile(key as keyof PortfolioProfile, event.target.value)}
                    className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
                  />
                </label>
              ))}
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[#666666]">
                Hero Description
                <textarea
                  value={profileForm.hero_description}
                  onChange={(event) => updateProfile("hero_description", event.target.value)}
                  rows={3}
                  className="resize-none rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[#666666]">
                About Heading
                <input
                  value={profileForm.about_heading}
                  onChange={(event) => updateProfile("about_heading", event.target.value)}
                  className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[#666666]">
                About Body
                <textarea
                  value={profileForm.about_body}
                  onChange={(event) => updateProfile("about_body", event.target.value)}
                  rows={4}
                  className="resize-none rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-[#666666]">
              Roles
              <input value={roleText} onChange={(event) => setRoleText(event.target.value)} className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#666666]">
              Skills
              <input value={skillText} onChange={(event) => setSkillText(event.target.value)} className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#666666]">
              Moving Strip Items
              <input value={marqueeText} onChange={(event) => setMarqueeText(event.target.value)} className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
            </label>
          </div>

          <div className="grid gap-4">
            <div>
              <p className="text-sm font-semibold text-[#111111]">Social Media Links</p>
              <p className="mt-1 text-xs leading-5 text-[#666666]">Add full profile URLs. These icons show in the hero section.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {socialFields.map((label) => (
                <label key={label} className="grid gap-2 text-sm font-medium text-[#666666]">
                  {label}
                  <input
                    type="url"
                    value={getSocialLinkValue(socialText, label)}
                    onChange={(event) => setSocialText((current) => updateSocialLinks(current, label, event.target.value))}
                    placeholder={`https://${label.toLowerCase()}.com/...`}
                    className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
                  />
                </label>
              ))}
            </div>
          </div>
        </form>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={saveProject} className="grid gap-4 rounded-xl border border-black/[0.08] bg-black/[0.035] p-5 shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">{isEditing ? "Edit Project" : "Add New Project"}</h2>
            {isEditing ? (
              <button type="button" onClick={resetForm} className="rounded-md border border-black/[0.1] px-3 py-2 text-sm hover:border-[#D6453D] hover:text-[#D6453D]">
                Cancel
              </button>
            ) : null}
          </div>

          {[
            ["title", "Title"],
            ["slug", "Slug"],
            ["github_url", "GitHub URL"],
            ["live_demo_url", "Live Demo URL"],
            ["image_url", "Image URL"],
          ].map(([key, label]) => (
            <label key={key} className="grid gap-2 text-sm font-medium text-[#666666]">
              {label}
              <input
                value={String(form[key as keyof ProjectForm] || "")}
                onChange={(event) => updateForm(key as keyof ProjectForm, event.target.value)}
                required={key === "title" || key === "slug"}
                className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
              />
            </label>
          ))}

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Description
            <textarea
              value={form.description}
              onChange={(event) => updateForm("description", event.target.value)}
              required
              rows={3}
              className="resize-none rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Long Description
            <textarea
              value={form.long_description || ""}
              onChange={(event) => updateForm("long_description", event.target.value)}
              rows={5}
              className="resize-none rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Tech Tags
            <input
              value={tagText}
              onChange={(event) => setTagText(event.target.value)}
              placeholder="Next.js, Supabase, Tailwind"
              className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Screenshot URLs
            <input
              value={screenshotText}
              onChange={(event) => setScreenshotText(event.target.value)}
              placeholder="https://..., https://..."
              className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]"
            />
          </label>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-black/[0.18] px-4 py-4 text-sm font-semibold text-[#666666] hover:border-[#D6453D] hover:text-[#D6453D]">
            <Upload className="h-4 w-4" />
            Upload Project Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  uploadImage(file);
                }
              }}
            />
          </label>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-black/[0.18] px-4 py-4 text-sm font-semibold text-[#666666] hover:border-[#D6453D] hover:text-[#D6453D]">
            <Upload className="h-4 w-4" />
            Upload Screenshot
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  uploadScreenshot(file);
                }
              }}
            />
          </label>

          {form.image_url ? <img src={form.image_url} alt="Project preview" className="h-48 rounded-lg object-cover" /> : null}
          {textToTags(screenshotText).length ? (
            <div className="grid grid-cols-3 gap-2">
              {textToTags(screenshotText).slice(0, 6).map((screenshot) => (
                <img key={screenshot} src={screenshot} alt="Screenshot preview" className="aspect-video rounded-md object-cover" />
              ))}
            </div>
          ) : null}
          {error ? <p className="rounded-md bg-[#D6453D]/10 px-3 py-2 text-sm text-[#B83A33]">{error}</p> : null}
          {status ? <p className="rounded-md bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700">{status}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D6453D] disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isEditing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isEditing ? "Save Project" : "Create Project"}
          </button>
        </form>

        <section className="rounded-xl border border-black/[0.08] bg-black/[0.035] p-5 shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
          <h2 className="text-xl font-black">Projects</h2>
          <div className="mt-5 grid gap-4">
            {projects.length ? (
              projects.map((project) => (
                <article key={project.id} className="grid gap-4 rounded-lg border border-black/[0.08] bg-[#F6F1EA] p-4 sm:grid-cols-[8rem_1fr]">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="h-28 w-full rounded-lg object-cover" />
                  ) : (
                    <div className="h-28 rounded-lg bg-black/[0.06]" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="mt-1 text-sm text-[#888888]">{project.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => editProject(project)} aria-label={`Edit ${project.title}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.1] hover:border-[#D6453D] hover:text-[#D6453D]">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.title}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.1] text-[#B83A33] hover:bg-[#D6453D]/10">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#666666]">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech_stack.map((tag) => (
                        <span key={tag} className="rounded-full bg-black/[0.04] px-2 py-1 text-xs text-[#666666]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-black/[0.15] p-8 text-center text-sm text-[#888888]">
                No database projects yet. Create the first one with the form.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
