'use client';

import React from 'react';
import styled from 'styled-components';
import { Container, Eyebrow, Reveal } from '@/containers/landing/primitives';
import { DeployScene, Scene, TOOLS } from './security-figures';
import { NoShadowArt, ConstellationArt, XrayArt, ThreeCutsArt } from './security-card-art';

/* Four things, in the home page's card language: text beside a panel,
   alternating, each panel one compact picture. */

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
  max-width: 880px;
  margin-bottom: 64px;
  @media (max-width: 1000px) {
    margin-bottom: 44px;
  }
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--ink);
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
  > * {
    min-width: 0;
  }
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
    max-width: 22ch;
  }
  h3 .mute {
    color: var(--ink-faint);
  }
  p {
    margin: 16px 0 0;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 46ch;
  }
`;


const Panel = styled.div`
  position: relative;
  border-radius: var(--r-lg);
  background: linear-gradient(180deg, var(--paper-2), var(--paper));
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  aspect-ratio: 1.45 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 18px 14px;
  @media (max-width: 700px) {
    aspect-ratio: auto;
    min-height: 240px;
    padding: 40px 10px 12px;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 38px 38px;
    -webkit-mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent 78%);
    mask-image: radial-gradient(80% 80% at 50% 50%, #000, transparent 78%);
  }
  > * {
    position: relative;
    z-index: 1;
  }
  /* every panel is the same box; the art scales to fit it */
  > svg {
    height: 100%;
    width: auto;
    max-width: 100%;
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

/* ---- 1. what each tool sees ---- */
const Tiles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Tile = styled.div`
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper-2);
  overflow: hidden;
  .scene {
    display: block;
    width: 100%;
    aspect-ratio: 120 / 64;
  }
  .cap {
    display: flex;
    gap: 8px;
    align-items: baseline;
    padding: 7px 10px 9px;
    border-top: 1px solid var(--line);
    font-size: 11px;
    line-height: 1.35;
    color: var(--ink-faint);
    b {
      font-family: var(--font-mono), monospace;
      font-size: 9.5px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--ink);
      flex: none;
    }
  }
`;

const ToolTiles = () => (
  <Tiles>
    {TOOLS.filter((t) => !t.us).map((t) => (
      <Tile key={t.k}>
        <Scene sees={t.sees} />
        <div className='cap'>
          <b>{t.k}</b>
          <span>{t.note}</span>
        </div>
      </Tile>
    ))}
  </Tiles>
);

/* ---- 2. one request, today ---- */
const Trace = styled.div`
  width: 100%;
  max-width: 460px;
  border: 1px solid rgba(201, 52, 106, 0.28);
  border-radius: 12px;
  background: var(--paper-2);
  box-shadow: var(--shadow-lift);
  overflow: hidden;
`;

const TraceHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 14px;
  border-bottom: 1px solid var(--line);
  background: rgba(201, 52, 106, 0.05);
  font-family: var(--font-mono), monospace;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--hot-ink);
  .n {
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink-faint);
  }
`;

const TraceRow = styled.div<{ $d: number; $tag?: string }>`
  display: grid;
  grid-template-columns: 44px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px ${({ $d }) => 14 + $d * 14}px;
  border-bottom: 1px solid var(--line);
  background: ${({ $tag }) => ($tag?.endsWith('refused') ? 'rgba(91,67,241,0.06)' : $tag ? 'rgba(201,52,106,0.05)' : 'transparent')};
  &:last-child {
    border-bottom: none;
  }
  .svc {
    font-family: var(--font-mono), monospace;
    font-size: 8.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8892ab;
  }
  .fn {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    color: ${({ $tag }) => ($tag?.endsWith('refused') ? 'var(--accent)' : $tag ? 'var(--hot-ink)' : 'var(--ink)')};
    overflow-wrap: anywhere;
  }
  .tag {
    font-family: var(--font-mono), monospace;
    font-size: 8.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 2px 7px;
    border-radius: 999px;
    color: ${({ $tag }) => ($tag?.endsWith('refused') ? '#fff' : 'var(--hot-ink)')};
    background: ${({ $tag }) => ($tag?.endsWith('refused') ? 'var(--accent)' : 'rgba(201,52,106,0.1)')};
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr auto;
    .svc {
      display: none;
    }
  }
`;

const OBSERVED = [
  { svc: 'edge', fn: 'POST /api/tickets', d: 0 },
  { svc: 'edge', fn: 'fetch(url)', d: 1, tag: 'ssrf' },
  { svc: 'api', fn: 'TicketController.create', d: 1 },
  { svc: 'api', fn: 'TemplateRenderer.render', d: 2 },
  { svc: 'api', fn: 'SpelExpressionParser.parse', d: 3, tag: 'new · cve' },
  { svc: 'api', fn: 'ReflectiveMethodExecutor.execute', d: 3, tag: 'new' },
  { svc: 'worker', fn: 'Job.run', d: 2, tag: 'zero-day · refused' },
];

const TraceCard = () => (
  <Trace>
    <TraceHead>
      <span>today · one request</span>
      <span className='n'>every line allowed on its own</span>
    </TraceHead>
    {OBSERVED.map((r, i) => (
      <TraceRow key={i} $d={r.d} $tag={r.tag}>
        <span className='svc'>{r.svc}</span>
        <span className='fn'>{r.fn}</span>
        {r.tag ? <span className='tag'>{r.tag}</span> : <span />}
      </TraceRow>
    ))}
  </Trace>
);

/* ---- 4. the finding, and the policy it becomes ---- */
const Finding = styled.div`
  width: 100%;
  max-width: 440px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper-2);
  box-shadow: var(--shadow-lift);
  overflow: hidden;
`;

const FindingBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 14px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), monospace;
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
  .hot {
    color: var(--hot-ink);
  }
`;

const Field = styled.div<{ $hot?: boolean }>`
  display: grid;
  grid-template-columns: 74px 1fr;
  gap: 10px;
  align-items: baseline;
  padding: 7px 14px;
  background: ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.06)' : 'transparent')};
  > * {
    min-width: 0;
  }
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .v {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    line-height: 1.45;
    overflow-wrap: anywhere;
    color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--ink)')};
  }
`;

const FindingFoot = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 14px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  color: var(--ink-faint);
  .act {
    color: var(--accent);
    font-weight: 500;
  }
`;

const EVIDENCE = [
  { k: 'service', v: 'tickets-api · java' },
  { k: 'function', v: 'SpelExpressionParser.parse' },
  { k: 'called with', v: '"${T(java.lang.System).getenv(\'DATABASE_URL\')}"', hot: true },
  { k: 'returned', v: '"postgres://svc_worker:••••••••@prod-db-01/appdb"', hot: true },
  { k: 'reached by', v: 'POST /api/tickets · an ordinary customer session' },
];

const FindingCard = () => (
  <Finding>
    <FindingBar>
      <span>finding · example</span>
      <span className='hot'>secret read · recorded</span>
    </FindingBar>
    {EVIDENCE.map((r) => (
      <Field key={r.k} $hot={r.hot}>
        <span className='k'>{r.k}</span>
        <span className='v'>{r.v}</span>
      </Field>
    ))}
    <FindingFoot>
      <span className='act'>block this call</span>
      <span>one function, no redeploy</span>
    </FindingFoot>
  </Finding>
);

/* ---- 3. where it attaches ---- */
const DeployWrap = styled.div`
  width: 100%;
  /* on a phone the drawing keeps its size and scrolls sideways inside the panel */
  @media (max-width: 700px) {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 6px;
    mask-image: linear-gradient(90deg, #000 calc(100% - 36px), transparent calc(100% - 6px));
    -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 36px), transparent calc(100% - 6px));
    > svg {
      min-width: 560px;
    }
  }
`;

const CARDS = [
  {
    cap: 'what your tools look for',
    title: (
      <>
        Your tools see side effects. <span className='mute'>A targeted attack has none.</span>
      </>
    ),
    desc: 'A WAF waits for a bad request. EDR waits for an odd file. A SIEM waits for a wrong log line. ADR watches one process. A precise attack gives them nothing, because it moves as permitted calls across services. Odigos reads the calls.',
    visual: <NoShadowArt />,
  },
  {
    cap: 'every check green, one attack',
    title: (
      <>
        Every step looks legitimate. <span className='mute'>The whole transaction is the attack.</span>
      </>
    ),
    desc: 'One service resolves an identifier. Another loads the record it was handed. A third returns it. Each call is valid on its own and normal for the service that made it. The attack lives in the order and the arguments, a view your other tools do not keep.',
    visual: <ConstellationArt />,
  },
  {
    cap: 'the same process, two ways of seeing',
    title: (
      <>
        Ordinary eBPF sees the kernel. <span className='mute'>Odigos sees the function.</span>
      </>
    ),
    desc: 'Kernel sensors see the outside of your app: a socket, a file. Odigos DeepBPF sees inside it: which function ran, what it was handed, what it returned, in every service and language. Nothing in your code, nothing in your process, under 1% CPU when a customer benchmarked it on 1.04 million cores.',
    visual: <XrayArt />,
  },
  {
    cap: 'what each response costs you',
    title: (
      <>
        Block one function. <span className='mute'>The service stays up.</span>
      </>
    ),
    desc: 'Kill the process and every request on that service fails. Kill the thread and the request dies. Refuse the one call and nothing else notices. The service keeps serving. The policy your team approved ships and reverts without a redeploy.',
    visual: <ThreeCutsArt />,
  },
];

export const SecurityCards = () => (
  <Section>
    <Inner>
      <Reveal>
        <Head>
          <Eyebrow>Inside the process</Eyebrow>
          <h2>See every call. Block the malicious one.</h2>
        </Head>
      </Reveal>
      <Rows>
        {CARDS.map((f, i) => (
          <Reveal key={f.cap}>
            <Row $flip={i % 2 === 1}>
              <Text className='text'>
                <span className='idx'>{String(i + 1).padStart(2, '0')} / 04</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
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
