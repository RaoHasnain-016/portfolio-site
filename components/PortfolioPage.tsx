"use client";

/* eslint-disable @next/next/no-img-element -- Portfolio supports Supabase and remote project images. */

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music2,
  MoveUpRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ImageZoomModal } from "@/components/ImageZoomModal";
import { Navbar } from "@/components/Navbar";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";
import { fallbackBlogPosts } from "@/lib/blogs";
import { defaultProfile } from "@/lib/profile";
import { fallbackProjects } from "@/lib/projects";
import type { Project } from "@/types/project";
import type { PortfolioProfile } from "@/types/profile";

const cvProfileFields = {
  eyebrow: defaultProfile.eyebrow,
  roles: defaultProfile.roles,
  hero_description: defaultProfile.hero_description,
  about_heading: defaultProfile.about_heading,
  about_body: defaultProfile.about_body,
  skills: defaultProfile.skills,
  marquee_items: defaultProfile.marquee_items,
};

const experience = [
  {
    period: "Jan 2026 - Present",
    title: "Full Stack Engineer",
    company: "CodeAlpha",
    text: "Building production MERN features with TypeScript and JavaScript, including REST APIs, JWT auth, middleware, MongoDB data models, and modular React interfaces.",
  },
  {
    period: "2026 - Present",
    title: "Founder",
    company: "DevConnect and Career Compass AI",
    text: "Designing full-stack products around developer collaboration, AI-assisted career guidance, OpenAI integrations, prompt engineering, and multi-step AI workflows.",
  },
  {
    period: "2023 - 2027",
    title: "BS Computer Software Engineering",
    company: "COMSATS University Islamabad, Vehari Campus",
    text: "Studying software engineering while building real production projects across frontend, backend, databases, authentication, and AI-integrated development.",
  },
];

const stats = [
  ["5", "Portfolio projects"],
  ["18+", "Core skills"],
  ["2026", "CodeAlpha"],
];

const engineeringFocus: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Backend Reliability",
    text: "REST APIs, JWT auth, middleware, validation, RBAC, and MongoDB data models built for real workflows.",
    icon: ShieldCheck,
  },
  {
    title: "AI Product Workflows",
    text: "OpenAI API integration, prompt design, multi-step agent flows, assessments, and roadmap generation.",
    icon: BrainCircuit,
  },
  {
    title: "Frontend Systems",
    text: "Responsive React interfaces, reusable components, Tailwind systems, motion, and admin-ready UX.",
    icon: Code2,
  },
  {
    title: "Data & Deployment",
    text: "Database-backed content, Firebase/Supabase-style workflows, GitHub, Vercel, Netlify, and production handoff.",
    icon: Database,
  },
];

const heroSignals = [
  "Production MERN features at CodeAlpha",
  "Founder of DevConnect and Career Compass AI",
  "Available for full-stack and AI-integrated roles",
];

const projectBlogSlugs: Record<string, string> = {
  devconnect: "devconnect-platform-architecture",
  "career-compass-ai": "career-compass-ai-roadmaps",
  cropmax: "cropmax-agriculture-cms",
  "construction-company-business-software": "construction-business-software-dashboards",
  "portfolio-admin-app": "portfolio-admin-app-content-system",
};

const skillLevels: Record<string, number> = {
  JavaScript: 92,
  TypeScript: 88,
  "React.js": 92,
  "Tailwind CSS": 90,
  "Node.js": 88,
  "Express.js": 86,
  "Nest.js": 78,
  MongoDB: 86,
  "Firebase Firestore": 78,
  "JWT Authentication": 88,
  "REST API Design": 88,
  "OpenAI API": 84,
  "AI Agent Development": 80,
  "Prompt Engineering": 86,
  Git: 84,
  GitHub: 84,
  Vercel: 82,
  Netlify: 78,
};

const socialPlatforms: {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, color: "#0A66C2" },
  { name: "GitHub", href: "https://github.com", icon: Github, color: "#111111" },
  { name: "TikTok", href: "https://tiktok.com", icon: Music2, color: "#111111" },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook, color: "#1877F2" },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram, color: "#D6453D" },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

function imageWithVersion(src: string, version?: string) {
  if (!src || !version) {
    return src;
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${encodeURIComponent(version)}`;
}

function mergeProjectsWithCvProjects(projects: Project[]) {
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

function applyCvProfile(profile: PortfolioProfile): PortfolioProfile {
  return {
    ...profile,
    ...cvProfileFields,
    email: defaultProfile.email,
    social_links: profile.social_links.length ? profile.social_links : defaultProfile.social_links,
    profile_image_url: profile.profile_image_url || defaultProfile.profile_image_url,
  };
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.72, ease: smoothEase },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.96, y: 18 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.78, ease: smoothEase },
};

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const updateEnabled = () => setEnabled(media.matches);

    updateEnabled();
    media.addEventListener("change", updateEnabled);

    function moveCursor(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    }

    function handlePointerOver(event: PointerEvent) {
      const target = event.target;
      setActive(target instanceof Element && Boolean(target.closest("a, button, input, textarea, label")));
    }

    function hideCursor() {
      setVisible(false);
      setActive(false);
    }

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      media.removeEventListener("change", updateEnabled);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="cursor-ring"
        animate={{
          x: position.x - 21.5,
          y: position.y - 21.5,
          scale: active ? 1.35 : 1,
          opacity: visible ? (active ? 0.95 : 0.72) : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.55 }}
      />
      <motion.span
        aria-hidden="true"
        className="cursor-dot"
        animate={{
          x: position.x - 4.5,
          y: position.y - 4.5,
          scale: active ? 0.7 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 34, mass: 0.35 }}
      />
    </>
  );
}

export function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [profile, setProfile] = useState<PortfolioProfile>(defaultProfile);
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Project[];
        if (!cancelled && data.length) {
          setProjects(mergeProjectsWithCvProjects(data));
        }
      } catch {
        setProjects(fallbackProjects);
      }
    }

    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as PortfolioProfile;
        if (!cancelled) {
          setProfile(applyCvProfile(data));
        }
      } catch {
        setProfile(defaultProfile);
      }
    }

    loadProjects();
    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const roleList = profile.roles.length ? profile.roles : defaultProfile.roles;
    const current = roleList[roleIndex % roleList.length];
    let letter = 0;
    const reset = window.setTimeout(() => setTypedRole(""), 0);

    const typing = window.setInterval(() => {
      letter += 1;
      setTypedRole(current.slice(0, letter));

      if (letter === current.length) {
        window.clearInterval(typing);
        window.setTimeout(() => {
          setRoleIndex((index) => (index + 1) % roleList.length);
        }, 1500);
      }
    }, 54);

    return () => {
      window.clearTimeout(reset);
      window.clearInterval(typing);
    };
  }, [profile.roles, roleIndex]);

  const featuredProjects = useMemo(() => projects, [projects]);
  const skills = profile.skills.length ? profile.skills : defaultProfile.skills;
  const marqueeSkills = profile.marquee_items.length
    ? profile.marquee_items
    : defaultProfile.marquee_items;
  const blogBySlug = useMemo(
    () => new Map(fallbackBlogPosts.map((post) => [post.slug, post])),
    []
  );
  const profileImageSrc = imageWithVersion(profile.profile_image_url, profile.updated_at);
  const socialLabels = profile.social_links.length
    ? profile.social_links
    : socialPlatforms.map((social) => social.name);
  const visibleSocials = socialPlatforms.map((social, index) => {
    const raw = socialLabels[index] || social.name;
    const [label, href] = raw.split("|").map((part) => part.trim());

    return {
      ...social,
      label: label || social.name,
      href: href || social.href,
    };
  });

  return (
    <main className="portfolio-shell min-h-screen overflow-x-hidden bg-[#F6F1EA] text-[#111111] selection:bg-[#D6453D] selection:text-white">
      <CustomCursor />
      <Navbar />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
        animate={{ opacity: [0.55, 0.82, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-[6%] top-28 h-44 w-44 rounded-[2rem] border border-black/[0.04] bg-[#EFE7DD]/70" />
        <div className="absolute right-[8%] top-40 h-28 w-64 rotate-[-8deg] rounded-[1.25rem] border border-black/[0.04] bg-white/45" />
        <div className="absolute bottom-20 left-[18%] h-24 w-72 rotate-[6deg] rounded-[1.25rem] border border-black/[0.04] bg-[#D6453D]/[0.055]" />
      </motion.div>

      <section id="home" className="relative min-h-screen overflow-hidden pb-32 pt-24 sm:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: smoothEase }}>
            <p className="inline-flex max-w-full rounded-full bg-black/[0.04] px-4 py-2.5 text-[0.68rem] font-semibold uppercase text-[#D6453D] sm:px-5 sm:py-3 sm:text-xs">
              {profile.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl text-[clamp(3rem,16vw,8.25rem)] font-black uppercase leading-[0.86] tracking-[0.03em] sm:mt-7">
              {profile.first_name}
              <span className="block text-[#D6453D]">{profile.last_name}</span>
            </h1>
            <div className="mt-7 flex min-h-9 items-center text-lg font-semibold text-[#111111] sm:text-2xl">
              <span>{typedRole}</span>
              <span className="ml-1 h-7 w-[2px] animate-pulse bg-[#D6453D]" />
            </div>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#666666] sm:text-lg">
              {profile.hero_description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="premium-button premium-button-dark group">
                View Work
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="#contact" className="premium-button premium-button-light group">
                Contact Me
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="mt-7 grid gap-2 text-sm font-semibold text-[#555555] sm:grid-cols-2">
              {heroSignals.map((signal) => (
                <div key={signal} className="flex items-start gap-2 rounded-md border border-black/[0.07] bg-white/35 px-3 py-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D6453D]" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.65, ease: smoothEase }}
            >
              {visibleSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("#") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="social-3d group"
                    style={{ "--social-color": social.color } as CSSProperties}
                  >
                    <Icon className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.85, ease: smoothEase }} className="relative mx-auto w-full max-w-[28rem] lg:max-w-[34rem]">
          <motion.div className="absolute inset-x-8 top-10 h-[28rem] rounded-full bg-[#D6453D]/10 blur-3xl" animate={{ scale: [1, 1.04, 1], opacity: [0.7, 0.95, 0.7] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div whileHover={{ y: -8, rotate: -1.2 }} transition={{ duration: 0.45, ease: smoothEase }} className="relative mx-auto aspect-square w-full max-w-[27.5rem] rounded-full border border-black/[0.08] bg-[#EFE7DD] p-3 shadow-[0_35px_100px_rgba(17,17,17,0.12)]">
            <div className="h-full w-full overflow-hidden rounded-full border border-black/[0.08] bg-black/[0.04]">
              <img src={profileImageSrc} alt={`${profile.first_name} ${profile.last_name} profile portrait`} className="h-full w-full object-cover object-center grayscale-[8%]" loading="eager" />
            </div>
          </motion.div>
          <div className="relative mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map(([value, label], index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 + index * 0.08, duration: 0.55, ease: smoothEase }} className="motion-card rounded-lg border border-black/[0.08] bg-[#F6F1EA]/70 px-2 py-3 text-center shadow-[0_16px_45px_rgba(17,17,17,0.06)] backdrop-blur sm:px-4 sm:py-4">
                <p className="text-xl font-black leading-none sm:text-2xl">{value}</p>
                <p className="mt-2 text-[0.64rem] font-bold uppercase leading-4 tracking-[0.14em] text-[#888888]">{label}</p>
              </motion.div>
            ))}
          </div>
          <div className="relative mx-auto mt-5 max-w-sm rounded-full border border-black/[0.08] bg-black/[0.035] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#666666]">
            MERN | TypeScript | AI Integrations
          </div>
        </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-y border-black/[0.08] bg-[#111111] text-white">
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track flex w-max">
              {[0, 1].map((group) => (
                <div key={group} className="marquee-group flex shrink-0" aria-hidden={group === 1}>
                  {marqueeSkills.map((skill) => (
                    <div key={`${group}-${skill}`} className="flex h-20 shrink-0 items-center gap-14 px-9 sm:h-[4.5rem] sm:px-12">
                      <span className="whitespace-nowrap text-xl font-black uppercase tracking-[0.06em] sm:text-2xl">
                        {skill}
                      </span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#D6453D]" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#EFE7DD]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D6453D]">Professional Profile</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-[0.035em] sm:text-6xl">
              {profile.about_heading}
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-[#666666]">
              {profile.about_body}
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {["MERN production features", "JWT auth, middleware, and RBAC", "OpenAI API and AI agent workflows", "Remote, on-site, contract, and internship availability"].map((item, index) => (
                <motion.div key={item} {...scaleIn} transition={{ ...scaleIn.transition, delay: index * 0.06 }} className="motion-card flex items-center gap-3 rounded-lg border border-black/[0.08] bg-[#F6F1EA]/65 px-4 py-4 text-sm font-semibold">
                  <MoveUpRight className="h-4 w-4 text-[#D6453D]" />
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {engineeringFocus.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    {...scaleIn}
                    transition={{ ...scaleIn.transition, delay: 0.12 + index * 0.06 }}
                    className="motion-card rounded-lg border border-black/[0.08] bg-[#F6F1EA]/75 p-5 shadow-[0_16px_45px_rgba(17,17,17,0.05)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#111111] text-white shadow-[0_12px_28px_rgba(17,17,17,0.18)]">
                      <Icon className="h-5 w-5 text-[#F0B429]" />
                    </div>
                    <h3 className="mt-5 text-lg font-black tracking-[0.02em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#666666]">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
        <motion.div {...fadeUp} className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D6453D]">Experience & Education</p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-[0.035em] sm:text-6xl">Career Timeline</h2>
        </motion.div>
        <div className="relative grid gap-8 border-l border-black/[0.12] pl-7 md:ml-4">
          {experience.map((item, index) => (
            <motion.article key={item.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }} className="motion-card relative rounded-lg border border-black/[0.08] bg-black/[0.035] p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)]">
              <span className="absolute -left-[2.18rem] top-7 h-3.5 w-3.5 rounded-full border-4 border-[#F6F1EA] bg-[#D6453D]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#888888]">{item.period}</p>
              <h3 className="mt-3 text-2xl font-black tracking-[0.02em]">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold text-[#D6453D]">{item.company}</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#666666]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-[#EFE7DD]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <motion.div {...fadeUp} className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D6453D]">Selected Work</p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-[0.035em] sm:text-6xl">Portfolio Projects</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#666666]">
              CV-aligned projects covering MERN platforms, AI SaaS, CMS websites, business systems, and this portfolio app.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const relatedBlogSlug = projectBlogSlugs[project.slug];
              const relatedBlog = relatedBlogSlug ? blogBySlug.get(relatedBlogSlug) : null;

              return (
              <motion.article
                key={project.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                whileHover={{ y: -8 }}
                className="motion-card group overflow-hidden rounded-xl border border-black/[0.08] bg-[#F6F1EA] shadow-[0_24px_70px_rgba(17,17,17,0.07)]"
              >
                <button
                  type="button"
                  onClick={() => project.image_url && setZoomImage({ src: project.image_url, alt: project.title })}
                  className="block aspect-[1.22] w-full overflow-hidden bg-black/[0.04] text-left"
                >
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.06]" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#EFE7DD] text-[#888888]">
                      <Code2 className="h-8 w-8" />
                    </div>
                  )}
                </button>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-black tracking-[0.02em]">{project.title}</h3>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#D6453D] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#666666]">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-black/[0.08] bg-black/[0.035] px-3 py-1.5 text-xs font-semibold text-[#666666]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.screenshot_urls?.length ? (
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {project.screenshot_urls.slice(0, 3).map((screenshot) => (
                        <button
                          key={screenshot}
                          type="button"
                          onClick={() => setZoomImage({ src: screenshot, alt: `${project.title} screenshot` })}
                          className="aspect-video overflow-hidden rounded-md border border-black/[0.08] bg-black/[0.04]"
                        >
                          <img src={screenshot} alt={`${project.title} screenshot`} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.github_url ? (
                      <a href={project.github_url} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`} className="flex h-10 w-10 items-center justify-center rounded-md border border-black/[0.1] text-[#111111] transition hover:border-[#D6453D] hover:bg-[#D6453D] hover:text-white">
                        <Github className="h-5 w-5" />
                      </a>
                    ) : null}
                    {project.live_demo_url ? (
                      <a href={project.live_demo_url} target={project.live_demo_url.startsWith("#") ? undefined : "_blank"} rel="noreferrer" aria-label={`${project.title} live demo`} className="flex h-10 w-10 items-center justify-center rounded-md border border-black/[0.1] text-[#111111] transition hover:border-[#D6453D] hover:bg-[#D6453D] hover:text-white">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    ) : null}
                    {relatedBlog ? (
                      <a href={`/blog/${relatedBlog.slug}`} aria-label={`${project.title} related blog`} className="inline-flex h-10 min-w-36 flex-1 items-center justify-center gap-2 rounded-md border border-black/[0.1] px-3 text-sm font-semibold text-[#111111] transition hover:border-[#D6453D] hover:bg-[#D6453D] hover:text-white">
                        <BookOpen className="h-4 w-4" />
                        Related blog
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D6453D]">Technical Skills</p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-[0.035em] sm:text-6xl">CV Skill Matrix</h2>
          <p className="mt-6 text-base leading-8 text-[#666666]">
            MERN, AI integration, authentication, databases, deployment, and frontend delivery from my current CV stack.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="grid gap-4 md:grid-cols-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              {...scaleIn}
              transition={{ ...scaleIn.transition, delay: index * 0.025 }}
              className="motion-card rounded-lg border border-black/[0.08] bg-black/[0.035] p-4 shadow-[0_16px_45px_rgba(17,17,17,0.05)]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-black text-[#111111]">{skill}</p>
                <span className="text-xs font-bold text-[#D6453D]">{skillLevels[skill] ?? 78}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/[0.08]">
                <motion.div
                  className="skill-bar h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skillLevels[skill] ?? 78}%` }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 1.05, delay: index * 0.035, ease: smoothEase }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="contact" className="bg-[#111111] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
          <motion.div {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D6453D]">Contact</p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[0.035em] sm:text-6xl">
              Let&apos;s discuss full-stack or AI-integrated work.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/65">
              Available for remote or on-site work, full-time, part-time, contract, internships, entry-level full-stack roles, and AI-integrated development.
            </p>
            <a href={`mailto:${profile.email}`} className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition hover:text-white">
              <Mail className="h-4 w-4 text-[#D6453D]" />
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-4">
              {visibleSocials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={`contact-${social.name}`}
                    href={social.href}
                    target={social.href.startsWith("#") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="social-3d social-3d-dark group"
                    style={{ "--social-color": social.color } as CSSProperties}
                  >
                    <Icon className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-black/[0.08] bg-[#F6F1EA] px-5 py-8 text-center text-sm text-[#666666]">
        <p>&copy; {new Date().getFullYear()} Muhammad Hasnain. Built with Next.js, Supabase, Tailwind CSS, and Framer Motion.</p>
      </footer>

      <PortfolioChatbot />

      <ImageZoomModal
        image={zoomImage?.src || null}
        alt={zoomImage?.alt || "Project preview"}
        onClose={() => setZoomImage(null)}
      />
    </main>
  );
}
