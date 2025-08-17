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

export interface EventPost {
  slug: string;
  pubDate: string;
  image?: string;
  title: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  booth?: string;
  content?: string;
}
