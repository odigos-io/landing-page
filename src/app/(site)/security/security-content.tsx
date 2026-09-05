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


const Refrain = styled.div`
  margin-top: 44px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 30px 0;

  span {
    flex: 1 1 auto;
    padding-right: 26px;
    font-size: clamp(19px, 2.1vw, 27px);
    font-weight: 500;
    letter-spacing: -0.015em;
    color: var(--ink);
    white-space: nowrap;
  }
  span:last-child {
    color: var(--ink-faint);
  }

  @media (max-width: 720px) {
    gap: 4px 0;
    span {
      flex: 0 0 100%;
      font-size: 21px;
      padding-right: 0;
    }
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


/* ---------------- what it captures ---------------- */
const Caps = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > * {
    min-width: 0;
  }
  gap: 40px 44px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Cap = styled.div`
  padding-top: 18px;
  border-top: 2px solid var(--accent);

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: var(--ink);
  }
  p {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-mute);
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
    grid-template-columns: 88px repeat(5, 1fr);
    span {
      font-size: 7.5px;
      padding: 9px 3px;
    }
    span:first-child {
      padding-left: 12px;
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
    grid-template-columns: 88px repeat(5, 1fr);
    .who {
      padding: 0 6px 0 12px;
    }
    .k {
      font-size: 9px;
    }
    .n {
      display: none;
    }
    .cell {
      height: 44px;
    }
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

/* ---------------- what you already run ---------------- */
const Compare = styled.div`
  margin-top: 46px;
  border-top: 1px solid var(--line);
`;

const Row = styled.div<{ $head?: boolean; $us?: boolean }>`
  display: grid;
  grid-template-columns: 190px 1fr 1.15fr;
  > * {
    min-width: 0;
  }
  gap: 28px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
  align-items: baseline;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  padding: ${({ $head }) => ($head ? '0 0 12px' : '22px 0')};
  background: ${({ $us }) => ($us ? 'rgba(91,67,241,0.05)' : 'transparent')};
  box-shadow: ${({ $us }) => ($us ? 'inset 3px 0 0 var(--accent)' : 'none')};

  .k {
    font-family: var(--font-mono), monospace;
    font-size: ${({ $head }) => ($head ? '10px' : '11px')};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ $head }) => ($head ? 'var(--ink-faint)' : 'var(--ink)')};
    font-weight: ${({ $us }) => ($us ? 600 : 400)};
    padding-left: ${({ $us }) => ($us ? '18px' : '0')};
  }
  .w {
    font-size: ${({ $head }) => ($head ? '11px' : '14.5px')};
    line-height: 1.55;
    color: var(--ink-faint);
    ${({ $head }) => $head && 'font-family: var(--font-mono), monospace; letter-spacing: 0.12em; text-transform: uppercase;'}
  }
  .m {
    font-size: ${({ $head }) => ($head ? '11px' : '15px')};
    line-height: 1.55;
    color: ${({ $head }) => 'var(--ink-faint)'};
    ${({ $head }) => $head && 'font-family: var(--font-mono), monospace; letter-spacing: 0.12em; text-transform: uppercase;'}
    ${({ $head }) => !$head && 'color: var(--ink-mute);'}
  }
  ${({ $head }) => ($head ? '@media (max-width: 900px) { display: none; }' : '')}
  ${({ $us }) => ($us ? '@media (max-width: 900px) { padding-left: 16px; .k { padding-left: 0; } }' : '')}
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


const TrustLinks = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;

  a {
    padding: 18px 20px;
    background: var(--paper-2);
    font-family: var(--font-mono), monospace;
    font-size: 13px;
    color: var(--ink);
    text-decoration: none;
    transition: background 0.15s ease;
  }
  a:hover {
    background: var(--paper-3);
    color: var(--accent);
  }
  a {
    color: var(--accent);
  }
  a::after {
    content: ' →';
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

const OTHERS = [
  { k: 'endpoint detection', w: 'processes and files on a host', m: 'Sees what a process does to the machine. Not what it does inside itself.' },
  { k: 'cloud posture', w: 'images and known CVEs', m: 'Scores what you deployed. Never sees what it executed.' },
  { k: 'web firewall', w: 'request payloads at the edge', m: 'One request at a time, against patterns written in advance.' },
  { k: 'siem', w: 'what your services choose to log', m: 'Correlates only what an engineer decided in advance to write down.' },
  { k: 'in-app agents', w: 'your process, from inside it', m: 'Vendor code on your call stack, one redeploy per service. Their bad release is your outage.' },
  { k: 'odigos · function level', w: 'every function call in every service, and how they chain', m: 'The call, its argument, its return value. In the clear, with nothing running in your process.', us: true },
];


/* what you do when there is no patch to apply */
const PATCHING = [
  { h: 'Third-party code you cannot rebuild', p: 'The vulnerable function is in a library you did not write. There is nothing for your team to patch, and the vendor ships when the vendor ships.' },
  { h: 'A zero-day with no patch anywhere', p: 'Nobody has written a fix yet. A signature arrives after the exploit has already run somewhere else.' },
  { h: 'A window your change process cannot close', p: 'Disclosure to working exploit is now hours. Your emergency change window is days.' },
];

const CAPTURE = [
  { h: 'Arguments and return values', p: 'What the function was handed and what it gave back, on the routes you choose.' },
  {
    h: 'Cleartext payloads',
    p: 'Request and response bodies as the application sees them. Fields you name are redacted at the node, and the data leaves as OpenTelemetry to a destination you own.',
  },
  { h: 'Stitched across services', p: 'A chain that crosses four services arrives as one trace.' },
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
                <Eyebrow>Outside the process. Across every service.</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <HeroH1>
                  Nation-state firepower <em>is now a subscription.</em>
                </HeroH1>
              </Reveal>
              <Reveal delay={120}>
                <HeroSub>
                  An operator with a model tries every variant, chains what works, and finishes inside one request. <b>Odigos lets you see into the runtime like never before</b>: every function call, in
                  every service, with nothing in your code. <b>Then it blocks AI-powered attacks at the function level</b>, before they run.
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
                <Eyebrow>Where each control stops</Eyebrow>
                <h2>
                  Every tool you own stops <span className='mute'>one layer above the attack.</span>
                </h2>
                <p>The attack is function calls, spread across services. Nothing you run reaches the function. Nothing you run sees across services. One row does both.</p>
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
                  <span>One runtime on the node, reading the calls from the kernel. Java, Node, Python and Go. Under 1% CPU, measured across 1.04 million production cores, and the node agent is open source.</span>
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
                <Eyebrow>What you already run</Eyebrow>
                <h2>
                  Every control you own <span className='mute'>is looking somewhere else.</span>
                </h2>
                <p>None of it is misconfigured. Each one watches a layer the attack never touched, and more of the same gets you more of the same view.</p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Compare>
                <Row $head>
                  <span className='k'>control</span>
                  <span className='w'>what it watches</span>
                  <span className='m'>where it stops</span>
                </Row>
                {OTHERS.map((x) => (
                  <Row key={x.k} $us={x.us}>
                    <span className='k'>{x.k}</span>
                    <span className='w'>{x.w}</span>
                    <span className='m'>{x.m}</span>
                  </Row>
                ))}
              </Compare>
            </Reveal>
            <Reveal delay={110}>
              <Verdict>
                <p>
                  <b>The chain is made of calls, and it crosses services.</b> Every row above this one <span className='q'>gives up on one or the other</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* agentless experience, agent capabilities */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Agentless experience. Agent capabilities.</Eyebrow>
                <h2>
                  Agentless to deploy. <span className='mute'>An agent&rsquo;s view inside.</span>
                </h2>
                <p>
                  Agentless tools never see inside the process. In-app agents do, and cost you vendor code in every service plus a redeploy for each. Odigos reads the process from the kernel: the inside
                  view, with nothing inside.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={60}>
              <DeployFigure />
            </Reveal>
            <Reveal delay={90}>
              <Refrain>
                <span>No code changes.</span>
                <span>No SDK.</span>
                <span>No sidecar.</span>
                <span>No redeploy.</span>
                <span>No developer ticket.</span>
              </Refrain>
            </Reveal>
            <Reveal delay={110}>
              <Caps>
                {CAPTURE.map((c) => (
                  <Cap key={c.h}>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </Cap>
                ))}
              </Caps>
            </Reveal>
            <Reveal delay={130}>
              <TrustLinks>
                <a href='https://github.com/odigos-io/odigos/tree/main/odiglet'>Read the node agent source</a>
                <a href='https://trust.odigos.io'>Trust center and SOC 2</a>
                <a href='https://docs.odigos.io/quickstart/introduction'>The deployment guide</a>
              </TrustLinks>
            </Reveal>
          </Inner>
        </Section>

        {/* mitigation at the function level */}
        <Section $alt>
          <Inner>
            <Split>
              <Reveal>
                <Head>
                  <Eyebrow>Mitigation at the function level</Eyebrow>
                  <h2>
                    Block one function. <span className='mute'>The service stays up.</span>
                  </h2>
                  <p>
                    Detection is baselined on your own traffic: the calls a route normally makes, and the one it has never made. No shared model, no signature feed. The finding names the function, so the
                    policy can too. Refuse the call, or let it run and change what it returns. A policy is versioned, scoped to the callers you name, and shipped or reverted without a redeploy. When the real
                    patch lands you delete it, and the call runs exactly as it always did.
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
              <Eyebrow>One service. Fourteen days.</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2>Pick the service you would least like to explain.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p>Fourteen days on one service, success criteria written down first. At the end you have the call graph for every route it serves, or we tell you why not.</p>
            </Reveal>
            <Reveal delay={180}>
              <CloseCtas>
                <DemoCTA label='Start on one service' variant='primary' />
                <TrialCTA label='Send us your architecture questions' variant='secondary' />
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
