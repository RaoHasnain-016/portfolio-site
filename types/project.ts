export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  image_url: string | null;
  screenshot_urls: string[];
  github_url: string | null;
  live_demo_url: string | null;
  tech_stack: string[];
  created_at: string;
};

export type ProjectInput = {
  title: string;
  slug: string;
  description: string;
  long_description?: string | null;
  image_url?: string | null;
  screenshot_urls?: string[];
  github_url?: string | null;
  live_demo_url?: string | null;
  tech_stack: string[];
};
