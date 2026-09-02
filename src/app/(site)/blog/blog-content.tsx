'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useBlogs } from '@/contexts';
import type { BlogPost } from '@/types';
import { aggregateTags, calculateReadingTime, getPlaceholderImage, isValidImageSrc } from '@/functions';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, TrialCTA, DemoCTA } from '@/containers/landing/primitives';

const ALL_TAG = 'All';

/* ----------------------------------------------------------------
   Hero
----------------------------------------------------------------- */
const Hero = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeroInner = styled(Container)`
  padding-top: 104px;
  padding-bottom: 56px;
  @media (max-width: 1000px) {
    padding-top: 72px;
    padding-bottom: 40px;
  }
`;

const HeroHead = styled.div`
  max-width: 720px;
  h1 {
    margin: 18px 0 0;
    font-size: clamp(32px, 4.4vw, 50px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin: 18px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

/* ----------------------------------------------------------------
   Filter chips
----------------------------------------------------------------- */
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 36px;
`;

const Chip = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 7px 13px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--ink)' : 'var(--line-strong)')};
  background: ${({ $active }) => ($active ? 'var(--ink)' : 'var(--paper-2)')};
  color: ${({ $active }) => ($active ? 'var(--paper-2)' : 'var(--ink-mute)')};
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;

  &:hover {
    border-color: ${({ $active }) => ($active ? 'var(--ink)' : 'var(--ink)')};
    color: ${({ $active }) => ($active ? 'var(--paper-2)' : 'var(--ink)')};
  }

  .count {
    font-size: 10.5px;
    color: ${({ $active }) => ($active ? 'rgba(255,255,255,0.6)' : 'var(--ink-faint)')};
  }
`;

/* ----------------------------------------------------------------
   Posts grid
----------------------------------------------------------------- */
const PostsSection = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const PostsInner = styled(Container)`
  padding-top: 48px;
  padding-bottom: 96px;
  @media (max-width: 1000px) {
    padding-top: 32px;
    padding-bottom: 64px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }

  &:hover .cover img {
    transform: scale(1.03);
  }

  .cover {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--paper-3);
    border-bottom: 1px solid var(--line);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 24px 24px 26px;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-faint);

    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--line-strong);
    }

    .bold {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--accent);

      &::before {
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--accent);
      }
    }
  }

  h3 {
    margin: 14px 0 0;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.24;
    color: var(--ink);
  }

  p {
    margin: 11px 0 0;
    font-size: 14.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--ink);

    svg {
      transition: transform 0.2s ease;
    }
  }

  &:hover .more svg {
    transform: translateX(3px);
  }
`;

const Empty = styled.div`
  padding: 64px 24px;
  text-align: center;
  font-size: 16px;
  color: var(--ink-mute);
`;

/* ----------------------------------------------------------------
   Closing CTA
----------------------------------------------------------------- */
const CtaSection = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;

const CtaInner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 96px;
  text-align: center;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const CtaHead = styled.div`
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 44px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  p {
    margin: 18px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

/* ----------------------------------------------------------------
   Card with image-error fallback
----------------------------------------------------------------- */
const PostCard = ({ slug, image, title, description, content, readingTime, pubDate, boldTag }: BlogPost) => {
  const [imageInvalid, setImageInvalid] = useState(false);
  const [placeholder] = useState(getPlaceholderImage);
  const cover = !imageInvalid && image && isValidImageSrc(image) ? image : placeholder;

  const excerpt = description.length > 160 ? `${description.substring(0, 160).trimEnd()}...` : description;

  return (
    <Card href={`/blog/${slug}`}>
      <div className='cover'>
        <img src={cover} alt={title} loading='lazy' onError={() => setImageInvalid(true)} />
      </div>
      <div className='body'>
        <div className='meta'>
          {readingTime && <span>{readingTime}</span>}
          {content && pubDate && <span className='dot' />}
          {pubDate && <span>{new Date(pubDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>}
          {boldTag && <span className='bold'>{boldTag}</span>}
        </div>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <span className='more'>
          Read article
          <svg width='15' height='15' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
            <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </span>
      </div>
    </Card>
  );
};

export const BlogContent = () => {
  const { blogs } = useBlogs();
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  const tags = useMemo(() => aggregateTags(blogs).slice(0, 8), [blogs]);

  const filteredBlogs = useMemo(() => {
    if (activeTag === ALL_TAG) return blogs;
    return blogs.filter((blog) => blog.tags?.some((tag) => tag.toLowerCase() === activeTag));
  }, [blogs, activeTag]);

  return (
    <div className='landing-root'>
      <LandingHeader />

      <main>
        <Hero>
          <HeroInner>
            <Reveal>
              <HeroHead>
                <Eyebrow>Odigos blog</Eyebrow>
                <h1>Insights on observability, OpenTelemetry, and the AI era.</h1>
                <p>Deep dives, engineering notes, and product updates from the team building distributed tracing without code changes.</p>
              </HeroHead>
            </Reveal>

            {tags.length > 0 && (
              <Reveal delay={80}>
                <Filters>
                  <Chip $active={activeTag === ALL_TAG} onClick={() => setActiveTag(ALL_TAG)}>
                    {ALL_TAG}
                    <span className='count'>{blogs.length}</span>
                  </Chip>
                  {tags.map(({ tag, count }) => (
                    <Chip key={tag} $active={activeTag === tag} onClick={() => setActiveTag(tag)}>
                      {tag}
                      <span className='count'>{count}</span>
                    </Chip>
                  ))}
                </Filters>
              </Reveal>
            )}
          </HeroInner>
        </Hero>

        <PostsSection>
          <PostsInner>
            {filteredBlogs.length === 0 ? (
              <Empty>No articles match this topic yet. Check back soon.</Empty>
            ) : (
              <Grid>
                {filteredBlogs.map((blog, i) => (
                  <Reveal key={blog.slug} delay={(i % 3) * 60}>
                    <PostCard {...blog} />
                  </Reveal>
                ))}
              </Grid>
            )}
          </PostsInner>
        </PostsSection>

        <CtaSection>
          <CtaInner>
            <Reveal>
              <CtaHead>
                <Eyebrow>Start now</Eyebrow>
                <h2>See your traces in minutes, not sprints.</h2>
                <p>Instrument every service with OpenTelemetry and no code changes. Start a free trial or talk to our team.</p>
                <CtaActions>
                  <TrialCTA />
                  <DemoCTA />
                </CtaActions>
              </CtaHead>
            </Reveal>
          </CtaInner>
        </CtaSection>
      </main>

      <LandingFooter />
    </div>
  );
};
