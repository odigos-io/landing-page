'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FAQ } from '@/constants';
import { Container, Eyebrow, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 92px;
  padding-bottom: 92px;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 56px;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Head = styled.div`
  position: sticky;
  top: 96px;
  @media (max-width: 900px) {
    position: static;
  }
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.08;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
  }
  p {
    margin: 18px 0 0;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--ink-mute);
    max-width: 34ch;
  }
`;

const List = styled.div`
  border-top: 1px solid var(--line);
`;

const Item = styled.div`
  border-bottom: 1px solid var(--line);
`;

const Q = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 4px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-display), sans-serif;
  font-size: 18px;
  font-weight: 550;
  letter-spacing: -0.01em;
  color: ${({ $open }) => ($open ? 'var(--ink)' : 'var(--ink-soft)')};
  transition: color 0.18s ease;
  &:hover {
    color: var(--ink);
  }
`;

const Icon = styled.span<{ $open: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 1.8px;
    background: var(--ink);
    border-radius: 2px;
    transform: translate(-50%, -50%);
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(${({ $open }) => ($open ? '0deg' : '90deg')});
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
`;

const A = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  & > div {
    overflow: hidden;
  }
  p {
    margin: 0;
    padding: 0 60px 26px 4px;
    font-size: 16px;
    line-height: 1.65;
    color: var(--ink-mute);
    @media (max-width: 560px) {
      padding-right: 4px;
    }
  }
`;

export const LandingFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>Questions, answered</Eyebrow>
            <h2>The things engineering leaders ask first.</h2>
          </Head>
        </Reveal>

        <Reveal delay={70}>
          <List>
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <Item key={f.title}>
                  <Q $open={isOpen} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.title}
                    <Icon $open={isOpen} />
                  </Q>
                  <A $open={isOpen}>
                    <div>
                      <p>{f.description}</p>
                    </div>
                  </A>
                </Item>
              );
            })}
          </List>
        </Reveal>
      </Inner>
    </Section>
  );
};
