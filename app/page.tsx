export default function Home() {
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

  const services = [
    {
      title: "Modern Website Development",
      desc: "Premium business websites, company profiles, landing pages, and portfolio websites with fast performance and responsive design.",
    },
    {
      title: "Custom App Development",
      desc: "Scalable web apps and business systems designed for real workflows, better usability, and long-term growth.",
    },
    {
      title: "AI-Powered Solutions",
      desc: "Smart integrations, automation ideas, AI-assisted workflows, and modern digital experiences for businesses.",
    },
    {
      title: "Requirement Gathering",
      desc: "Clear planning, structured discovery, client requirement collection, and project scope alignment before development starts.",
    },
  ];

  const technologies = ["WordPress", "PHP", "Laravel", "Django", "Next.js", "MongoDB"];

  const process = [
    "Discovery & Requirement Gathering",
    "Strategy & Planning",
    "Modern UI/UX Design",
    "Development & Testing",
    "Launch & Ongoing Support",
  ];

  const projects = [
    {
      title: "Business Website",
      category: "Corporate Presence",
      desc: "Professional company websites that build trust, present services clearly, and improve digital presence.",
    },
    {
      title: "Portfolio Platform",
      category: "Personal Branding",
      desc: "Elegant portfolio websites for freelancers, developers, and creatives who want more clients.",
    },
    {
      title: "Custom Web App",
      category: "Business Automation",
      desc: "Practical dashboard and workflow-based systems designed around business requirements.",
    },
  ];

  const testimonials = [
    {
      name: "Client One",
      text: "Excellent communication, strong design sense, and a very professional development process.",
    },
    {
      name: "Client Two",
      text: "The final website looked modern, fast, and exactly matched our business goals.",
    },
    {
      name: "Client Three",
      text: "Requirement gathering was clear and the complete project flow felt highly professional.",
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$150",
      features: ["Landing Page", "Responsive Design", "Basic SEO", "Contact Section"],
    },
    {
      name: "Professional",
      price: "$350",
      features: ["Multi-Section Website", "Modern UI", "Performance Focus", "Lead Capture Flow"],
    },
    {
      name: "Advanced",
      price: "$700",
      features: ["Custom Web Solution", "Requirement Gathering", "Scalable Structure", "Premium Support"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#07111f] text-white selection:bg-cyan-300 selection:text-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-black tracking-tight">Muhammad Hasnain</p>
            <p className="text-xs text-slate-400">Developer • Web • Apps • AI</p>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            <a href="#about" className="transition hover:text-cyan-300">About</a>
            <a href="#services" className="transition hover:text-cyan-300">Services</a>
            <a href="#projects" className="transition hover:text-cyan-300">Projects</a>
            <a href="#pricing" className="transition hover:text-cyan-300">Pricing</a>
            <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contact"
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:scale-[1.02]"
            >
              Start Project
            </a>
          </div>

          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#0d1829] p-4 shadow-2xl">
              <div className="flex flex-col gap-3 text-sm text-slate-300">
                <a href="#about" className="transition hover:text-cyan-300">About</a>
                <a href="#services" className="transition hover:text-cyan-300">Services</a>
                <a href="#projects" className="transition hover:text-cyan-300">Projects</a>
                <a href="#pricing" className="transition hover:text-cyan-300">Pricing</a>
                <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_32%)]" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[24rem] w-[24rem] animate-pulse rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-20">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              Available for modern web, app, and AI projects
            </span>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              I build
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-white bg-clip-text text-transparent">
                modern digital products
              </span>
              for brands, startups, and businesses.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I create professional websites, powerful web apps, and AI-focused solutions with strong design,
              clean development, and proper requirement gathering. I work with technologies like WordPress,
              PHP, Laravel, Django, modern frontend stacks, and scalable backend systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-2xl bg-cyan-400 px-7 py-4 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:border-cyan-300 hover:bg-white/10"
              >
                View Projects
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">20+</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Modern projects and business website ideas delivered.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">8+</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Core technologies and development areas covered.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">Communication, support, and project discussion flow.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl" />
            <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute inset-y-10 -left-4 w-24 bg-cyan-400/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1829] p-4">
                <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-900">
                  <div className="absolute left-0 top-0 z-10 h-full w-16 bg-cyan-300/20 blur-2xl" />
                  <img
                    src="/images/profile.png"
                    alt="Muhammad Hasnain profile"
                    className="h-[520px] w-full object-cover object-center transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Professional Profile</p>
                  <h2 className="mt-2 text-2xl font-black">Full-Stack Web & App Developer</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Focused on building premium user experiences, practical software solutions, and business-ready
                    digital products with modern design and reliable technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">About Me</p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              A modern developer focused on design, logic, and business results.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              I help clients turn ideas into modern websites and web applications. My approach starts with proper
              requirement gathering, clear planning, clean UI, and scalable development so the final product feels
              professional, useful, and ready for real users.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Work Process</p>
            <div className="mt-5 space-y-4">
              {process.map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Structured execution to keep the project clean, efficient, and aligned with business needs.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Services</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Professional services for modern businesses</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            I create polished, scalable, and business-focused digital solutions designed to improve your online
            presence and support growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-300/40"
            >
              <h3 className="text-2xl font-black">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Projects Showcase</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Work built for modern clients</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-2 hover:border-cyan-300/40"
            >
              <div className="mb-5 h-44 rounded-[1.5rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-500/20" />
              <p className="text-sm text-cyan-300">{project.category}</p>
              <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Tech Stack</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">Technologies I work with</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1829] px-5 py-3 text-base font-semibold text-white"
              >
                <img
                  src={
                    tech === "WordPress"
                      ? "https://cdn.simpleicons.org/wordpress/ffffff"
                      : tech === "PHP"
                      ? "https://cdn.simpleicons.org/php/ffffff"
                      : tech === "Laravel"
                      ? "https://cdn.simpleicons.org/laravel/ffffff"
                      : tech === "Django"
                      ? "https://cdn.simpleicons.org/django/ffffff"
                      : tech === "Next.js"
                      ? "https://cdn.simpleicons.org/nextdotjs/ffffff"
                      : "https://cdn.simpleicons.org/mongodb/ffffff"
                  }
                  alt={tech}
                  className="h-6 w-6 object-contain"
                />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Testimonials</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">What clients say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-3xl text-cyan-300">“</div>
              <p className="text-sm leading-7 text-slate-300">{item.text}</p>
              <p className="mt-5 text-base font-bold text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Pricing</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Flexible packages for different needs</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <div key={plan.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <p className="text-sm text-cyan-300">{plan.name}</p>
              <h3 className="mt-3 text-4xl font-black">{plan.price}</h3>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <p key={feature} className="rounded-xl border border-white/10 bg-[#0d1829] px-4 py-3 text-sm text-slate-300">
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/15 to-blue-600/10 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Let’s Work Together</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Need a modern website, app, or AI-powered solution?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
                Share your idea, business goals, or project requirements. I can help plan, design, and build a
                clean digital product that looks modern and works professionally.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1829] p-6">
              <div className="space-y-4">
                <a
                  href="mailto:mhksmm155@gmail.com"
                  className="flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-4 text-base font-bold text-slate-950 transition hover:scale-[1.01]"
                >
                  mhksmm155@gmail.com
                </a>
                <a
                  href="https://wa.me/923046838346"
                  className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:border-cyan-300"
                >
                  WhatsApp: +92 304 6838346
                </a>
              </div>
              <p className="mt-5 text-center text-sm leading-6 text-slate-400">
                Replace the profile image with your own photo in public/images/profile.jpg.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#06101c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-white">Muhammad Hasnain</p>
            <p>Modern websites, web apps, and AI-focused digital solutions.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:mhksmm155@gmail.com" className="hover:text-cyan-300">Email</a>
            <a href="https://wa.me/923046838346" className="hover:text-cyan-300">WhatsApp</a>
            <a href="#services" className="hover:text-cyan-300">Services</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
