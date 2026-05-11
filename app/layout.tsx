import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Hasnain | Full Stack Developer",
  description:
    "A premium animated full-stack developer portfolio with refined UI, project case studies, Supabase admin workflows, and a contact form.",
  keywords: ["Full Stack Developer", "Next.js Portfolio", "Supabase", "React Developer", "TypeScript"],
  openGraph: {
    title: "Muhammad Hasnain | Full Stack Developer",
    description:
      "Premium personal brand portfolio for full-stack development, polished interfaces, and production-ready web systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F6F1EA]">
      <body>{children}</body>
    </html>
  );
}
