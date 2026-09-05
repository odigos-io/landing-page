'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA, TrialCTA } from '@/containers/landing/primitives';
import { SecurityArt } from './security-art';
import { DeployFigure } from './security-figures';

/* ---------------- shared ---------------- */
const Section = styled.section<{ $alt?: boolean }>`
  background: ${({ $alt }) => ($alt ? 'var(--paper-3)' : 'var(--paper)')};
  border-bottom: 1px solid var(--line);
`;

const Inner = styled(Container)`
  padding-top: 92px;
  padding-bottom: 92px;
  @media (max-width: 1000px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

const Head = styled.div`
  max-width: 840px;
  h2 {
    margin: 18px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    line-height: 1.05;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  h2 .mute {
    display: block;
    color: var(--ink-faint);
  }
  p {
    margin: 20px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 640px;
  }
  p {
    max-width: 620px;
  }
`;

/* ---------------- hero ---------------- */
const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 58px 58px;
  -webkit-mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
  mask-image: radial-gradient(120% 78% at 50% -8%, #000 30%, transparent 72%);
`;

const HeroInner = styled(Container)`
  position: relative;
  padding-top: 64px;
  padding-bottom: 56px;
  display: grid;
  grid-template-columns: 1.02fr 1.12fr;
  > * {
    min-width: 0;
  }
  gap: 56px;
  align-items: center;
  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
    gap: 40px;
    padding-top: 48px;
    padding-bottom: 48px;
  }
`;

const HeroH1 = styled.h1`
  margin: 18px 0 0;
  font-size: clamp(38px, 5.2vw, 66px);
  line-height: 1.03;
  font-weight: 600;
  letter-spacing: -0.038em;
  color: var(--ink);

  em {
    font-style: normal;
    display: block;
    color: var(--ink-faint);
  }
`;

const HeroSub = styled.p`
  margin: 24px 0 0;
  max-width: 52ch;
  font-size: clamp(16.5px, 1.6vw, 19px);
  line-height: 1.55;
  color: var(--ink-soft);

  b {
    font-weight: 600;
    color: var(--ink);
  }
`;


const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    > * {
      flex: 1 1 100%;
    }
  }
`;


/* ---------------- how deep each tool sees ---------------- */
const Depth = styled.div`
  margin-top: 48px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
`;

const DepthHead = styled.div`
  display: grid;
  grid-template-columns: 208px repeat(5, 1fr);
  > * {
    min-width: 0;
  }
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);

  span {
    padding: 12px 8px;
    font-family: var(--font-mono), monospace;
    font-size: 9.5px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--ink-faint);
    text-align: center;
  }
  span:first-child {
    text-align: left;
    padding-left: 18px;
  }

  @media (max-width: 780px) {
    grid-template-columns: repeat(5, 1fr);
    span {
      font-size: 7.5px;
      padding: 9px 3px;
    }
    span:first-child {
      display: none;
    }
  }
`;

const DepthRow = styled.div<{ $us?: boolean }>`
  display: grid;
  grid-template-columns: 208px repeat(5, 1fr);
  > * {
    min-width: 0;
  }
  align-items: center;
  border-bottom: 1px solid var(--line);
  background: ${({ $us }) => ($us ? 'rgba(91,67,241,0.055)' : 'transparent')};

  &:last-child {
    border-bottom: none;
  }

  .who {
    padding: 0 14px 0 18px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ $us }) => ($us ? 'var(--accent)' : 'var(--ink)')};
  }
  .n {
    font-size: 12.5px;
    line-height: 1.35;
    color: var(--ink-faint);
  }
  .cell {
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pip {
    width: calc(100% - 14px);
    height: ${({ $us }) => ($us ? '10px' : '7px')};
    border-radius: 6px;
    background: ${({ $us }) => ($us ? 'var(--accent)' : 'rgba(24,20,54,0.3)')};
  }
  .miss {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(24, 20, 54, 0.09);
  }

  @media (max-width: 780px) {
    grid-template-columns: repeat(5, 1fr);
    padding: 10px 0 4px;
    .who {
      grid-column: 1 / -1;
      flex-direction: row;
      align-items: baseline;
      gap: 8px;
      padding: 0 12px 4px;
    }
    .k {
      font-size: 9.5px;
      flex: none;
    }
    .n {
      font-size: 11.5px;
    }
    .cell {
      height: 30px;
    }
  }
  .cell:last-child {
    padding-right: 10px;
  }
`;

const DepthNote = styled.div`
  display: grid;
  grid-template-columns: 208px 1fr;
  > * {
    min-width: 0;
  }
  padding: 14px 18px 16px;
  border-top: 1px solid var(--line);
  background: var(--paper-3);
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink-mute);

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  b {
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--accent);
  }
`;


/* ---------------- the trace diff ---------------- */
const Diff = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 1fr 1.18fr;
  gap: 18px;
  > * {
    min-width: 0;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const DiffCol = styled.div<{ $hot?: boolean }>`
  border: 1px solid ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.28)' : 'var(--line)')};
  border-radius: var(--r-lg);
  background: var(--paper-2);
  overflow: hidden;
  box-shadow: ${({ $hot }) => ($hot ? 'var(--shadow-lift)' : 'none')};
`;

const DiffHead = styled.div<{ $hot?: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line);
  background: ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.05)' : 'var(--paper-3)')};
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--ink-faint)')};

  .n {
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink-faint);
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 2px;
    padding: 10px 14px;
  }
`;

const TraceRow = styled.div<{ $d: number; $tag?: string }>`
  display: grid;
  grid-template-columns: 58px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 9px 18px 9px ${({ $d }) => 18 + $d * 18}px;
  border-bottom: 1px solid var(--line);
  background: ${({ $tag }) => ($tag?.endsWith('refused') ? 'rgba(91,67,241,0.06)' : $tag ? 'rgba(201,52,106,0.05)' : 'transparent')};
  &:last-child {
    border-bottom: none;
  }

  .svc {
    font-family: var(--font-mono), monospace;
    font-size: 9.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8892ab;
  }
  .fn {
    font-family: var(--font-mono), monospace;
    font-size: 12px;
    color: ${({ $tag }) => ($tag?.endsWith('refused') ? 'var(--accent)' : $tag ? 'var(--hot-ink)' : 'var(--ink)')};
    overflow-wrap: anywhere;
  }
  .tag {
    font-family: var(--font-mono), monospace;
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 2px 8px;
    border-radius: 999px;
    color: ${({ $tag }) => ($tag?.endsWith('refused') ? '#fff' : 'var(--hot-ink)')};
    background: ${({ $tag }) => ($tag?.endsWith('refused') ? 'var(--accent)' : 'rgba(201,52,106,0.1)')};
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 3px;
    padding-left: ${({ $d }) => 14 + $d * 10}px;
    .tag {
      justify-self: start;
    }
  }
`;

/* ---------------- virtual patching ---------------- */
const Cases = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > * {
    min-width: 0;
  }
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Case = styled.div`
  padding: 26px 24px 28px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);

  h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  p {
    margin: 11px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;


/* ---------------- the finding ---------------- */
const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.06fr;
  > * {
    min-width: 0;
  }
  gap: 56px;
  align-items: center;
  @media (max-width: 940px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
    gap: 36px;
  }
`;

const Finding = styled.div`
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-lift);
`;

const FindingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 18px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);

  .hot {
    color: var(--hot-ink);
  }
`;

const FindingBody = styled.div`
  padding: 6px 0;
`;

const Field = styled.div<{ $hot?: boolean }>`
  display: grid;
  grid-template-columns: 96px 1fr;
  > * {
    min-width: 0;
  }
  gap: 14px;
  align-items: baseline;
  padding: 9px 18px;
  background: ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.06)' : 'transparent')};

  .k {
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .v {
    font-family: var(--font-mono), monospace;
    font-size: clamp(11.5px, 1.05vw, 13px);
    line-height: 1.5;
    overflow-wrap: anywhere;
    white-space: normal;
    color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--ink)')};
  }

  @media (max-width: 600px) {
    grid-template-columns: 78px 1fr;
    gap: 10px;
    padding: 9px 14px;
    .k {
      font-size: 9.5px;
    }
    .v {
      font-size: 11px;
    }
  }
`;

const FindingFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 18px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  color: var(--ink-faint);

  .act {
    color: var(--signal-ink);
  }
`;


/* ---------------- the finding card ---------------- */
const Chain = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > * {
    min-width: 0;
  }
  gap: 18px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
  }
`;

const Path = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
`;

const PathBar = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-3);
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
`;

const PathBody = styled.div`
  padding: 22px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  p {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-mute);
  }
  .ev {
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px dashed var(--line-strong);
    font-family: var(--font-mono), monospace;
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--ink);
  }
  .ev .k {
    display: block;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }
  .blind {
    margin-top: auto;
    padding-top: 16px;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--ink-faint);
  }
  .blind b {
    color: var(--hot-ink);
    font-weight: 600;
  }
`;

const Verdict = styled.div`
  margin-top: 34px;
  padding: 26px 26px;
  border-radius: var(--r-lg);
  border: 1px solid rgba(201, 52, 106, 0.3);
  background: rgba(201, 52, 106, 0.045);
  max-width: 900px;

  p {
    margin: 0;
    font-size: clamp(17px, 1.8vw, 21px);
    line-height: 1.5;
    letter-spacing: -0.012em;
    color: var(--ink);
  }
  b {
    font-weight: 600;
  }
  .q {
    color: var(--hot-ink);
  }
`;


/* ---------------- close ---------------- */
const CloseInner = styled(Container)`
  padding-top: 96px;
  padding-bottom: 110px;
  text-align: center;
  @media (max-width: 1000px) {
    padding-top: 64px;
    padding-bottom: 76px;
  }

  h2 {
    margin: 18px auto 0;
    max-width: 20ch;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin: 20px auto 0;
    max-width: 52ch;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const CloseNote = styled.p`
  margin: 22px auto 0;
  max-width: 460px;
  font-family: var(--font-mono), monospace;
  font-size: 12.5px;
  letter-spacing: 0.02em;
  color: var(--ink-faint);

  a {
    color: var(--ink-mute);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  a:hover {
    color: var(--ink);
  }
`;

const CloseCtas = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

/* ---------------- content ---------------- */


/* the controls already in the estate, and where each one stops */
/* how deep each tool actually reaches, and whether it spans services */
const runs = (cells: number[]) => {
  const out: { at: number; len: number; on: boolean }[] = [];
  cells.forEach((c, i) => {
    const last = out[out.length - 1];
    if (last && last.on === !!c && !!c) last.len += 1;
    else out.push({ at: i, len: 1, on: !!c });
  });
  return out;
};

const LAYERS = ['network', 'host', 'process', 'function', 'cross-service'];
const DEPTH = [
  { k: 'waf', cells: [1, 0, 0, 0, 0], note: 'the request at the edge' },
  { k: 'edr', cells: [0, 1, 0, 0, 0], note: 'processes and files on a host' },
  { k: 'cnapp', cells: [0, 1, 0, 0, 0], note: 'the image and its configuration' },
  { k: 'adr', cells: [0, 0, 1, 0, 0], note: 'behaviour inside one application' },
  { k: 'odigos', cells: [0, 0, 1, 1, 1], note: 'every call, with its arguments, in every service', us: true },
];

type Span = { svc: string; fn: string; d: number; tag?: string };
const BASELINE: Span[] = [
  { svc: 'edge', fn: 'POST /api/tickets', d: 0 },
  { svc: 'edge', fn: 'fetch(previewUrl)', d: 1 },
  { svc: 'api', fn: 'TicketController.create', d: 1 },
  { svc: 'api', fn: 'TemplateRenderer.render', d: 2 },
  { svc: 'api', fn: 'TicketRepository.save', d: 2 },
];
const OBSERVED: Span[] = [
  { svc: 'edge', fn: 'POST /api/tickets', d: 0 },
  { svc: 'edge', fn: 'fetch(url)', d: 1, tag: 'ssrf · internal address' },
  { svc: 'api', fn: 'TicketController.create', d: 1 },
  { svc: 'api', fn: 'TemplateRenderer.render', d: 2 },
  { svc: 'api', fn: 'SpelExpressionParser.parse', d: 3, tag: 'new · cve' },
  { svc: 'api', fn: 'ReflectiveMethodExecutor.execute', d: 3, tag: 'new' },
  { svc: 'worker', fn: 'Job.run', d: 2, tag: 'zero-day · refused' },
  { svc: 'api', fn: 'TicketRepository.save', d: 2 },
];


/* what you do when there is no patch to apply */
const PATCHING = [
  { h: 'Third-party code you cannot rebuild', p: 'The vulnerable function is in a library you did not write. There is nothing for your team to patch, and the vendor ships when the vendor ships.' },
  { h: 'A zero-day with no patch anywhere', p: 'Nobody has written a fix yet. A signature arrives after the exploit has already run somewhere else.' },
  { h: 'A window your change process cannot close', p: 'Disclosure to working exploit is now hours. Your emergency change window is days.' },
];


const EVIDENCE = [
  { k: 'service', v: 'tickets-api · java' },
  { k: 'function', v: 'SpelExpressionParser.parse' },
  { k: 'called with', v: '"${T(java.lang.System).getenv(\'DATABASE_URL\')}"', hot: true },
  { k: 'then', v: 'ReflectiveMethodExecutor.execute' },
  { k: 'returned', v: '"postgres://svc_worker:\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022@prod-db-01/appdb"', hot: true },
  { k: 'reached by', v: 'POST /api/tickets · an ordinary customer session' },
];


export const SecurityContent = () => {
  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <HeroSection>
          <HeroBackdrop />
          <HeroInner>
            <div>
              <Reveal>
                <Eyebrow>eBPF runtime security for Kubernetes</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <HeroH1>
                  Nation-state firepower <em>is now a subscription.</em>
                </HeroH1>
              </Reveal>
              <Reveal delay={120}>
                <HeroSub>
                  One operator, one model, every variant, chained inside a single request. <b>Odigos lets you see into the runtime like never before and block AI-powered attacks at the function level</b>,
                  with nothing in your code.
                </HeroSub>
              </Reveal>
              <Reveal delay={180}>
                <HeroCtas>
                  <DemoCTA label='Talk to our security team' variant='primary' />
                  <TrialCTA variant='secondary' />
                </HeroCtas>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <SecurityArt />
            </Reveal>
          </HeroInner>
        </HeroSection>

        {/* where each control stops */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Side effects, or the source</Eyebrow>
                <h2>
                  Your tools see side effects. <span className='mute'>A targeted attack has none.</span>
                </h2>
                <p>
                  A WAF sees a request that looks wrong. EDR sees a process touch the host. A SIEM sees what got logged. ADR sees inside one process, and only shallowly. All of it is after the fact,
                  and a tailored attack leaves none of it until it is finished. Odigos sees as deep as the runtime goes, the function calls the attack is made of, across every service at once.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Depth>
                <DepthHead>
                  <span>sees</span>
                  {LAYERS.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </DepthHead>
                {DEPTH.map((d) => (
                  <DepthRow key={d.k} $us={d.us}>
                    <span className='who'>
                      <span className='k'>{d.k}</span>
                      <span className='n'>{d.note}</span>
                    </span>
                    {runs(d.cells).map((r) => (
                      <span className='cell' key={r.at} style={{ gridColumn: `span ${r.len}` }}>
                        {r.on ? <span className='pip' /> : <span className='miss' />}
                      </span>
                    ))}
                  </DepthRow>
                ))}
                <DepthNote>
                  <b>from ebpf</b>
                  <span>One runtime on each Kubernetes node, reading the calls from the kernel. Java, Node, Python and Go. Under 1% CPU, measured across more than a million production cores. The node sensor is open source.</span>
                </DepthNote>
              </Depth>
            </Reveal>
          </Inner>
        </Section>

        {/* what you already run */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Every dashboard stays green</Eyebrow>
                <h2>
                  Every step looks legitimate. <span className='mute'>The whole transaction is the attack.</span>
                </h2>
                <p>
                  A sophisticated attack is a handful of operations, each ordinary on its own: a request, a lookup, a call into a library, a query. Every control you run judges one of those pieces, so
                  every dashboard stays green while the attacker is inside. Only the whole transaction is malicious, and only something that sees the whole transaction can say so.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Diff>
                {[BASELINE, OBSERVED].map((col, ci) => (
                  <DiffCol key={ci} $hot={ci === 1}>
                    <DiffHead $hot={ci === 1}>
                      <span>{ci === 0 ? 'yesterday · the same route' : 'today · one request'}</span>
                      <span className='n'>{ci === 0 ? 'what it normally does' : 'three services, three weaknesses'}</span>
                    </DiffHead>
                    <div>
                      {col.map((r, i) => (
                        <TraceRow key={i} $d={r.d} $tag={r.tag}>
                          <span className='svc'>{r.svc}</span>
                          <span className='fn'>{r.fn}</span>
                          {r.tag && <span className='tag'>{r.tag}</span>}
                        </TraceRow>
                      ))}
                    </div>
                  </DiffCol>
                ))}
              </Diff>
            </Reveal>
            <Reveal delay={110}>
              <Verdict>
                <p>
                  <b>Every line on the right is a call that route is allowed to make.</b> Read together, they are the attack, and{' '}
                  <span className='q'>only something that reads them together can say so</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* zero effort, and an ebpf sensor unlike any other */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Nothing to add, nothing to redeploy</Eyebrow>
                <h2>
                  Zero effort for your developers. <span className='mute'>An eBPF sensor unlike any other.</span>
                </h2>
                <p>
                  Nothing in your code, nothing in your process, nothing in anyone&rsquo;s sprint. Most eBPF sensors stop at what the kernel sees: syscalls, sockets, files. Odigos reads the function
                  calls inside the process, with their arguments and return values, and stitches them across every service.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={60}>
              <DeployFigure />
            </Reveal>
          </Inner>
        </Section>

        {/* mitigation at the function level */}
        <Section $alt>
          <Inner>
            <Split>
              <Reveal>
                <Head>
                  <Eyebrow>Virtual patching at the function level</Eyebrow>
                  <h2>
                    Block one function. <span className='mute'>The service stays up.</span>
                  </h2>
                  <p>
                    Detection is baselined on your own traffic: the calls a route normally makes, and the one it has never made. No shared model, no signature feed. The finding names the function, so the
                    policy can too. Refuse the call, or let it run and change what it returns. Scope it to the callers you name. Ship or revert it without a redeploy. When the real patch lands you delete it,
                    and the call runs exactly as it always did. Fields you name are redacted at the node, and everything captured leaves as OpenTelemetry to a destination you own.
                  </p>
                </Head>
              </Reveal>
              <Reveal delay={80}>
                <Finding>
                  <FindingBar>
                    <span>finding · example</span>
                    <span className='hot'>secret read · recorded</span>
                  </FindingBar>
                  <FindingBody>
                    {EVIDENCE.map((r) => (
                      <Field key={r.k} $hot={r.hot}>
                        <span className='k'>{r.k}</span>
                        <span className='v'>{r.v}</span>
                      </Field>
                    ))}
                  </FindingBody>
                  <FindingFoot>
                    <span className='act'>draft a policy for this call</span>
                    <span>scoped to one function</span>
                  </FindingFoot>
                </Finding>
              </Reveal>
            </Split>
            <Reveal delay={110}>
              <Cases>
                {PATCHING.map((c) => (
                  <Case key={c.h}>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </Case>
                ))}
              </Cases>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <CloseInner>
            <Reveal>
              <Eyebrow>One operator. Every service.</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2>AI-powered attacks, met at the function level.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p>One operator with a frontier model now runs what took a team. See every function call in every service, with nothing in your code, and block the attack where it happens. Start on one service: fourteen days, success criteria written first.</p>
            </Reveal>
            <Reveal delay={180}>
              <CloseCtas>
                <DemoCTA label='Talk to our security team' variant='primary' />
                <TrialCTA variant='secondary' />
              </CloseCtas>
            </Reveal>
            <Reveal delay={230}>
              <CloseNote>
                One command, one service, no code change. <a href='https://docs.odigos.io/quickstart/introduction'>Read the deployment guide</a>.
              </CloseNote>
            </Reveal>
          </CloseInner>
        </Section>
      </main>
      <LandingFooter />
    </div>
  );
};
