import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/libs/markdown';
import { BlogSingle, Hero3, LearnMoreBlogs } from '@/containers';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = getBlogBySlug(slug);
    if (!blog) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    const baseUrl = 'https://odigos.io';
    const blogUrl = `${baseUrl}/blog/${slug}`;
    const imageUrl = blog.image || `${baseUrl}/assets/odigos/logo_white_filled.svg`;

    return {
      title: `${blog.title} | Odigos Blog`,
      description: blog.metadata || blog.description,
      keywords: blog.tags || ['Odigos', 'Observability', 'OpenTelemetry'],
      authors: blog.author ? [{ name: blog.author }] : undefined,
      openGraph: {
        title: blog.title,
        description: blog.metadata || blog.description,
        url: blogUrl,
        siteName: 'Odigos',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: blog.pubDate,
        authors: blog.author ? [blog.author] : undefined,
        tags: blog.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.metadata || blog.description,
        images: [imageUrl],
        creator: blog.author ? `@${blog.author.replace(/\s+/g, '').toLowerCase()}` : '@odigos_io',
      },
      alternates: {
        canonical: blogUrl,
      },
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

const Blog = async ({ params }: BlogPageProps) => {
  const { slug } = await params;

  try {
    const blog = getBlogBySlug(slug);
    if (!blog) notFound();

    return (
      <>
        <BlogSingle blog={blog} />
        <LearnMoreBlogs title='Related Articles' />
        <Hero3 />
      </>
    );
  } catch {
    notFound();
  }
};

export default Blog;
