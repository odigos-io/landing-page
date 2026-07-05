'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';
import { DepthVisual, SafeVisual, AiVisual } from './feature-visuals';

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
  max-width: 680px;
  margin-bottom: 72px;
  @media (max-width: 1000px) {
    margin-bottom: 48px;
  }
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
  aspect-ratio: 1.18 / 1;
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
    title: 'We built our own eBPF runtime.',
    desc: 'Not an off-the-shelf agent, not a generic eBPF tool. We engineered our own runtime to reconstruct the exact functions, queries, and dependencies behind every request, across every language, all the way down to the kernel. Nothing to instrument, nothing to redeploy.',
    visual: <DepthVisual />,
    tags: ['our own eBPF runtime', 'every language', 'kernel-level'],
  },
  {
    cap: 'Open by export',
    title: 'Your data leaves as OpenTelemetry.',
    desc: 'Everything Odigos captures exports as OpenTelemetry, so it is yours to send to any tool you already run. No proprietary format, no lock-in. It runs out of process at under 1% overhead, safe to leave on across production.',
    visual: <SafeVisual />,
    tags: ['OpenTelemetry export', '< 1% overhead', 'zero lock-in'],
  },
  {
    cap: 'Dynamic & enterprise-ready',
    title: 'Live context, for your team and your AI.',
    desc: 'Turn on visibility for any workload without a redeploy, and give your AI systems real runtime context to act on instead of guessing. RBAC, policy controls, and multi-environment management come standard.',
    visual: <AiVisual />,
    tags: ['no redeploys', 'agent-native', 'RBAC & governance'],
  },
];

export const LandingFeatures = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>Why Odigos</Eyebrow>
            <h2>Built from the kernel up.</h2>
            <p>Our own eBPF runtime reconstructs the full context behind every request, then exports it as OpenTelemetry you can send anywhere. Deep enough for engineers, open enough to never lock you in.</p>
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
