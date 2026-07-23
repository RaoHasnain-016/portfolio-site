import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defaultProfile } from "@/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: "M Hasnain | Full Stack Developer — MERN, Django & AI/ML",
  description:
    "Full Stack Developer specializing in MERN Stack, Django, Python, FastAPI, and AI/ML integration. Portfolio of Career Compass AI, DevConnect, Agentic QA, and production web systems.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "Django",
    "AI/ML Developer",
    "FastAPI",
    "Next.js Portfolio",
    "Muhammad Hasnain",
  ],
  openGraph: {
    title: "M Hasnain | Full Stack Developer — MERN, Django & AI/ML",
    description:
      "Full Stack Developer building AI-powered web platforms, MERN applications, and production-ready systems.",
    type: "website",
    url: "https://www.hasnainofficial.codes/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F6F1EA]">
      <head>
        <link rel="preload" as="image" href={defaultProfile.profile_image_url} fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
