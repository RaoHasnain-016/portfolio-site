"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "PROJECTS", href: "#projects", id: "projects" },
  { label: "SKILLS", href: "#skills", id: "skills" },
  { label: "BLOG", href: "/blog", id: "blog" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-[#F6F1EA]/72 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <a href="#home" className="text-sm font-black uppercase tracking-[0.24em] text-[#111111]">
          MH<span className="text-[#D6453D]">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-xs font-bold tracking-[0.18em] text-[#666666] transition hover:text-[#111111]"
            >
              {link.label}
              <motion.span
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[#D6453D]"
                initial={false}
                animate={{ scaleX: active === link.id ? 1 : 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-black/[0.1] text-[#111111] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-black/[0.08] bg-[#F6F1EA] md:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2 px-5 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-bold tracking-[0.12em] ${
                    active === link.id
                      ? "bg-black/[0.04] text-[#D6453D]"
                      : "text-[#666666]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
