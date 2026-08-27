'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from './primitives';

/* Why head and tail sampling cannot work for AI workflows: the decision has to
   happen mid-flow, and only dynamic instrumentation can make it there. */

const Section = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 104px;
  padding-bottom: 104px;
  @media (max-width: 1000px) {
    padding-top: 68px;
    padding-bottom: 68px;
  }
`;

const Head = styled.div`
  max-width: 660px;
  h2 {
    margin: 14px 0 0;
    font-size: clamp(28px, 3.6vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.032em;
    font-weight: 600;
    color: var(--ink);
    .mute {
      color: var(--ink-faint);
    }
  }
  p {
    margin: 18px 0 0;
    font-size: 17px;
    line-height: 1.62;
    color: var(--ink-soft);
  }
`;

const Board = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 28px;
  align-items: stretch;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Chart = styled.div`
  position: relative;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  padding: 22px 24px 18px;
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .lbl {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 8.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    fill: var(--ink-faint);
  }
  .step {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 8.5px;
    fill: var(--ink-mute);
  }
  .mark {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 9px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 12px;
`;

const Card = styled.div<{ $win?: boolean }>`
  border: 1px solid ${(p) => (p.$win ? 'rgba(17,168,119,0.34)' : 'var(--line)')};
  background: ${(p) => (p.$win ? 'var(--signal-soft)' : 'var(--paper-2)')};
  border-radius: var(--r);
  padding: 16px 18px;
  .top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
  }
  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .when {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${(p) => (p.$win ? '#0e9a6c' : 'var(--ink-faint)')};
  }
  p {
    margin: 7px 0 0;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--ink-soft);
  }
`;

/* the workflow, as a waterfall of steps. The wrong turn happens at step 8. */
const STEPS = [
  { t: 'user request', x: 0, w: 13 },
  { t: 'llm · plan', x: 6, w: 15 },
  { t: 'tool · search', x: 15, w: 12 },
  { t: 'llm · reason', x: 24, w: 16 },
  { t: 'tool · fetch', x: 34, w: 11 },
  { t: 'sub-agent · research', x: 42, w: 18 },
  { t: 'llm · summarize', x: 54, w: 13 },
  { t: 'tool · db query', x: 63, w: 10, bad: true },
  { t: 'llm · retry', x: 70, w: 14 },
  { t: 'tool · alternate', x: 80, w: 11 },
  { t: 'llm · final answer', x: 87, w: 13 },
];

const X0 = 122;
const XW = 272;
const px = (v: number) => X0 + (v / 100) * XW;

export const LandingMidFlow = () => {
  const badX = px(STEPS[7].x);
  return (
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>LLM observability</Eyebrow>
            <h2>
              You sample at the start or the end. <span className='mute'>AI workflows fail in the middle.</span>
            </h2>
            <p>An agent run is long, multi-step and unpredictable. Head sampling decides before the failure exists. Tail sampling decides after the trace is over, and holds every workflow in memory to get there. The decision has to happen mid-flow, and only capture that can change while the run is still going gets there in time.</p>
          </Head>
        </Reveal>

        <Board>
          <Reveal delay={60}>
            <Chart>
              <svg viewBox='0 0 420 210' fill='none' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='An AI workflow of eleven steps. Head sampling decides at the start, before the failure exists. Odigos escalates capture at the failing step. Tail sampling decides only after the workflow ends.'>
                <text className='lbl' x='0' y='12'>
                  ai workflow · ~4 min
                </text>
                <text className='lbl' x={X0} y='12'>
                  start
                </text>
                <text className='lbl' x={X0 + XW} y='12' textAnchor='end'>
                  end
                </text>

                {/* head / odigos / tail decision rails */}
                <line x1={X0} y1='18' x2={X0} y2='196' stroke='var(--line-strong)' strokeDasharray='3 4' />
                <line x1={X0 + XW} y1='18' x2={X0 + XW} y2='196' stroke='var(--line-strong)' strokeDasharray='3 4' />
                <line x1={badX} y1='18' x2={badX} y2='196' stroke='#11a877' strokeWidth='1.4' />

                {STEPS.map((s, i) => {
                  const y = 26 + i * 15;
                  return (
                    <g key={s.t}>
                      <text className='step' x='0' y={y + 8}>
                        {s.t}
                      </text>
                      <rect x={px(s.x)} y={y} width={(s.w / 100) * XW} height={9} rx={3} fill={s.bad ? '#ff3d7a' : 'rgba(24,20,54,0.16)'} />
                    </g>
                  );
                })}

                <circle cx={badX} cy={26 + 7 * 15 + 4.5} r='6' fill='none' stroke='#ff3d7a' strokeWidth='1.4' />
                <text className='mark' x={badX + (STEPS[7].w / 100) * XW + 9} y={26 + 7 * 15 + 8} fill='#c9346a'>
                  wrong turn
                </text>

                <text className='mark' x={X0} y='206' fill='var(--ink-faint)'>
                  head
                </text>
                <text className='mark' x={badX} y='206' fill='#0e9a6c' textAnchor='middle'>
                  odigos
                </text>
                <text className='mark' x={X0 + XW} y='206' fill='var(--ink-faint)' textAnchor='end'>
                  tail
                </text>
              </svg>
            </Chart>
          </Reveal>

          <Reveal delay={120}>
            <Cards>
              <Card>
                <div className='top'>
                  <h3>Head sampling</h3>
                  <span className='when'>0:00</span>
                </div>
                <p>Decides before there is anything to decide on. Blind by construction, and the interesting 0.1% is gone.</p>
              </Card>
              <Card $win>
                <div className='top'>
                  <h3>Odigos</h3>
                  <span className='when'>2:37 · live</span>
                </div>
                <p>Capture escalates the instant the run goes wrong. Deep only where it matters, no buffering, nothing decided in advance.</p>
              </Card>
              <Card>
                <div className='top'>
                  <h3>Tail sampling</h3>
                  <span className='when'>4:00</span>
                </div>
                <p>Holds every workflow in memory start to finish, then decides. Correct, and it does not scale past a few thousand runs.</p>
              </Card>
            </Cards>
          </Reveal>
        </Board>
      </Inner>
    </Section>
  );
};
