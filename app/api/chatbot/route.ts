import { NextRequest, NextResponse } from "next/server";
import { fallbackBlogPosts } from "@/lib/blogs";
import { defaultProfile } from "@/lib/profile";
import { fallbackProjects } from "@/lib/projects";
import { resumeContext } from "@/lib/resume";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import type { PortfolioProfile } from "@/types/profile";
import type { Project } from "@/types/project";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 900;

function cleanMessage(value: unknown) {
  return String(value || "").trim().slice(0, MAX_MESSAGE_LENGTH);
}

function isContactIntent(message: string) {
  return /\b(contact|email|mail|phone|number|hire|project|order|quote|budget|call|whatsapp|available)\b/i.test(message);
}

function isStackAdviceIntent(message: string) {
  return /\b(best|suggest|recommend|recommendation|stack|technology|tech|framework|database|backend|frontend|saas|app|website|cms|dashboard|ai)\b/i.test(message);
}

function createStackAdvice(message: string) {
  if (/\b(ai|agent|chatbot|llm|openai|career|saas)\b/i.test(message)) {
    return "For an AI SaaS or chatbot product, a strong stack is Next.js or React, TypeScript, Node.js/Nest.js, MongoDB or PostgreSQL, OpenAI API, JWT auth, Tailwind CSS, and Vercel. Hasnain can help structure prompts, AI agent flows, dashboards, and deployment.";
  }

  if (/\b(admin|dashboard|business|erp|crm|construction|invoice|analytics)\b/i.test(message)) {
    return "For an admin dashboard or business system, use React/Next.js, TypeScript, Node.js/Nest.js, PostgreSQL or MongoDB, JWT/RBAC, charting, audit-friendly APIs, and Tailwind CSS. This matches Hasnain's MERN, RBAC, REST API, and dashboard experience.";
  }

  if (/\b(cms|blog|portfolio|website|seo|landing|agriculture|crop)\b/i.test(message)) {
    return "For a portfolio, CMS, or SEO website, use Next.js, TypeScript, Tailwind CSS, a CMS/data backend such as Supabase or MongoDB, optimized images, and Vercel deployment. Hasnain's CropMax and portfolio app fit this type of build.";
  }

  return "A practical default stack is TypeScript, React/Next.js, Node.js or Nest.js, MongoDB/PostgreSQL, JWT auth, Tailwind CSS, GitHub, and Vercel. If AI is needed, add OpenAI API and prompt workflows. Tell me the project type and I can suggest a tighter stack.";
}

function createLocalReply(message: string) {
  if (isStackAdviceIntent(message)) {
    return createStackAdvice(message);
  }

  if (isContactIntent(message)) {
    return `You can contact ${resumeContext.name} at ${resumeContext.email} or ${resumeContext.phone}. For a project or order, send the project goals, timeline, and budget so Hasnain can respond with the next steps.`;
  }

  if (/\b(skill|stack|technology|tech)\b/i.test(message)) {
    return `${resumeContext.name} works mainly with ${resumeContext.skills.slice(0, 10).join(", ")}. He also builds AI agent workflows and OpenAI API integrations.`;
  }

  if (/\b(project|work|portfolio|built)\b/i.test(message)) {
    return `${resumeContext.name}'s main projects include ${resumeContext.projects
      .map((project) => project.name)
      .join(", ")}. For project inquiries, contact ${resumeContext.email}.`;
  }

  return `${resumeContext.name} is a ${resumeContext.title} from ${resumeContext.location}. He builds MERN apps, AI-powered SaaS tools, admin dashboards, and client systems. For direct contact: ${resumeContext.email} or ${resumeContext.phone}.`;
}

async function getSiteContext() {
  let profile: PortfolioProfile = defaultProfile;
  let projects: Project[] = fallbackProjects;
  let posts: BlogPost[] = fallbackBlogPosts;

  try {
    const supabase = getSupabaseAdminClient();
    const [profileResult, projectsResult, postsResult] = await Promise.all([
      supabase.from("portfolio_profile").select("*").eq("id", "main").single(),
      supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(6),
      supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .limit(3),
    ]);

    if (profileResult.data) {
      profile = profileResult.data;
    }

    if (projectsResult.data?.length) {
      projects = projectsResult.data;
    }

    if (postsResult.data?.length) {
      posts = postsResult.data;
    }
  } catch {
    // Local fallback keeps the chatbot useful before Supabase setup is complete.
  }

  return { profile, projects, posts, resume: resumeContext };
}

function createInstructions(context: Awaited<ReturnType<typeof getSiteContext>>) {
  return `
You are Hasnain's portfolio assistant on his personal website.
Answer only from the provided portfolio, resume, project, blog, and contact context.
Do not invent experience, prices, private details, guarantees, or availability beyond the context.
If a visitor wants to hire, order a project, request a quote, or discuss work, share:
Email: ${resumeContext.email}
Phone: ${resumeContext.phone}
Ask them to include project goals, timeline, and budget.
Keep replies concise, professional, friendly, and under 160 words.
You may give practical software stack suggestions when visitors ask which stack, framework, database, architecture, or tools are best for a project. Tie the recommendation to Hasnain's skills: MERN, TypeScript, REST APIs, JWT/RBAC, MongoDB, Firebase Firestore, OpenAI API, AI agents, Tailwind, GitHub, Vercel, and Netlify.
If the question is unrelated to Hasnain, his work, projects, skills, services, hiring, or contact, politely redirect to portfolio-related questions.

Context:
${JSON.stringify(context, null, 2)}
`;
}

function extractOutputText(data: unknown) {
  if (!data || typeof data !== "object") {
    return "";
  }

  if ("output_text" in data && typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  const output = "output" in data && Array.isArray(data.output) ? data.output : [];
  return output
    .flatMap((item) => {
      if (!item || typeof item !== "object" || !("content" in item) || !Array.isArray(item.content)) {
        return [];
      }

      return (item.content as unknown[])
        .map((contentItem: unknown) => {
          if (!contentItem || typeof contentItem !== "object") {
            return "";
          }

          if ("text" in contentItem && typeof contentItem.text === "string") {
            return contentItem.text;
          }

          return "";
        })
        .filter(Boolean);
    })
    .join("\n")
    .trim();
}

function extractChatText(data: unknown) {
  if (!data || typeof data !== "object" || !("choices" in data) || !Array.isArray(data.choices)) {
    return "";
  }

  const firstChoice = data.choices[0] as unknown;

  if (!firstChoice || typeof firstChoice !== "object" || !("message" in firstChoice)) {
    return "";
  }

  const message = firstChoice.message as unknown;

  if (!message || typeof message !== "object" || !("content" in message)) {
    return "";
  }

  return typeof message.content === "string" ? message.content.trim() : "";
}

function getProviderModel(baseUrl: string) {
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (baseUrl.includes("openrouter.ai") && model === "gpt-oss-120b:free") {
    return "openai/gpt-oss-120b:free";
  }

  return model;
}

function getAiTimeoutMs() {
  const timeout = Number(process.env.OPENAI_TIMEOUT_MS || 8000);

  if (!Number.isFinite(timeout)) {
    return 8000;
  }

  return Math.min(Math.max(timeout, 2500), 15000);
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    message?: string;
    messages?: ChatMessage[];
  };
  const message = cleanMessage(body.message);

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const history = Array.isArray(body.messages)
    ? body.messages
        .filter((item) => item.role === "user" || item.role === "assistant")
        .slice(-MAX_MESSAGES)
        .map((item) => ({
          role: item.role,
          content: cleanMessage(item.content),
        }))
        .filter((item) => item.content)
    : [];

  const apiKey = process.env.OPENAI_API_KEY;
  const context = await getSiteContext();

  if (!apiKey) {
    return NextResponse.json({
      reply: createLocalReply(message),
      source: "local",
    });
  }

  const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getAiTimeoutMs());
  const model = getProviderModel(baseUrl);
  const useChatCompletions = baseUrl !== "https://api.openai.com/v1";
  const instructions = createInstructions(context);

  try {
    const response = await fetch(`${baseUrl}${useChatCompletions ? "/chat/completions" : "/responses"}`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Muhammad Hasnain Portfolio Assistant",
      },
      body: JSON.stringify(
        useChatCompletions
          ? {
              model,
              messages: [
                { role: "system", content: instructions },
                ...history.map((item) => ({
                  role: item.role,
                  content: item.content,
                })),
                {
                  role: "user",
                  content: message,
                },
              ],
              max_tokens: 360,
              temperature: 0.35,
            }
          : {
              model,
              instructions,
              input: [
                ...history.map((item) => ({
                  role: item.role,
                  content: item.content,
                })),
                {
                  role: "user",
                  content: message,
                },
              ],
              max_output_tokens: 360,
              temperature: 0.35,
              store: false,
            }
      ),
    });

    if (!response.ok) {
      return NextResponse.json({
        reply: createLocalReply(message),
        source: "local",
      });
    }

    const data = (await response.json()) as unknown;
    const reply = (useChatCompletions ? extractChatText(data) : extractOutputText(data)) || createLocalReply(message);

    return NextResponse.json({ reply, source: "openai" });
  } catch {
    return NextResponse.json({
      reply: createLocalReply(message),
      source: "local",
    });
  } finally {
    clearTimeout(timeout);
  }
}
