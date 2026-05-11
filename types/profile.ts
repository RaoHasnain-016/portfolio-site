export type PortfolioProfile = {
  id: string;
  first_name: string;
  last_name: string;
  eyebrow: string;
  roles: string[];
  hero_description: string;
  about_heading: string;
  about_body: string;
  profile_image_url: string;
  email: string;
  social_links: string[];
  skills: string[];
  marquee_items: string[];
  updated_at: string;
};

export type PortfolioProfileInput = Omit<PortfolioProfile, "id" | "updated_at">;
