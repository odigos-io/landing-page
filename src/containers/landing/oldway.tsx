'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 96px;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const Head = styled.div`
  max-width: 760px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 4vw, 50px);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  h2 .mute {
    color: var(--ink-faint);
  }
  p {
    margin: 20px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 600px;
  }
`;

const Cols = styled.div`
  margin-top: 56px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    margin-top: 40px;
  }
`;

const ColCard = styled.div<{ $new?: boolean }>`
  padding: 34px 32px;
  position: relative;
  background: ${({ $new }) => ($new ? 'var(--paper-2)' : 'var(--paper-3)')};
  border-right: 1px solid var(--line);
  @media (max-width: 820px) {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
  &:last-child {
    border-right: none;
    border-bottom: none;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $new }) => ($new ? 'var(--signal)' : 'var(--ink-faint)')};
  }
  h3 {
    margin: 14px 0 24px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ $new }) => ($new ? 'var(--ink)' : 'var(--ink-mute)')};
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.li<{ $new?: boolean }>`
  display: flex;
  gap: 13px;
  align-items: flex-start;
  font-size: 15.5px;
  line-height: 1.45;
  color: ${({ $new }) => ($new ? 'var(--ink-soft)' : 'var(--ink-mute)')};
  .ic {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    background: ${({ $new }) => ($new ? 'var(--signal-soft)' : 'rgba(18,18,21,0.05)')};
    color: ${({ $new }) => ($new ? 'var(--signal)' : 'var(--ink-faint)')};
  }
  ${({ $new }) => !$new && 'text-decoration: none;'}
`;

const Cross = () => (
  <svg width='12' height='12' viewBox='0 0 14 14' fill='none' aria-hidden>
    <path d='M3.5 3.5l7 7M10.5 3.5l-7 7' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);
const Check = () => (
  <svg width='13' height='13' viewBox='0 0 14 14' fill='none' aria-hidden>
    <path d='M2.5 7.4 5.6 10.5 11.5 3.5' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const OLD = [
  'A graph fused from tools that were never wired for this',
  'What gets collected was frozen months ago',
  'Blind to anything nobody thought to capture',
  'A code change and a deploy to add one missing signal',
];

const NEW = [
  'Ask production directly, while the incident is still open',
  'The missing signal captured live, from the kernel, in seconds',
  'Any function, any query, any language, on demand',
  'No code change, no redeploy, safe across all of production',
];

export const LandingOldWay = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>The problem</Eyebrow>
            <h2>
              Everyone is bolting AI onto <span className='mute'>a 2005 data pipeline.</span>
            </h2>
            <p>Fuse the code repo, the ticket queue and the observability vendor into one graph, run a model over it, and hope it sees past the gaps. It cannot. A model cannot see what was never captured. The only fix is to go and capture it, live, at the moment the question comes up.</p>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Cols>
            <ColCard>
              <span className='tag'>
                <Cross /> Everyone else
              </span>
              <h3>The static bet</h3>
              <List>
                {OLD.map((t) => (
                  <Item key={t}>
                    <span className='ic'>
                      <Cross />
                    </span>
                    {t}
                  </Item>
                ))}
              </List>
            </ColCard>

            <ColCard $new>
              <span className='tag'>
                <Check /> With Odigos
              </span>
              <h3>The Odigos loop</h3>
              <List>
                {NEW.map((t) => (
                  <Item key={t} $new>
                    <span className='ic'>
                      <Check />
                    </span>
                    {t}
                  </Item>
                ))}
              </List>
            </ColCard>
          </Cols>
        </Reveal>
      </Inner>
    </Section>
  );
};
