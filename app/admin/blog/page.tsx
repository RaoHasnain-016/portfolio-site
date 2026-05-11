"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews Supabase and remote blog images. */

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, LogOut, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import { getSupabaseBrowserClient, hasSupabasePublicEnv } from "@/lib/supabase";
import { slugify } from "@/lib/projects";
import type { BlogPost, BlogPostInput } from "@/types/blog";

type BlogForm = BlogPostInput & {
  id?: string;
};

const emptyBlog: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  tags: [],
  published: false,
  published_at: "",
};

function tagsToText(tags: string[]) {
  return tags.join(", ");
}

function textToTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function setupErrorMessage(message: string) {
  return `Supabase database setup missing: ${message}. Run supabase/schema.sql in the SQL Editor for the Supabase project used by .env.`;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const supabase = useMemo(() => (hasSupabasePublicEnv() ? getSupabaseBrowserClient() : null), []);
  const envError = supabase ? "" : "Supabase environment variables are not configured.";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogForm>(emptyBlog);
  const [tagText, setTagText] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(form.id);

  const loadPosts = useCallback(async (token: string) => {
    const response = await fetch("/api/blogs?drafts=true", {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });
    const setupError = response.headers.get("X-Portfolio-Setup-Error");
    const data = (await response.json()) as BlogPost[] | { error?: string };

    if (setupError) {
      setError(setupErrorMessage(setupError));
      return;
    }

    if (!response.ok || !Array.isArray(data)) {
      setError("error" in data && data.error ? data.error : "Could not load blog posts.");
      return;
    }

    setPosts(data);
  }, []);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token || null;
      setAccessToken(token);
      if (token) {
        loadPosts(token);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const token = session?.access_token || null;
      setAccessToken(token);
      if (token) {
        loadPosts(token);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [loadPosts, supabase]);

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

    const token = data.session?.access_token || null;
    setAccessToken(token);
    if (token) {
      await loadPosts(token);
    }
  }

  async function handleLogout() {
    await supabase?.auth.signOut();
    setAccessToken(null);
    setPosts([]);
  }

  function updateForm(key: keyof BlogForm, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [key]: value,
      slug: key === "title" && !current.id ? slugify(String(value)) : current.slug,
    }));
  }

  function resetForm() {
    setForm(emptyBlog);
    setTagText("");
  }

  async function uploadCover(file: File) {
    if (!accessToken) {
      return;
    }

    const data = new FormData();
    data.append("file", file);
    setStatus("Uploading cover image...");
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: data,
    });
    const result = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      setError(result.error || "Cover upload failed.");
      setStatus("");
      return;
    }

    updateForm("cover_image_url", result.url);
    setStatus("Cover image uploaded.");
  }

  async function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) {
      return;
    }

    setLoading(true);
    setError("");
    setStatus("");

    const payload: BlogPostInput = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      cover_image_url: form.cover_image_url || null,
      tags: textToTags(tagText),
      published: form.published,
      published_at: form.published_at || null,
    };

    const response = await fetch(form.id ? `/api/blogs/${form.id}` : "/api/blogs", {
      method: form.id ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as BlogPost | { error?: string };
    setLoading(false);

    if (!response.ok) {
      setError("error" in result && result.error ? result.error : "Blog save failed.");
      return;
    }

    setStatus(form.id ? "Blog post updated." : "Blog post created.");
    resetForm();
    await loadPosts(accessToken);
  }

  async function deletePost(id: string) {
    if (!accessToken || !window.confirm("Delete this blog post?")) {
      return;
    }

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error || "Blog delete failed.");
      return;
    }

    setStatus("Blog post deleted.");
    await loadPosts(accessToken);
  }

  function editPost(post: BlogPost) {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url || "",
      tags: post.tags || [],
      published: post.published,
      published_at: post.published_at || "",
    });
    setTagText(tagsToText(post.tags || []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!accessToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F1EA] px-5 text-[#111111]">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-xl border border-black/[0.08] bg-black/[0.035] p-6 shadow-[0_30px_90px_rgba(17,17,17,0.10)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6453D]">Blog Admin</p>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.03em]">Blog Login</h1>
          <div className="mt-6 grid gap-4">
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 outline-none focus:border-[#D6453D]" />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 outline-none focus:border-[#D6453D]" />
            {envError || error ? <p className="text-sm text-[#B83A33]">{envError || error}</p> : null}
            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D6453D] disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Sign In
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] text-[#111111]">
      <header className="border-b border-black/[0.08] bg-[#F6F1EA]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6453D]">Dashboard</p>
            <h1 className="text-2xl font-black uppercase tracking-[0.03em]">Blog Settings</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => router.push("/admin")} className="inline-flex items-center gap-2 rounded-md border border-black/[0.1] px-4 py-2 text-sm font-semibold hover:border-[#D6453D] hover:text-[#D6453D]">
              <ArrowLeft className="h-4 w-4" />
              Admin
            </button>
            <button onClick={() => router.push("/blog")} className="inline-flex items-center gap-2 rounded-md border border-black/[0.1] px-4 py-2 text-sm font-semibold hover:border-[#D6453D] hover:text-[#D6453D]">
              Blog
            </button>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D6453D]">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={savePost} className="grid gap-4 rounded-xl border border-black/[0.08] bg-black/[0.035] p-5 shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">{isEditing ? "Edit Blog Post" : "Add Blog Post"}</h2>
            {isEditing ? (
              <button type="button" onClick={resetForm} className="rounded-md border border-black/[0.1] px-3 py-2 text-sm hover:border-[#D6453D] hover:text-[#D6453D]">
                Cancel
              </button>
            ) : null}
          </div>

          {[
            ["title", "Title"],
            ["slug", "Slug"],
            ["cover_image_url", "Cover Image URL"],
          ].map(([key, label]) => (
            <label key={key} className="grid gap-2 text-sm font-medium text-[#666666]">
              {label}
              <input value={String(form[key as keyof BlogForm] || "")} onChange={(event) => updateForm(key as keyof BlogForm, event.target.value)} required={key === "title" || key === "slug"} className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
            </label>
          ))}

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Excerpt
            <textarea value={form.excerpt} onChange={(event) => updateForm("excerpt", event.target.value)} required rows={3} className="resize-none rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Content
            <textarea value={form.content} onChange={(event) => updateForm("content", event.target.value)} required rows={12} placeholder="Use blank lines between paragraphs." className="resize-y rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#666666]">
            Tags
            <input value={tagText} onChange={(event) => setTagText(event.target.value)} placeholder="Next.js, Design, Supabase" className="rounded-md border border-black/[0.1] bg-[#F6F1EA] px-4 py-3 text-[#111111] outline-none focus:border-[#D6453D]" />
          </label>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-black/[0.18] px-4 py-4 text-sm font-semibold text-[#666666] hover:border-[#D6453D] hover:text-[#D6453D]">
            <Upload className="h-4 w-4" />
            Upload Cover Image
            <input type="file" accept="image/*" className="hidden" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                uploadCover(file);
              }
            }} />
          </label>

          {form.cover_image_url ? <img src={form.cover_image_url} alt="Blog cover preview" className="h-56 rounded-lg object-cover" /> : null}

          <label className="inline-flex items-center gap-3 rounded-md border border-black/[0.08] bg-[#F6F1EA] px-4 py-3 text-sm font-semibold text-[#666666]">
            <input type="checkbox" checked={form.published} onChange={(event) => updateForm("published", event.target.checked)} className="h-4 w-4 accent-[#D6453D]" />
            Published
          </label>

          {error ? <p className="rounded-md bg-[#D6453D]/10 px-3 py-2 text-sm text-[#B83A33]">{error}</p> : null}
          {status ? <p className="rounded-md bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700">{status}</p> : null}

          <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D6453D] disabled:opacity-70">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isEditing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isEditing ? "Save Blog Post" : "Create Blog Post"}
          </button>
        </form>

        <section className="rounded-xl border border-black/[0.08] bg-black/[0.035] p-5 shadow-[0_24px_70px_rgba(17,17,17,0.07)]">
          <h2 className="text-xl font-black">Blog Posts</h2>
          <div className="mt-5 grid gap-4">
            {posts.length ? (
              posts.map((post) => (
                <article key={post.id} className="grid gap-4 rounded-lg border border-black/[0.08] bg-[#F6F1EA] p-4 sm:grid-cols-[9rem_1fr]">
                  {post.cover_image_url ? (
                    <img src={post.cover_image_url} alt={post.title} className="h-28 w-full rounded-lg object-cover" />
                  ) : (
                    <div className="h-28 rounded-lg bg-black/[0.06]" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="mt-1 text-sm text-[#888888]">{post.published ? "Published" : "Draft"} · {post.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => editPost(post)} aria-label={`Edit ${post.title}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.1] hover:border-[#D6453D] hover:text-[#D6453D]">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => deletePost(post.id)} aria-label={`Delete ${post.title}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-black/[0.1] text-[#B83A33] hover:bg-[#D6453D]/10">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#666666]">{post.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
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
                No blog posts yet. Create the first one with the form.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
