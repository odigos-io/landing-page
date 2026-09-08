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

export type FeatureItem = {
  cap: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
  tags: string[];
};

/* Home: what production context has to be before an agent can act on it.
   Written for the people who buy the platform, not the people who wire it. */
const FEATURES: FeatureItem[] = [
  {
    cap: 'Complete',
    title: 'Every service on day one. Even the ones nobody owns.',
    desc: 'One install covers the estate: the modern services, the fifteen-year-old Java, the stripped Go binaries most tools skip, the third-party code with no owner. No code changes, no rollout program, no team left to instrument by hand. Whoever asks sees all of production, not the parts someone got to.',
    visual: <BinaryVisual />,
    tags: ['every language', 'legacy and modern', 'no code changes'],
  },
  {
    cap: 'Odigos Autofocus',
    title: 'It senses where the fire is, and looks there first.',
    desc: 'The moment a service drifts, Odigos Autofocus starts capturing deeper evidence on that path: what the code did, with what inputs, on the requests that failed. By the time anyone asks, the answer is already there. Ask about anything else and it captures that too, in seconds, with no redeploy. Inside the limits your team approved, every capture audited.',
    visual: <AiVisual />,
    tags: ['Autofocus', 'answered in seconds', 'no redeploys'],
  },
  {
    cap: 'Safe',
    title: 'Out of process. Out of your blast radius.',
    desc: 'Odigos never enters your process. A bad question, or a bad release of ours, reaches our sensor and stops there. Every capture names the workload and the code it may read, has a named approver under role-based access, masks sensitive values before anything leaves your cluster, and lands in your audit trail. AI agents work inside the same limits as your engineers, and every question they ask is logged. Policies are written and approved by people.',
    visual: <SafeVisual />,
    tags: ['out of process', 'named approver', 'audited, masked in-cluster'],
  },
];

/* Technology page: the same three rows, written for engineers. */
export const TECH_FEATURES: FeatureItem[] = [
  {
    cap: 'A different kind of eBPF',
    title: 'eBPF was built for the kernel. We made it see inside the application.',
    desc: 'Off-the-shelf eBPF sees syscalls and network traffic. Ours reads inside the process: the functions that ran, the queries they made, the arguments they carried. Including a stripped, statically linked Go binary, which is the case most tools give up on. Nothing loads into your application to do it.',
    visual: <BinaryVisual />,
    tags: ['Odigos DeepBPF', 'every language', 'function-level depth'],
  },
  {
    cap: 'Odigos Autofocus',
    title: 'It follows the drift into the code before anyone asks.',
    desc: 'When a service starts to degrade, Autofocus moves capture onto that path on its own: the functions that ran, their arguments, what they returned, the calls underneath. Point at any other function and it captures that too, inside running production, in seconds. Scope, masking and approval are set once by your team; every capture lands in the audit trail.',
    visual: <AiVisual />,
    tags: ['Autofocus', 'no redeploys', 'safe in production'],
  },
  {
    cap: 'Safe on all of production',
    title: 'Out of process. Out of your blast radius.',
    desc: 'Other ways of getting this depth run inside your process, one bad agent release away from taking the app down with it. Ours never touches your process. Under 1% CPU, safe to leave on across the whole estate, with RBAC and policy controls over what may be captured and by whom.',
    visual: <SafeVisual />,
    tags: ['out of process', 'no agent in your app', 'RBAC & governance'],
  },
];

type RowsProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  items: FeatureItem[];
};

export const FeatureRows = ({ eyebrow, title, lede, items }: RowsProps) => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title}</h2>
            {lede && <p>{lede}</p>}
          </Head>
        </Reveal>

        <Rows>
          {items.map((f, i) => (
            <Reveal key={f.title}>
              <Row $flip={i % 2 === 1}>
                <Text className='text'>
                  <span className='idx'>
                    {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
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

export const LandingFeatures = () => (
  <FeatureRows
    eyebrow='What production context means'
    title='Three things telemetry was never built to do.'
    lede='They decide whether production answers, or someone guesses. For an engineer, a security policy, or the agent that wrote the code.'
    items={FEATURES}
  />
);
