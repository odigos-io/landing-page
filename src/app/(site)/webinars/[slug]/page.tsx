import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWebinarBySlug } from '@/libs/markdown';
import { WebinarSingle, Hero3 } from '@/containers';

interface WebinarPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: WebinarPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const webinar = await getWebinarBySlug(slug);
    if (!webinar) {
      return {
        title: 'Webinar Not Found',
        description: 'The requested webinar could not be found.',
      };
    }

    const baseUrl = 'https://odigos.io';
    const webinarUrl = `${baseUrl}/webinars/${slug}`;
    const imageUrl = webinar.image || `${baseUrl}/assets/odigos/logo_white_filled.svg`;

    return {
      title: `${webinar.title} | Odigos Webinars`,
      description: webinar.title,
      openGraph: {
        title: webinar.title,
        description: webinar.title,
        url: webinarUrl,
        siteName: 'Odigos',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: webinar.title }],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: webinar.title,
        description: webinar.title,
        images: [imageUrl],
      },
      alternates: {
        canonical: webinarUrl,
      },
    };
  } catch {
    return {
      title: 'Webinar Not Found',
      description: 'The requested webinar could not be found.',
    };
  }
}

const Webinar = async ({ params }: WebinarPageProps) => {
  const { slug } = await params;

  try {
    const webinar = await getWebinarBySlug(slug);
    if (!webinar) notFound();

    return (
      <>
        <WebinarSingle webinar={webinar} />
        <Hero3 />
      </>
    );
  } catch {
    notFound();
  }
};

export default Webinar;
