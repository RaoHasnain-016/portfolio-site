export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url?: string | null;
  tags: string[];
  published: boolean;
  published_at?: string | null;
};
