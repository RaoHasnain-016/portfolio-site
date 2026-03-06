"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ChevronDown,
  Code2,
  Globe,
  Mail,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type ProjectItem = {
  title: string;
  category: string;
  desc: string;
  gradient: string;
};

type ServiceItem = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

type PricingItem = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  featured?: boolean;
};

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [chatOpen, setChatOpen] = useState(true);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);

  const skills = [
    "App Development",
    "Web Development",
    "AI Solutions",
    "Requirement Gathering",
    "WordPress",
    "PHP",
    "Laravel",
    "Django",
  ];

  const services: ServiceItem[] = [
    {
      title: "Premium Website Development",
      desc: "Modern business websites, premium portfolio sites, landing pages, and high-end digital experiences designed to build trust and convert visitors into clients.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Custom Web Applications",
      desc: "Scalable dashboards, portals, and workflow-driven web applications with strong structure, responsive layouts, and performance-focused development.",
      icon: <Code2 className="h-6 w-6" />,
    },
    {
      title: "AI-Focused Solutions",
      desc: "AI-powered ideas, smart integrations, automation-ready systems, and modern experiences that help businesses move faster and work smarter.",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      title: "Discovery & Strategy",
      desc: "Clear requirement gathering, project planning, scope definition, and solution strategy before development starts so execution stays sharp and professional.",
      icon: <Briefcase className="h-6 w-6" />,
    },
  ];

  const projects: ProjectItem[] = [
    {
      title: "Executive Brand Portfolio",
      category: "Personal Brand",
      desc: "A premium portfolio experience built for personal branding, trust, positioning, and stronger first impressions for high-value clients.",
      gradient:
        "from-cyan-400/25 via-blue-500/10 to-white/5",
    },
    {
      title: "Luxury Business Website",
      category: "Corporate Presence",
      desc: "A polished company website with premium visuals, trust-focused sections, strong service presentation, and a conversion-oriented layout.",
      gradient:
        "from-white/15 via-slate-400/10 to-blue-500/15",
    },
    {
      title: "Operations Dashboard",
      category: "Custom Software",
      desc: "A practical business system with better structure, cleaner workflows, and a modern product design for internal operations and reporting.",
      gradient:
        "from-indigo-500/25 via-cyan-400/10 to-white/5",
    },
  ];

  const pricing: PricingItem[] = [
    {
      name: "Starter",
      price: "$150",
      desc: "Best for landing pages and simple websites.",
      features: [
        "Single-page website",
        "Responsive layout",
        "Clean modern UI",
        "Call-to-action section",
      ],
    },
    {
      name: "Professional",
      price: "$350",
      desc: "Best for premium business websites and strong client presentation.",
      features: [
        "Multi-section website",
        "Premium UI design",
        "Fast responsive layout",
        "Lead generation flow",
      ],
      featured: true,
    },
    {
      name: "Signature",
      price: "$700",
      desc: "Best for custom portals, advanced products, and high-end experiences.",
      features: [
        "Custom digital solution",
        "Requirement gathering",
        "Scalable architecture",
        "Priority support",
      ],
    },
  ];

  const faqs: FAQItem[] = useMemo(
    () => [
      {
        question: "What services do you offer?",
        answer:
          "I offer web development, portfolio websites, business websites, landing pages, custom web apps, AI-related solutions, requirement gathering, WordPress, PHP, Laravel, Django, and modern frontend development.",
      },
      {
        question: "Do you build business websites?",
        answer:
          "Yes. I build premium business websites with modern UI, service sections, trust elements, responsive layouts, and strong conversion-focused structure.",
      },
      {
        question: "Can you make a portfolio website?",
        answer:
          "Yes. I create personal portfolio websites for developers, freelancers, agencies, and founders with premium design and strong personal branding.",
      },
      {
        question: "Do you work with WordPress, PHP, Laravel, and Django?",
        answer:
          "Yes. I work with WordPress, PHP, Laravel, Django, Next.js, and MongoDB depending on the project requirements and the best technical approach.",
      },
      {
        question: "How do you start a project?",
        answer:
          "I usually begin with requirement gathering, project planning, design direction, feature discussion, and then move into structured development and launch.",
      },
      {
        question: "How can I contact you?",
        answer:
          "You can contact me directly through email at mhksmm155@gmail.com or WhatsApp at +92 304 6838346.",
      },
      {
        question: "Can you redesign an old website?",
        answer:
          "Yes. I can redesign outdated websites into premium, modern, responsive, and more professional digital experiences.",
      },
    ],
    []
  );

  const techItems = [
    {
      name: "WordPress",
      icon: "https://cdn.simpleicons.org/wordpress/ffffff",
    },
    {
      name: "PHP",
      icon: "https://cdn.simpleicons.org/php/ffffff",
    },
    {
      name: "Laravel",
      icon: "https://cdn.simpleicons.org/laravel/ffffff",
    },
    {
      name: "Django",
      icon: "https://cdn.simpleicons.org/django/ffffff",
    },
    {
      name: "Next.js",
      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.simpleicons.org/mongodb/ffffff",
    },
  ];

  const floatingIcons = [
    {
      name: "Next.js",
      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
      className: "left-[8%] top-[18%]",
    },
    {
      name: "Laravel",
      icon: "https://cdn.simpleicons.org/laravel/ffffff",
      className: "right-[10%] top-[22%]",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.simpleicons.org/mongodb/ffffff",
      className: "left-[14%] bottom-[14%]",
    },
    {
      name: "Django",
      icon: "https://cdn.simpleicons.org/django/ffffff",
      className: "right-[14%] bottom-[16%]",
    },
  ];

  return (
    <main className="min-h-screen scroll-smooth bg-[#020617] text-white selection:bg-white selection:text-slate-950">
      <div className="fixed inset-0 -z-20 bg-[#020617]" />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-[-6rem] top-[40rem] h-[22rem] w-[22rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-semibold tracking-tight">Muhammad Hasnain</p>
            <p className="text-xs text-slate-400">Premium Digital Products</p>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] lg:block"
          >
            Start Project
          </a>

          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-white/10 bg-[#0b1220]/95 p-4 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col gap-3 text-sm text-slate-300">
                <a href="#about" className="transition hover:text-white">
                  About
                </a>
                <a href="#services" className="transition hover:text-white">
                  Services
                </a>
                <a href="#projects" className="transition hover:text-white">
                  Projects
                </a>
                <a href="#pricing" className="transition hover:text-white">
                  Pricing
                </a>
                <a href="#contact" className="transition hover:text-white">
                  Contact
                </a>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="relative overflow-hidden">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={item.name}
            className={`pointer-events-none absolute hidden lg:flex ${item.className} z-10 h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl`}
            animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img src={item.icon} alt={item.name} className="h-7 w-7 object-contain" />
          </motion.div>
        ))}

        <div className="mx-auto grid min-h-screen max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Available for selected projects
            </div>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Apple-level
              <span className="block bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                premium digital
              </span>
              presence.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I design and build refined websites, modern web apps, and AI-focused
              solutions with a clean visual language, thoughtful structure, and
              professional execution for founders, brands, and growing businesses.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -4, rotateX: 6, rotateY: -6 }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Book a Project
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
              >
                Explore Work
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { value: "20+", label: "Projects shaped with modern design thinking." },
                { value: "8+", label: "Technologies across web, backend, and AI." },
                { value: "24/7", label: "Professional communication and support." },
              ].map((item) => (
                <motion.div
                  key={item.value}
                  whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-10 top-20 h-56 w-24 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute -right-6 bottom-12 h-44 w-44 rounded-full bg-blue-400/15 blur-3xl" />

            <motion.div
              whileHover={{ rotateX: 5, rotateY: -5, y: -8 }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220]">
                <div className="relative">
                  <div className="absolute left-0 top-0 z-10 h-full w-24 bg-cyan-300/18 blur-3xl" />
                  <img
                    src="/images/profile.png"
                    alt="Muhammad Hasnain profile"
                    className="h-[620px] w-full object-cover object-center transition duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/20 to-transparent" />
                </div>

                <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Profile
                    </p>
                    <p className="mt-2 text-lg font-semibold">Full-Stack Developer</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Focused on elegant interfaces, strong architecture, and premium
                      digital presentation.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Approach
                    </p>
                    <p className="mt-2 text-lg font-semibold">Strategy + Execution</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Discovery, design, development, and launch handled with clarity
                      and structure.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">About</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
              A clean product mindset for modern websites and software.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              My work is built around clarity, detail, spacing, motion, and trust. I
              help turn ideas into premium digital experiences that feel polished,
              intuitive, and aligned with real business goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 backdrop-blur-2xl md:p-10"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Process</p>
            <div className="mt-6 space-y-4">
              {[
                "Discovery and requirement gathering",
                "Information architecture and planning",
                "Premium UI direction and interaction design",
                "Development, optimization, and testing",
                "Launch support and improvement cycles",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-base font-medium text-white">{step}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Every phase is structured to keep the result refined and
                      business-ready.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Services</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            High-end digital services with a premium visual standard.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, rotateX: 5, rotateY: -5 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-2xl transition hover:bg-white/[0.06]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cyan-300">
                {service.icon}
              </div>
              <div className="mb-5 h-px w-full bg-gradient-to-r from-white/40 to-transparent" />
              <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Selected Work
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Digital experiences designed to feel polished and valuable.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.button
                key={project.title}
                onClick={() => setActiveProject(index)}
                whileHover={{ x: 6 }}
                className={`w-full rounded-[1.75rem] border p-5 text-left backdrop-blur-2xl transition ${
                  activeProject === index
                    ? "border-white/20 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <p className="text-sm text-slate-400">{project.category}</p>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{project.desc}</p>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={projects[activeProject].title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
          >
            <div
              className={`h-72 bg-gradient-to-br ${projects[activeProject].gradient}`}
            />
            <div className="p-6">
              <p className="text-sm text-slate-400">
                {projects[activeProject].category}
              </p>
              <h3 className="mt-2 text-3xl font-semibold">
                {projects[activeProject].title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                {projects[activeProject].desc}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white">
                View premium concept <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Tech Stack</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Built with modern tools and a refined engineering workflow.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techItems.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6, rotateX: 5, rotateY: -5 }}
                className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-[#0b1220]/80 px-5 py-4"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <img src={tech.icon} alt={tech.name} className="h-6 w-6 object-contain" />
                </div>
                <div>
                  <p className="text-base font-medium">{tech.name}</p>
                  <p className="text-sm text-slate-400">Production-ready workflow</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Trusted by clients who wanted a stronger digital identity.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            "The final website looked premium, modern, and far more professional than what we had before.",
            "Communication was smooth, the design quality was excellent, and the delivery process felt highly organized.",
            "Great requirement gathering, clean execution, and a final result that truly matched our business goals.",
          ].map((text, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="text-4xl leading-none text-white/80">“</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-white/30 to-transparent" />
              <p className="mt-5 text-base font-medium text-white">
                Client {index + 1}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Pricing</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Flexible options for premium websites and digital products.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              className={`rounded-[2rem] border p-7 backdrop-blur-2xl ${
                plan.featured
                  ? "border-white/20 bg-white/[0.08] shadow-[0_24px_80px_rgba(255,255,255,0.06)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <p className="text-sm text-slate-400">{plan.name}</p>
              <h3 className="mt-3 text-5xl font-semibold tracking-tight">{plan.price}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.desc}</p>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-white/10 bg-[#0b1220]/80 px-4 py-3 text-sm text-slate-300"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 backdrop-blur-2xl md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Let’s Build Something Exceptional
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-6xl">
                Bring your next website, app, or digital idea to life.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                Whether you need a refined business website, a high-converting
                landing page, or a custom digital solution, I can help shape it into
                a premium experience.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/85 p-6 backdrop-blur-2xl">
              <div className="space-y-4">
                <a
                  href="mailto:mhksmm155@gmail.com"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01]"
                >
                  <Mail className="h-5 w-5" />
                  mhksmm155@gmail.com
                </a>
                <a
                  href="https://wa.me/923046838346"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-6 py-4 text-base font-medium text-white transition hover:bg-white/[0.1]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp: +92 304 6838346
                </a>
              </div>
              <p className="mt-5 text-center text-sm leading-6 text-slate-400">
                Profile image path updated to public/images/profile.png
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 bg-[#020617]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium text-white">Muhammad Hasnain</p>
            <p>Premium websites, modern software, and high-end digital presentation.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:mhksmm155@gmail.com" className="hover:text-white">
              Email
            </a>
            <a href="https://wa.me/923046838346" className="hover:text-white">
              WhatsApp
            </a>
            <a href="#services" className="hover:text-white">
              Services
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-[60]">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white text-slate-950 shadow-2xl transition hover:scale-105"
          >
            <Bot className="h-6 w-6" />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#071120]/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">Client Assistant</p>
                <p className="text-xs text-slate-400">
                  Quick answers about services and web development
                </p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto p-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-slate-300">
                  Assalam o Alaikum. I am Muhammad Hasnain’s assistant. Select a
                  question below to get a quick answer.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {faqs.map((faq) => (
                  <button
                    key={faq.question}
                    onClick={() => setSelectedFAQ(faq)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/[0.08]"
                  >
                    <span className="pr-3">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                ))}
              </div>

              {selectedFAQ && (
                <motion.div
                  key={selectedFAQ.question}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4"
                >
                  <p className="text-sm font-semibold text-cyan-200">
                    {selectedFAQ.question}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {selectedFAQ.answer}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}