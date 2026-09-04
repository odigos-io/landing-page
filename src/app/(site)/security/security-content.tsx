'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA, TrialCTA } from '@/containers/landing/primitives';
import { SecurityArt } from './security-art';

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

const HeroWhat = styled.p`
  margin: 22px 0 0;
  max-width: 520px;
  font-family: var(--font-mono), monospace;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--ink-faint);
`;

const HeroCtas = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

/* ---------------- numbered list ---------------- */
/* ---------------- one trace, three services ---------------- */
/* ---------------- running it ---------------- */
const Facts = styled.div`
  margin-top: 44px;
  border-top: 1px solid var(--line);
`;

const Fact = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  > * {
    min-width: 0;
  }
  gap: 40px;
  padding: 26px 0;
  border-bottom: 1px solid var(--line);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  p {
    margin: 0;
    font-size: 15.5px;
    line-height: 1.65;
    color: var(--ink-mute);
  }
  code {
    font-family: var(--font-mono), monospace;
    font-size: 13.5px;
    color: var(--ink);
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

/* ---------------- deviation classes ---------------- */
const Classes = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > * {
    min-width: 0;
  }
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Cls = styled.div`
  padding: 22px 22px 24px;
  background: var(--paper-2);

  h3 {
    margin: 0;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
  }
  p {
    margin: 11px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink);
  }
  .e {
    display: block;
    margin-top: 10px;
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    line-height: 1.5;
    color: var(--ink-faint);
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
  background: ${({ $us }) => ($us ? 'rgba(91,67,241,0.04)' : 'transparent')};
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
`;

/* ---------------- what changed ---------------- */
const Shift = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > * {
    min-width: 0;
  }
  gap: 1px;
  background: var(--line);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Shard = styled.div`
  padding: 30px 26px 32px;
  background: var(--paper);

  .k {
    display: block;
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--hot-ink);
  }
  h3 {
    margin: 14px 0 0;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: -0.018em;
    line-height: 1.25;
    color: var(--ink);
  }
  p {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

/* ---------------- triage funnel ---------------- */
const Funnel = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  > * {
    min-width: 0;
  }
  gap: 2px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1px;
  }
`;

const Step = styled.div<{ $i: number }>`
  padding: 22px 18px 24px;
  border-top: 3px solid ${({ $i }) => ($i === 0 ? 'var(--line-strong)' : `rgba(201,52,106,${0.25 + $i * 0.19})`)};
  background: ${({ $i }) => ($i === 0 ? 'transparent' : `rgba(201,52,106,${0.015 + $i * 0.012})`)};

  .k {
    display: block;
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $i }) => ($i === 0 ? 'var(--ink-faint)' : 'var(--hot-ink)')};
  }
  p {
    margin: 10px 0 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: ${({ $i }) => ($i === 0 ? 'var(--ink-faint)' : 'var(--ink-mute)')};
  }

  @media (max-width: 900px) {
    padding: 16px 0 18px;
    border-top-width: 2px;
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

/* ---------------- response ---------------- */
const Prose = styled.div`
  margin-top: 40px;
  max-width: 780px;

  p {
    margin: 0 0 20px;
    font-size: clamp(17px, 1.7vw, 20px);
    line-height: 1.6;
    color: var(--ink);
  }
  p:last-child {
    margin-bottom: 0;
    color: var(--ink-mute);
  }
`;

/* ---------------- why now ---------------- */
const Clock = styled.div`
  margin-top: 44px;
`;

const ClockLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  > * {
    min-width: 0;
  }
  gap: 2px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  .seg {
    display: block;
    padding: 20px 20px 22px;
    border-top: 3px solid var(--line-strong);
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--ink-faint);
  }
  .seg b {
    display: block;
    margin-bottom: 6px;
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .warm {
    border-top-color: var(--accent);
  }
  .warm b {
    color: var(--accent);
  }
  .hot {
    border-top-color: var(--hot);
  }
  .hot b {
    color: var(--hot-ink);
  }
  .hot {
    color: var(--ink);
  }
`;

/* ---------------- proof of vendor ---------------- */
const Trust = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  > * {
    min-width: 0;
  }
  gap: 48px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  h2 {
    margin: 14px 0 0;
    font-size: clamp(28px, 3.6vw, 46px);
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.12;
    color: var(--ink);
  }
  p {
    margin: 14px 0 0;
    font-size: 16px;
    line-height: 1.65;
    color: var(--ink-mute);
  }
`;

const TrustLinks = styled.div`
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

  @media (max-width: 640px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    > * {
      width: max-content;
      min-width: 100%;
    }
  }
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
    word-break: break-all;
    color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--ink)')};
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

/* ---------------- the structural gaps ---------------- */
/* ---------------- baseline vs observed ---------------- */
const Diff = styled.div`
  margin-top: 46px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  > * {
    min-width: 0;
  }
  gap: 20px;
  @media (max-width: 940px) {
    grid-template-columns: 1fr;
    > * {
      min-width: 0;
    }
  }
`;

const DiffCol = styled.div<{ $hot?: boolean }>`
  border: 1px solid ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.3)' : 'var(--line)')};
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
  box-shadow: ${({ $hot }) => ($hot ? '0 24px 56px -30px rgba(201,52,106,0.42)' : 'var(--shadow-soft)')};
`;

const DiffBar = styled.div<{ $hot?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.2)' : 'var(--line)')};
  background: ${({ $hot }) => ($hot ? 'rgba(201,52,106,0.05)' : 'var(--paper-3)')};
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ $hot }) => ($hot ? 'var(--hot-ink)' : 'var(--signal-ink)')};

  .n {
    letter-spacing: 0.08em;
    text-transform: none;
    color: var(--ink-faint);
  }
`;

const DiffBody = styled.div`
  padding: 12px 8px 14px;

  @media (max-width: 640px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    > * {
      width: max-content;
      min-width: 100%;
    }
  }
`;

const TraceRow = styled.div<{ $depth: number; $new?: boolean; $slow?: boolean; $ghost?: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 10px;
  padding-left: ${({ $depth }) => 10 + $depth * 15}px;
  border-radius: 7px;
  background: ${({ $new, $slow }) => ($new || $slow ? 'rgba(201,52,106,0.07)' : 'transparent')};
  font-family: var(--font-mono), monospace;
  font-size: clamp(11px, 1.05vw, 12.5px);

  .fn {
    flex-shrink: 0;
    font-family: var(--font-display), 'Geist', sans-serif;
    font-size: 14px;
    color: ${({ $new, $slow }) => ($new || $slow ? 'var(--ink)' : 'var(--ink-mute)')};
    white-space: nowrap;
  }
  .sym {
    min-width: 0;
    color: var(--ink-faint);
    font-size: 10.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tag {
    flex-shrink: 0;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(201, 52, 106, 0.12);
    color: var(--hot-ink);
    font-size: 9.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .ms {
    margin-left: auto;
    flex-shrink: 0;
    color: ${({ $slow }) => ($slow ? 'var(--hot-ink)' : 'var(--ink-faint)')};
  }
  .gap {
    display: block;
    width: 132px;
    height: 1px;
    border-top: 1px dashed var(--line-strong, var(--line));
  }
`;

/* ---------------- the attack ---------------- */
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

/* ---------------- how it works ---------------- */
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



const FACTS = [
  {
    h: 'It attaches to what is already running.',
    p: 'Kernel-attached uprobes into the JVM, V8, CPython and the Go runtime, on Kubernetes and on bare-metal VMs. No SDK, no code change, no redeploy.',
  },
  {
    h: 'It will not drown your analysts.',
    p: 'Three classes landed on one request in the attack above: a call edge that route had never produced, an argument that had never carried a payload like that, and the latency shape those calls pushed it into. Any one of them on its own would have been scored as noise and gone no further.',
  },
  {
    h: 'The record leaves the host while the attack is still running.',
    p: 'Odigos runs in your own cluster and exports as OpenTelemetry to a destination you control, so the evidence is off the box before an attacker who owns it knows there was anything to remove. Redaction is configured before anything is written. Retention and access are your destination policy, and we never hold a copy.',
  },
  {
    h: 'You do not tune it.',
    p: 'It watches a route for two weeks and forms the baseline itself. Most of the signals are structural: a call edge, a peer or a library either appears on that route or it does not. The two that are not, latency shape and how often two values agree, are learned from that route\'s own history and never from a global threshold. A normal deploy that adds one edge barely registers.',
  },
  {
    h: 'The baseline never stores a value.',
    p: 'For a check like tenant identity against the row that came back, Odigos keeps the relation and how often the two agree. The values themselves are never kept. Where a finding needs the value itself, as in the capture above, it is scoped to that function on that workload, governed by RBAC and policy, and redacted by default.',
  },
  {
    h: 'Under 1% CPU.',
    p: 'Measured across 1.04 million cores under production load, with effectively no added latency. You scope which functions are hooked, so the cost is a number you set rather than a number you discover. The probe fires in the kernel the moment your function is called, which is the moment the value is already in the clear.',
  },
];



/* the six deviation classes, from the detection model */
const CLASSES = [
  { n: 'new call edge', p: 'A caller and a callee that have never run together on this route.', e: 'a template helper reaching an auth lookup' },
  { n: 'new egress', p: 'A service reaching a destination it has never reached before.', e: 'a first request to an external host' },
  { n: 'timing anomaly', p: 'A span far outside the latency shape that route has always had.', e: '240ms where the baseline is 8ms' },
  { n: 'argument anomaly', p: 'An argument or a return value carrying something its type never carried.', e: 'an injected bearer token in arg 0' },
  { n: 'new library', p: 'Code reaching a package that route has never touched.', e: 'a text library on a path that never used it' },
  { n: 'attribute mismatch', p: 'Two values that always agreed, now disagreeing.', e: 'the caller tenant against the tenant on the row' },
];

/* what a bank already runs, and why each one was blind to this */
const OTHERS = [
  { k: 'endpoint detection', w: 'processes, files and shells on a host', m: 'Sees what a process does to the machine. Blind to what it does inside itself.' },
  { k: 'cloud posture', w: 'images, configuration and known CVEs', m: 'Scores what you deployed. It has no view of what that code actually executed.' },
  { k: 'syscall sensors', w: 'execve, connect, open', m: 'Can tell you a service opened a new connection. Not which function opened it, what it was handed, or what came back.' },
  { k: 'web firewall', w: 'request payloads at the edge', m: 'Judges one request in isolation, against patterns somebody wrote in advance.' },
  { k: 'siem', w: 'what your services choose to log', m: 'Can only correlate what an engineer decided in advance was worth writing down.' },
  { k: 'tracing', w: 'which services a request touched, and how long each took', m: 'Spans, not calls. It stops at the service boundary and never goes inside.' },
  { k: 'in-app agents', w: 'the same process, from the inside of it', m: 'Runs a vendor\'s code in your process, behind an SDK or a runtime flag, one redeploy per service. Their bad release is your outage.' },
  { k: 'app detection', w: 'in-process behaviour, one service at a time', m: 'Watches a service. Not the chain across four of them, and not the argument the function was handed.' },
  { k: 'odigos · function level', w: 'the function calls inside each service, and how they chain across services', m: 'The only one here that sits where the payload is already in the clear, without running in your process, and whose unit of evidence is a call with its argument and its return value.', us: true },
];

/* what the runtime actually captures */
const BLIND = [
  { h: 'Calls below what you scoped', p: 'You name the functions. Anything underneath them runs unobserved, which is also why the cost is a number you set.' },
  { h: 'The first two weeks', p: 'Until a route has a baseline there is nothing to compare against. You get the call graph from the first request and the deviations from day fourteen.' },
  { h: 'Runtimes outside the matrix', p: 'A version or a runtime we have not attached to is a version we do not read. The supported matrix is in the docs, and it is a short document rather than a long one.' },
  { h: 'Traffic that never enters a scoped process', p: 'A call between two services you have not enabled is a call we never see. Coverage is a decision you make per workload.' },
];

/* the CVE backlog question, answered from the running system */
/* the bar the headline claims moved, developed */
const SHIFT = [
  {
    k: 'chained',
    h: 'It is no longer one CVE in one process.',
    p: 'Low-severity findings get chained into critical compromise. Your severity model scores each one alone, which is exactly how a chain of fours becomes a nine that nobody ranked.',
  },
  {
    k: 'tailored',
    h: 'The payload is built for your estate.',
    p: 'Your runtime version, your module graph, your package set. Not a generic exploit hunting for a generic target, and not something a shared signature was ever going to match.',
  },
  {
    k: 'lateral',
    h: 'It moves inside one transaction.',
    p: 'Across services, across languages, across trust boundaries, between a request arriving and a response leaving. Nothing in that window looks like an intrusion to a per-host sensor.',
  },
];

const TRIAGE = [
  { k: 'present', p: 'The package is in the image. This is where a scanner stops, and where your backlog comes from.' },
  { k: 'loaded', p: 'The vulnerable class was actually loaded into a running process.' },
  { k: 'reachable', p: 'A path exists from a route you serve to the vulnerable function.' },
  { k: 'called', p: 'It ran. On this route, this many times, in the last fourteen days.' },
  { k: 'by whom', p: 'The caller, and the session it came in on.' },
];

/* what you do when there is no patch to apply */
const PATCHING = [
  {
    h: 'Third-party code you cannot rebuild',
    p: 'The vulnerable function is in a library you did not write and cannot fork. There is nothing for your team to patch, and the vendor ships when the vendor ships.',
  },
  {
    h: 'A zero-day with no patch in existence',
    p: 'Nobody has written a fix yet. A signature will arrive after the exploit has already run somewhere, and by then the technique has mutated anyway.',
  },
  {
    h: 'The window your change process cannot close',
    p: 'Disclosure to working exploit is now hours. Your emergency change window is measured in days, and your quarterly one in weeks.',
  },
];

const CAPTURE = [
  { h: 'Arguments and return values', p: 'On the routes you scope, the values themselves rather than the fact that something ran.' },
  { h: 'Cleartext payloads', p: 'Request and response bodies as the application sees them, after TLS has been terminated and before anything is serialized back out.' },
  { h: 'The path it took', p: 'The order and depth of the calls this request made, so you see the path the code took rather than every path the source allows.' },
  { h: 'Stitched end to end', p: 'One trace across services, languages and processes, so a chain that crosses four of them is a single object.' },
  { h: 'Java, Node, Python, Go', p: 'One node agent, on Kubernetes or on a bare-metal VM. It attaches to processes already running, so coverage arrives the day you deploy it and not the release after.' },
  { h: 'One capture, two jobs', p: 'The same record answers why the route got slower and who reached the ledger. Your platform team and your security team stop paying twice for the same bytes.' },
];


/* what a policy can do once the finding names the function */


const BASELINE = [
  { fn: 'a customer submits a ticket', sym: 'POST /api/tickets', d: 0 },
  { fn: 'create the record', sym: 'TicketController.create', d: 1 },
  { fn: 'render the template', sym: 'TemplateRenderer.render', d: 2 },
  { fn: '', sym: '', d: 3, ghost: true },
  { fn: '', sym: '', d: 3, ghost: true },
  { fn: 'write to the database', sym: 'TicketRepository.save', d: 1 },
];

const OBSERVED = [
  { fn: 'a customer submits a ticket', sym: 'POST /api/tickets', d: 0 },
  { fn: 'create the record', sym: 'TicketController.create', d: 1 },
  { fn: 'render the template', sym: 'TemplateRenderer.render', d: 2, slow: true },
  { fn: 'read the text as code', sym: 'SpelExpressionParser.parse', d: 3, isNew: true },
  { fn: 'run whatever it read', sym: 'ReflectiveMethodExecutor.execute', d: 3, isNew: true },
  { fn: 'write to the database', sym: 'TicketRepository.save', d: 1 },
];

const EVIDENCE = [
  { k: 'service', v: 'tickets-api · java' },
  { k: 'function', v: 'SpelExpressionParser.parse' },
  { k: 'called with', v: '"${T(java.lang.System).getenv(\'DATABASE_URL\')}"', hot: true },
  { k: 'then', v: 'ReflectiveMethodExecutor.execute' },
  { k: 'returned', v: '"postgres://svc_settle:\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022@prod-db-01/ledger"', hot: true },
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
              <Eyebrow>Function-level runtime defense</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <HeroH1>
                Nation-state firepower <em>is now a subscription.</em>
              </HeroH1>
            </Reveal>
            <Reveal delay={120}>
              <HeroSub>
                The attack crosses four services and no single service looks wrong. Odigos reads the function calls inside each one, catches the calls that have never run before, and takes a vulnerable function
                out of play <b>without a patch, a proxy or a redeploy</b>.
              </HeroSub>
            </Reveal>
            <Reveal delay={180}>
              <HeroCtas>
                <DemoCTA label='Talk to our security team' variant='primary' />
                <TrialCTA variant='secondary' />
              </HeroCtas>
              <HeroWhat>One eBPF runtime on the node. Under 1% CPU across 1.04 million production cores. No agent in your process, no code change, no signatures to write.</HeroWhat>
            </Reveal>
            </div>
            <Reveal delay={140}>
              <SecurityArt />
            </Reveal>
          </HeroInner>
        </HeroSection>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What changed</Eyebrow>
                <h2>
                  One operator now runs <span className='mute'>what used to take a team and a budget.</span>
                </h2>
                <p>
                  Recon, exploit chaining and lateral movement at machine speed, from someone who does not need to understand your estate because a model reads it faster than your architects can describe it.
                  Three things about the attack changed, and each one breaks a different assumption your program is built on.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Shift>
                {SHIFT.map((x) => (
                  <Shard key={x.k}>
                    <span className='k'>{x.k}</span>
                    <h3>{x.h}</h3>
                    <p>{x.p}</p>
                  </Shard>
                ))}
              </Shift>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Why the stack missed it</Eyebrow>
                <h2>
                  Nothing you own was misconfigured. <span className='mute'>Everything you own was looking somewhere else.</span>
                </h2>
                <p>
                  An SSRF at the edge, a CVE you had already scheduled, an unknown bug in a template helper, and a session token that was still valid. Four ordinary weaknesses, none of them yours alone,
                  chained inside a single transaction. The controls in your estate watch the effects an attack leaves behind, and this one left none. And the payload only exists in the clear inside the process that handles it, so the traffic between
                  your services is opaque to anything sitting on the network. None of this is a configuration problem. It is a property of where the sensors sit.
                </p>
              </Head>
            </Reveal>


            <Reveal delay={110}>
              <Verdict>
                <p>
                  The attack ran <b>inside the application, in the gaps between your services</b>, and the only place it was ever visible <span className='q'>had no sensor on it</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Against what you already run</Eyebrow>
                <h2>Six controls a bank already owns. Every one of them did its job.</h2>
                <p>
                  None of these is misconfigured and none of them is going away. Each one is looking at a layer the attack did not have to touch, and no amount of budget spent on more of the same closes the
                  distance to the layer it did.
                </p>
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
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What it captures</Eyebrow>
                <h2>The layer underneath every tool you own.</h2>
                <p>
                  One eBPF runtime on the node, reading the calls your services actually make. It is the same capture whether you are asking why revenue dropped or whether someone reached a ledger they should
                  not have.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Caps>
                {CAPTURE.map((c) => (
                  <Cap key={c.h}>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </Cap>
                ))}
              </Caps>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What it does not see</Eyebrow>
                <h2>The four honest gaps.</h2>
                <p>Every runtime sensor has them. A vendor that lists none is either not telling you or does not know.</p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Caps>
                {BLIND.map((b) => (
                  <Cap key={b.h}>
                    <h3>{b.h}</h3>
                    <p>{b.p}</p>
                  </Cap>
                ))}
              </Caps>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Detection without signatures</Eyebrow>
                <h2>
                  The exploit is two function calls that were not there yesterday.
                </h2>
                <p>
                  Nobody had a signature for this call graph, and none was needed. Odigos learns the call graph each route normally produces and surfaces what has never appeared on it. It scores six ways a
                  request can be structurally wrong, and every one of them is a shape learned from your own traffic rather than a rule somebody wrote in advance.
                </p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Diff>
                <DiffCol>
                  <DiffBar>
                    <span>baseline · example</span>
                    <span className='n'>two weeks of ordinary traffic</span>
                  </DiffBar>
                  <DiffBody>
                    {BASELINE.map((r, i) => (
                      <TraceRow key={r.fn || `gap-${i}`} $depth={r.d} $ghost={r.ghost}>
                        {r.ghost ? (
                          <span className='gap' />
                        ) : (
                          <>
                            <span className='fn'>{r.fn}</span>
                            <span className='sym'>{r.sym}</span>
                          </>
                        )}
                      </TraceRow>
                    ))}
                  </DiffBody>
                </DiffCol>

                <DiffCol $hot>
                  <DiffBar $hot>
                    <span>observed · example</span>
                    <span className='n'>two new calls, and a route that got slower</span>
                  </DiffBar>
                  <DiffBody>
                    {OBSERVED.map((r) => (
                      <TraceRow key={r.fn} $depth={r.d} $new={r.isNew} $slow={r.slow}>
                        <span className='fn'>{r.fn}</span>
                        {r.isNew && <span className='tag'>new</span>}
                        {r.slow && <span className='tag'>slower</span>}
                        
                        <span className='sym'>{r.sym}</span>
                      </TraceRow>
                    ))}
                  </DiffBody>
                </DiffCol>
              </Diff>
            </Reveal>

            <Reveal delay={130}>
              <Classes>
                {CLASSES.map((c) => (
                  <Cls key={c.n}>
                    <h3>{c.n}</h3>
                    <p>{c.p}</p>
                    <span className='e'>{c.e}</span>
                  </Cls>
                ))}
              </Classes>
            </Reveal>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Triage</Eyebrow>
                <h2>Which of those four thousand actually ran?</h2>
                <p>
                  A scanner can tell you a vulnerable package is present. It cannot tell you whether the vulnerable function was ever loaded, whether anything in your estate can reach it, whether it has been
                  called, or by whom. Odigos answers that from the running system, which is the difference between a backlog and a short list.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={70}>
              <Funnel>
                {TRIAGE.map((t, i) => (
                  <Step key={t.k} $i={i}>
                    <span className='k'>{t.k}</span>
                    <p>{t.p}</p>
                  </Step>
                ))}
              </Funnel>
            </Reveal>
            <Reveal delay={110}>
              <Verdict>
                <p>
                  Most of what your scanner ranks critical is <b>present but never called</b>. Some of what it ranks low is executing on a path that handles money. Until you can see the runtime, you are
                  patching in the order <span className='q'>somebody else guessed</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Split>
              <Reveal>
                <Head>
                  <Eyebrow>When something lands</Eyebrow>
                  <h2>
                    The finding is the function.
                  </h2>
                  <p>
                    The exact function, the argument it was handed and the value it gave back. Everything a responder would otherwise spend the night reconstructing was written down while it was still running.
                  </p>
                  <p>
                    And because the finding names the function, so can the policy. The first attempt is what you are reading above. The next one does not get that far. No proxy in front of the service, and no redeploy.
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
                    <span className='act'>draft a report-only policy</span>
                    <span>scoped to one call</span>
                  </FindingFoot>
                </Finding>
              </Reveal>
            </Split>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Virtual patching at the function level</Eyebrow>
                <h2>
                  Patch the function. <span className='mute'>Not the vendor&rsquo;s release cycle.</span>
                </h2>
                <p>
                  Three situations account for most of the risk a bank actually carries, and in every one of them the ordinary answer, ship a patch, is unavailable to you when you need it.
                </p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Cases>
                {PATCHING.map((c) => (
                  <Case key={c.h}>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </Case>
                ))}
              </Cases>
            </Reveal>

            <Reveal delay={110}>
              <Prose>
                <p>
                  A FunctionPolicy takes the vulnerable function out of play without touching the code that contains it. Refuse the call for the routes and callers you name, or let it run and replace what it
                  returns. It is written against the function, so it holds for every path that reaches it, including the ones nobody has found yet. When the real patch finally ships, you delete the policy.
                </p>
                <p>
                  The blast radius is one function on one workload, which is why it can move at the speed the threat does. A rule at the perimeter is a decision about every request that will ever arrive. This is
                  a decision about one call.
                </p>
                <p>
                  It is also an object rather than a console setting. A policy is versioned, has an author, and ships report-only until somebody promotes it, so your auditors can carry it as a compensating
                  control rather than as an undocumented change to a production application. If it is not there, the call behaves exactly as it does today.
                </p>
              </Prose>
            </Reveal>

          </Inner>
        </Section>

        <Section>
          <Inner>
            <Trust>
              <div>
                <Eyebrow>Before you run it</Eyebrow>
                <h2>Read the probe before you run it.</h2>
                <p>Your team can read exactly what it attaches to and what it reads before it goes anywhere near production. No closed agent, no proprietary format, and the telemetry stays yours.</p>
              </div>
              <TrustLinks>
                <a href='https://github.com/odigos-io/odigos/tree/main/odiglet'>Read the node agent source</a>
                <a href='https://trust.odigos.io'>Trust center and SOC 2</a>
                <a href='https://docs.odigos.io'>The probe, in the docs</a>
              </TrustLinks>
            </Trust>
          </Inner>
        </Section>

        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Running it</Eyebrow>
                <h2>Nothing of ours executes inside your process.</h2>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Facts>
                {FACTS.map((x) => (
                  <Fact key={x.h}>
                    <h3>{x.h}</h3>
                    <p>{x.p}</p>
                  </Fact>
                ))}
              </Facts>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Why now</Eyebrow>
                <h2>Baselines are earned, not installed.</h2>
                <p>
                  Odigos learns what each route normally does across two weeks of ordinary traffic. Which means the record you will want for the incident in March is the record you have to be keeping in
                  January.
                </p>
              </Head>
            </Reveal>

            <Reveal delay={70}>
              <Clock>
                <ClockLine>
                  <span className='seg cold'>
                    <b>nothing deployed</b>
                    no comparison is possible
                  </span>
                  <span className='seg warm'>
                    <b>two weeks of traffic</b>
                    the baseline forms
                  </span>
                  <span className='seg hot'>
                    <b>the incident</b>
                    you can say what changed
                  </span>
                </ClockLine>
              </Clock>
            </Reveal>

            <Reveal delay={110}>
              <Verdict>
                <p>
                  Deploy a probe the day after an incident and all you get is a picture of a system that has <b>already been rearranged</b>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        <Section>
          <CloseInner>
            <Reveal>
              <Eyebrow>Start somewhere</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2>Pick the service you would least like to explain.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Thirty days on one service, in whichever environment your change process allows, with the success criteria written down before we start. At the end you have the call graph for every route it
                serves, or you have our answer for why we could not see it.
              </p>
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
