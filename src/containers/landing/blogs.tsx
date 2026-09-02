'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useBlogs } from '@/contexts';
import { getPlaceholderImage, isValidImageSrc } from '@/functions';
import { Container, Eyebrow, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 92px;
  padding-bottom: 92px;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
  h2 {
    margin: 16px 0 0;
    font-size: clamp(26px, 3.2vw, 38px);
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
`;

const More = styled(Link)`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 4px;
  transition: border-color 0.2s ease, gap 0.2s ease;
  &:hover {
    border-color: var(--ink);
    gap: 11px;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }
`;

const Cover = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background-color: var(--paper-3);
  border-bottom: 1px solid var(--line);
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const CardBody = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Meta = styled.div`
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.04em;
  color: var(--ink-mute);
  display: flex;
  gap: 10px;
  align-items: center;
  span.dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--line-strong);
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 19px;
  line-height: 1.28;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--ink-mute);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.span`
  margin-top: auto;
  padding-top: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 7px;
`;

export const LandingBlogs = ({ exclude, title = 'Latest from the blog.' }: { exclude?: string; title?: string } = {}) => {
  const { blogs } = useBlogs();
  // never offer a reader the post they are already on
  const posts = blogs.filter((b) => b.slug !== exclude).slice(0, 3);
  if (!posts.length) return null;

  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <div>
              <Eyebrow>From the team</Eyebrow>
              <h2>{title}</h2>
            </div>
            <More href='/blog'>
              All posts
              <svg width='15' height='15' viewBox='0 0 16 16' fill='none' aria-hidden>
                <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </More>
          </Head>
        </Reveal>

        <Grid>
          {posts.map((b, i) => {
            const cover = !b.image || !isValidImageSrc(b.image) ? getPlaceholderImage() : b.image;
            return (
              <Reveal key={b.slug} delay={i * 70}>
                <CardLink href={`/blog/${b.slug}`}>
                  <Cover>
                    <Image src={cover} alt='' fill loading='lazy' sizes='(max-width: 900px) 100vw, (max-width: 1200px) 33vw, 400px' />
                  </Cover>
                  <CardBody>
                    <Meta>
                      {b.readingTime && <span>{b.readingTime}</span>}
                      {b.pubDate && <span className='dot' />}
                      {b.pubDate && <span>{new Date(b.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>}
                    </Meta>
                    <CardTitle>{b.title}</CardTitle>
                    <CardDesc>{b.description}</CardDesc>
                    <ReadMore>
                      Read
                      <svg width='14' height='14' viewBox='0 0 16 16' fill='none' aria-hidden>
                        <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
                      </svg>
                    </ReadMore>
                  </CardBody>
                </CardLink>
              </Reveal>
            );
          })}
        </Grid>
      </Inner>
    </Section>
  );
};
