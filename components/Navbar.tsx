"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderGit2,
  Mail,
  Menu,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

const links: {
  label: string;
  href: string;
  id: string;
  icon: LucideIcon;
}[] = [
  { label: "Profile", href: "#about", id: "about", icon: UserRound },
  { label: "Experience", href: "#experience", id: "experience", icon: BriefcaseBusiness },
  { label: "Selected Work", href: "#projects", id: "projects", icon: FolderGit2 },
  { label: "Technical Skills", href: "#skills", id: "skills", icon: Code2 },
  { label: "Case Notes", href: "/blog", id: "blog", icon: FileText },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
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
        <motion.a
          href="#home"
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-md border border-black/[0.08] bg-white/45 px-3 py-2 text-sm font-black uppercase text-[#111111] shadow-[0_12px_32px_rgba(17,17,17,0.06)]"
        >
          <span>MH</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#D6453D] text-white transition group-hover:rotate-6">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
        </motion.a>

        <nav className="hidden items-center gap-1 rounded-lg border border-black/[0.08] bg-white/40 p-1 shadow-[0_18px_48px_rgba(17,17,17,0.07)] backdrop-blur-xl md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = active === link.id;

            return (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`header-nav-button group relative overflow-hidden ${isActive ? "text-white" : "text-[#555555]"}`}
            >
              {isActive ? (
                <motion.span
                  layoutId="header-active-pill"
                  className="absolute inset-0 rounded-md bg-[#111111] shadow-[0_10px_24px_rgba(17,17,17,0.18)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#F0B429]" : "text-[#D6453D]"}`} />
              {link.label}
              </span>
            </motion.a>
            );
          })}
        </nav>

        <motion.button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="header-icon-button md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
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
              {links.map((link, index) => {
                const Icon = link.icon;
                const isActive = active === link.id;

                return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035, duration: 0.24 }}
                  whileTap={{ scale: 0.98 }}
                  className={`header-mobile-button ${
                    isActive
                      ? "bg-black/[0.04] text-[#D6453D]"
                      : "text-[#666666]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </motion.a>
                );
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
