export interface BlogPost {
  slug: string;
  pubDate: string;
  author?: string;
  authorImage?: string;
  image?: string;
  webCoverImage?: string;
  mobileCoverImage?: string;
  title: string;
  description: string;
  metadata?: string;
  category?: string;
  tags?: string[];
  boldTag?: string;
  buttonText?: string;
  buttonLink?: string;
  content?: string;
}
