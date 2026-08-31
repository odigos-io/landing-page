'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';
import { BinaryVisual, SafeVisual, AiVisual } from './feature-visuals';

const Section = styled.section`
  background: var(--paper-3);
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
  max-width: 680px;
  margin-bottom: 72px;
  @media (max-width: 1000px) {
    margin-bottom: 48px;
  }
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
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
    max-width: 560px;
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Row = styled.article<{ $flip: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 56px;
  padding: 36px 0;
  border-top: 1px solid var(--line);

  & > .text {
    order: ${({ $flip }) => ($flip ? 2 : 1)};
  }
  & > .visual {
    order: ${({ $flip }) => ($flip ? 1 : 2)};
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 0;
    & > .text,
    & > .visual {
      order: unset;
    }
  }
`;

const Text = styled.div`
  .idx {
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    color: var(--ink-faint);
  }
  h3 {
    margin: 16px 0 0;
    font-size: clamp(22px, 2.5vw, 29px);
    line-height: 1.14;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--ink);
    max-width: 16ch;
  }
  p {
    margin: 16px 0 0;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 46ch;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
`;

const Chip = styled.span`
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: var(--ink-mute);
  padding: 6px 11px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--paper-2);
`;

const Panel = styled.div`
  position: relative;
  border-radius: var(--r-lg);
  background: linear-gradient(180deg, var(--paper-2), var(--paper));
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  aspect-ratio: 1.45 / 1;
  @media (max-width: 700px) {
    /* the fixed-size visuals overflow a short panel on a phone, and the caption
       is absolutely positioned so content has to be pushed clear of it */
    aspect-ratio: auto;
    min-height: 280px;
    padding: 46px 14px 24px;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 38px 38px;
    -webkit-mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent 78%);
    mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent 78%);
  }
`;

const PanelCap = styled.div`
  position: absolute;
  top: 14px;
  left: 16px;
  z-index: 2;
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--signal);
  }
`;

const FEATURES = [
  {
    cap: 'A different kind of eBPF',
    title: 'eBPF was built for the kernel. We made it see inside the application.',
    desc: 'Off-the-shelf eBPF sees syscalls and network traffic. Ours reads inside the process: the functions that ran, the queries they made, the arguments they carried. Including a stripped, statically linked Go binary, which is the case every other approach gives up on. Nothing loads into your application to do it.',
    visual: <BinaryVisual />,
    tags: ['our own eBPF runtime', 'every language', 'function-level depth'],
  },
  {
    cap: 'Captured on demand',
    title: 'Decide what to capture while the incident is still open.',
    desc: 'Point at a function nobody ever set up to be watched, and Odigos starts capturing it inside running production: its arguments, what it returned, the calls underneath it. Seconds, not a deploy cycle. This is the whole difference between an agent that can investigate and a model that has to guess.',
    visual: <AiVisual />,
    tags: ['no redeploys', 'captured on demand', 'safe in production'],
  },
  {
    cap: 'Safe on all of production',
    title: 'Out of process. Out of your blast radius.',
    desc: 'Every other way of getting this depth runs inside your process, one bad agent release away from taking the app down with it. Ours never touches your process. Under 1% CPU, safe to leave on across the whole estate, with RBAC and policy controls over what may be captured and by whom.',
    visual: <SafeVisual />,
    tags: ['out of process', 'no agent in your app', 'RBAC & governance'],
  },
];

export const LandingFeatures = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>The part that took years</Eyebrow>
            <h2>Everyone else&rsquo;s eBPF stops at the syscall.</h2>
            <p>Our own eBPF runtime reads what is actually happening inside a running process. Whatever you ask for, it captures on demand and exports as OpenTelemetry.</p>
          </Head>
        </Reveal>

        <Rows>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title}>
              <Row $flip={i % 2 === 1}>
                <Text className='text'>
                  <span className='idx'>{String(i + 1).padStart(2, '0')} / 03</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <Tags>
                    {f.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </Tags>
                </Text>
                <div className='visual'>
                  <Panel>
                    <PanelCap>{f.cap}</PanelCap>
                    {f.visual}
                  </Panel>
                </div>
              </Row>
            </Reveal>
          ))}
        </Rows>
      </Inner>
    </Section>
  );
};
