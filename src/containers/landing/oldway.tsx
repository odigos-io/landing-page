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
    font-size: clamp(28px, 3.6vw, 46px);
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

const Ledger = styled.div`
  margin-top: 52px;
  @media (max-width: 1000px) {
    margin-top: 38px;
  }

  .cap {
    max-width: 620px;
    font-size: 16.5px;
    line-height: 1.55;
    color: var(--ink-mute);
    margin: 0 0 22px;
  }
`;

const Table = styled.div`
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
`;

const HeadRow = styled.div`
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 24px;
  padding: 14px 28px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 12px 20px;
  }
`;

const Row = styled.div<{ $ours?: boolean }>`
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 24px;
  align-items: baseline;
  padding: 22px 28px;
  border-bottom: 1px solid var(--line);
  background: ${({ $ours }) => ($ours ? 'var(--paper-2)' : 'transparent')};
  box-shadow: ${({ $ours }) => ($ours ? 'inset 3px 0 0 var(--accent)' : 'none')};
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 18px 20px;
  }

  .who {
    font-size: 16.5px;
    font-weight: ${({ $ours }) => ($ours ? 600 : 500)};
    letter-spacing: -0.01em;
    color: ${({ $ours }) => ($ours ? 'var(--ink)' : 'var(--ink-mute)')};
  }
  .need {
    font-size: 16px;
    line-height: 1.5;
    color: ${({ $ours }) => ($ours ? 'var(--ink)' : 'var(--ink-mute)')};
  }
  .need b {
    font-weight: 600;
    color: var(--ink);
  }
`;

const PREREQ: { who: string; need: React.ReactNode; ours?: boolean }[] = [
  { who: 'Datadog, Dynatrace', need: 'their agent compiled into the service, a runtime they support, and your source code linked to it' },
  { who: 'OpenTelemetry, remote config', need: 'a signal somebody already decided to expose' },
  { who: 'A new log line', need: 'a pull request, a review, a release, and the failure happening a second time' },
  {
    who: 'Odigos',
    need: (
      <>
        <b>the process is running</b>
      </>
    ),
    ours: true,
  },
];

export const LandingOldWay = () => {
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>Where every AI investigation stops</Eyebrow>
            <h2>
              Your agent is reading a transcript <span className='mute'>of a conversation it was never in.</span>
            </h2>
            <p>An agent investigates the way a good engineer does. It forms a hypothesis, tests it, throws it out and goes again, from the shape of the failure down to the one value that explains it. Every tool you can hand it breaks that loop at the first turn, because every tool returns a recording made months ago by somebody who did not know this incident was coming. So the agent writes a confident paragraph about what probably happened, and then tells you to add a log line.</p>
          </Head>
        </Reveal>

        <Reveal delay={80}>
          <Ledger>
            <p className='cap'>Plenty of tools can now push a question into a live process. Datadog and Dynatrace both ship it. What separates them is everything that had to be true before you were allowed to ask.</p>
            <Table>
              <HeadRow>
                <span>tool</span>
                <span>what has to be true before it answers</span>
              </HeadRow>
              {PREREQ.map((r) => (
                <Row key={r.who} $ours={r.ours}>
                  <span className='who'>{r.who}</span>
                  <span className='need'>{r.need}</span>
                </Row>
              ))}
            </Table>
          </Ledger>
        </Reveal>
      </Inner>
    </Section>
  );
};
