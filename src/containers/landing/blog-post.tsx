'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import type { BlogPost } from '@/types';
import { calculateReadingTime, isValidImageSrc } from '@/functions';
import { Container, Eyebrow } from './primitives';
import { Markdown, Prose } from './prose';
import { HtmlEmbed } from '@/components';

/* A blog post in the landing design language. The old one rendered the article
   on a black canvas with the shared dark chrome hidden, so posts arrived with
   no navigation and none of the identity the rest of the site now has. */

const Head = styled.header`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeadInner = styled(Container)`
  padding-top: 64px;
  padding-bottom: 44px;
  max-width: 820px;
  @media (max-width: 1000px) {
    padding-top: 40px;
  }
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mute);
  text-decoration: none;
  &:hover {
    color: var(--ink);
  }
`;

const Title = styled.h1`
  margin: 22px 0 0;
  font-size: clamp(32px, 4.4vw, 52px);
  line-height: 1.06;
  letter-spacing: -0.035em;
  font-weight: 600;
  color: var(--ink);
`;

const Dek = styled.p`
  margin: 18px 0 0;
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-soft);
`;

const Meta = styled.div`
  margin: 26px 0 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12.5px;
  color: var(--ink-mute);
  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--line-strong);
  }
  .who {
    color: var(--ink);
  }
`;

const Tags = styled.div`
  margin: 22px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  span {
    padding: 5px 10px;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
`;

const Cover = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 28px 0;
  img {
    width: 100%;
    height: auto;
    border-radius: var(--r-lg);
    border: 1px solid var(--line);
    display: block;
  }
  @media (max-width: 1000px) {
    padding: 24px 20px 0;
  }
`;

/* the article body. @uiw/react-markdown-preview ships its own dark canvas, so
   this pins it to light and then dresses it in the landing type scale. */
const Body = styled(Container)`
  max-width: 820px;
  padding-top: 44px;
  padding-bottom: 72px;
`;

const fmt = (d?: string) => {
  if (!d) return null;
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};

export const LandingBlogPost = ({ blog }: { blog: BlogPost }) => {
  const date = fmt(blog.pubDate);
  const cover = blog.webCoverImage || blog.image;
  const tags = (blog.tags || []).slice(0, 4);

  return (
    <>
      <Head>
        <HeadInner>
          <Back href='/blog'>← all posts</Back>
          {blog.category && (
            <div style={{ marginTop: 20 }}>
              <Eyebrow>{blog.category}</Eyebrow>
            </div>
          )}
          <Title>{blog.title}</Title>
          {blog.description && <Dek>{blog.description}</Dek>}
          <Meta>
            {blog.author && <span className='who'>{blog.author}</span>}
            {blog.author && date && <span className='dot' />}
            {date && <span>{date}</span>}
            {blog.content && <span className='dot' />}
            {blog.content && <span>{calculateReadingTime(blog.content)}</span>}
          </Meta>
          {!!tags.length && (
            <Tags>
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </Tags>
          )}
        </HeadInner>
      </Head>

      {cover && isValidImageSrc(cover) && (
        <Cover>
          <Image src={cover} alt={blog.title} width={1600} height={900} priority sizes='(max-width: 1000px) 100vw, 980px' />
        </Cover>
      )}

      <Body>
        <Prose>
          <Markdown content={blog.content} />
          {blog.customHtml && <HtmlEmbed html={blog.customHtml} />}
        </Prose>
      </Body>
    </>
  );
};
