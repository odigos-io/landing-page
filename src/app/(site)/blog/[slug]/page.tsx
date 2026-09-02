import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/libs/markdown';
import { LandingHeader, LandingBlogPost, LandingBlogs, LandingCTA, LandingFooter } from '@/containers/landing';
import { ldScript } from '@/constants';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);
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
    const blog = await getBlogBySlug(slug);
    if (!blog) notFound();

    const url = `https://odigos.io/blog/${slug}`;
    const published = blog.pubDate ? new Date(blog.pubDate).toISOString() : undefined;

    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: blog.title,
      description: blog.metadata || blog.description,
      image: blog.image ? `https://odigos.io${blog.image}` : 'https://odigos.io/og.png',
      author: blog.author ? { '@type': 'Person', name: blog.author } : { '@id': 'https://odigos.io/#organization' },
      publisher: { '@id': 'https://odigos.io/#organization' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'en-US',
      ...(published ? { datePublished: published, dateModified: published } : {}),
      ...(blog.tags?.length ? { keywords: blog.tags.join(', ') } : {}),
    };

    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Odigos', item: 'https://odigos.io' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://odigos.io/blog' },
        { '@type': 'ListItem', position: 3, name: blog.title, item: url },
      ],
    };

    return (
      <div className='landing-root'>
        <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(articleLd)} />
        <script type='application/ld+json' dangerouslySetInnerHTML={ldScript(breadcrumbLd)} />
        <LandingHeader />
        <main>
          <LandingBlogPost blog={blog} />
          <LandingBlogs exclude={slug} title='More from the blog.' />
          <LandingCTA />
        </main>
        <LandingFooter />
      </div>
    );
  } catch {
    notFound();
  }
};

export default Blog;
