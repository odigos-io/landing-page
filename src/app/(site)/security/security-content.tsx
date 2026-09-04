'use client';

import React from 'react';
import styled from 'styled-components';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, DemoCTA, TrialCTA } from '@/containers/landing/primitives';
import { SecurityArt } from './security-art';
import { DeployFigure, VariantFigure } from './security-figures';

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

const Denials = styled.div`
  margin: 26px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0 20px;
  max-width: 540px;

  span {
    position: relative;
    font-family: var(--font-mono), monospace;
    font-size: 12.5px;
    letter-spacing: 0.02em;
    color: var(--ink);
    padding: 2px 0;
  }
  span::before {
    content: '';
    position: absolute;
    left: -11px;
    top: 50%;
    width: 5px;
    height: 1px;
    background: var(--hot);
  }
  span:first-child::before {
    display: none;
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
  background: ${({ $us }) => ($us ? 'rgba(201,52,106,0.05)' : 'transparent')};

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
    color: ${({ $us }) => ($us ? 'var(--hot-ink)' : 'var(--ink)')};
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
    width: calc(100% - 8px);
    height: ${({ $us }) => ($us ? '10px' : '7px')};
    border-radius: 6px;
    background: ${({ $us }) => ($us ? 'var(--hot)' : 'rgba(24,20,54,0.2)')};
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
    color: var(--hot-ink);
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


/* ---------------- proof of vendor ---------------- */

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



const DEPLOY = [
  {
    h: 'One command, no code change',
    p: 'Kernel-attached probes into the JVM, V8, CPython and the Go runtime, on Kubernetes and on bare-metal VMs. It attaches to processes that are already running, so coverage arrives the day you install it and not the release after.',
  },
  {
    h: 'Nothing of ours runs in your process',
    p: 'No library in your dependency tree, no runtime flag, no vendor code on your call stack. A bad release of ours cannot become an outage of yours.',
  },
  {
    h: 'Under 1% CPU',
    p: 'Measured across 1.04 million cores under production load, with effectively no added latency. You scope which functions are hooked, so the cost is a number you set rather than a number you discover.',
  },
  {
    h: 'The record never leaves your control',
    p: 'Odigos runs in your own cluster and exports as OpenTelemetry to a destination you own. Redaction is configured before anything is written, retention is your policy, and we never hold a copy.',
  },
  {
    h: 'You do not tune it',
    p: 'It watches a route for two weeks and forms the baseline itself. Most signals are structural: a call edge, a peer or a library either appears on that route or it does not. A normal deploy that adds one edge barely registers.',
  },
  {
    h: 'Readable before you run it',
    p: 'The node agent is open source. Your team can read exactly what it attaches to and what it reads before it goes anywhere near production.',
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

const LAYERS = ['network', 'host', 'process', 'function', 'across services'];
const DEPTH = [
  { k: 'waf', cells: [1, 0, 0, 0, 0], note: 'the request at the edge' },
  { k: 'edr', cells: [0, 1, 0, 0, 0], note: 'processes and files on a host' },
  { k: 'cnapp', cells: [0, 1, 0, 0, 0], note: 'the image and its configuration' },
  { k: 'adr', cells: [0, 0, 1, 0, 0], note: 'behaviour inside one application' },
  { k: 'tracing', cells: [0, 0, 1, 0, 1], note: 'which services a request touched' },
  { k: 'odigos', cells: [0, 0, 1, 1, 1], note: 'every call, its arguments, across all of them', us: true },
];

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


/* the CVE backlog question, answered from the running system */
/* the bar the headline claims moved, developed */
const SHIFT = [
  {
    k: 'chained',
    h: 'It is no longer one CVE in one process.',
    p: 'Low-severity findings get chained into critical compromise. Your severity model scores each one alone, which is exactly how a chain of low findings becomes a critical one that nobody ranked.',
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
  { h: 'One capture, two jobs', p: 'The same record answers why the route got slower and who reached data they should not have. Your platform team and your security team stop paying twice for the same bytes.' },
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
                  One operator with a model chains four weaknesses across four of your services inside one request. <b>Odigos reads every function call, from outside the process, across all of them.</b> The
                  chain is visible while it runs, and refused at the call.
                </HeroSub>
              </Reveal>
              <Reveal delay={150}>
                <Denials>
                  <span>No code changes</span>
                  <span>No SDK</span>
                  <span>No sidecar</span>
                  <span>No redeploy</span>
                </Denials>
              </Reveal>
              <Reveal delay={180}>
                <HeroCtas>
                  <DemoCTA label='Talk to our security team' variant='primary' />
                  <TrialCTA variant='secondary' />
                </HeroCtas>
                <HeroWhat>One eBPF runtime on the node, under 1% CPU measured across 1.04 million production cores.</HeroWhat>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <SecurityArt />
            </Reveal>
          </HeroInner>
        </HeroSection>

        {/* 1. the bar moved */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What changed</Eyebrow>
                <h2>
                  One operator now runs <span className='mute'>what used to take a team and a budget.</span>
                </h2>
                <p>
                  The attacker no longer has to understand your estate, because a model reads it faster than your architects can describe it. Three properties of the attack changed, and each one breaks a
                  different assumption your program is built on.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={60}>
              <VariantFigure />
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
            <Reveal delay={110}>
              <Verdict>
                <p>
                  Nothing you own was misconfigured. The attack ran <b>inside your applications, in the gaps between them</b>, and the one place it was ever visible{' '}
                  <span className='q'>had no sensor on it</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* 2. the depth chart: where each control can actually see */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>How deep each control reaches</Eyebrow>
                <h2>
                  Every tool you own stops <span className='mute'>one layer above the attack.</span>
                </h2>
                <p>
                  A control can only act on what its sensor can resolve. The chain above happened between function calls, inside four different services, in the seconds between a request arriving and a
                  response leaving. Two columns decide whether you can see that at all, and only one row reaches both.
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
                  <span>
                    The depth is not bought with an agent inside your application. One runtime on the node reads the calls from the kernel, which is why it can be that deep and still be something you install
                    rather than something your developers integrate.
                  </span>
                </DepthNote>
              </Depth>
            </Reveal>
          </Inner>
        </Section>

        {/* 3. the comparison table */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Against what you already run</Eyebrow>
                <h2>Every control in your estate did its job.</h2>
                <p>
                  None of these is misconfigured and none of them is going away. Each is watching a layer the attack did not have to touch, and no amount of budget spent on more of the same closes the distance
                  to the layer it did.
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
            <Reveal delay={110}>
              <Verdict>
                <p>
                  Buying another control at this depth does not close it. <b>The chain is made of calls, and it crosses services.</b> Every row above this one{' '}
                  <span className='q'>gives up on one or the other</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* 4. the unique capability: runtime, from the outside */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Runtime, understood from the outside</Eyebrow>
                <h2>
                  The inside of your application, <span className='mute'>read from outside of it.</span>
                </h2>
                <p>
                  Everything that decides an attack is in the clear for a moment inside the process: the decoded payload, the argument a function was handed, the value it gave back. Until now the only way to
                  reach that was to run a vendor&rsquo;s code in your process behind an SDK or a runtime flag. Odigos reads it from the kernel, at the moment your function is called, and stitches what it reads
                  across every service the request touched.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={60}>
              <DeployFigure />
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
            <Reveal delay={110}>
              <Verdict>
                <p>
                  A trace tells you a request touched four services. This tells you <b>which function in each of them ran, what it was handed, and what it returned</b>{' '}
                  <span className='q'>on the request that mattered</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* 5. no code changes, no dev work */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>What your engineers have to do</Eyebrow>
                <h2>
                  Nothing. <span className='mute'>That is the whole integration.</span>
                </h2>
                <p>
                  Function-level defense has stayed out of reach for one reason: everything that offered it asked your developers to carry it, one service and one release at a time. This does not.
                </p>
              </Head>
            </Reveal>
            <Reveal delay={50}>
              <Refrain>
                <span>No code changes.</span>
                <span>No SDK.</span>
                <span>No sidecar.</span>
                <span>No redeploy.</span>
                <span>No developer ticket.</span>
              </Refrain>
            </Reveal>
            <Reveal delay={70}>
              <Facts>
                {DEPLOY.map((x) => (
                  <Fact key={x.h}>
                    <h3>{x.h}</h3>
                    <p>{x.p}</p>
                  </Fact>
                ))}
              </Facts>
            </Reveal>
            <Reveal delay={120}>
              <TrustLinks>
                <a href='https://github.com/odigos-io/odigos/tree/main/odiglet'>Read the node agent source</a>
                <a href='https://trust.odigos.io'>Trust center and SOC 2</a>
                <a href='https://docs.odigos.io/quickstart/introduction'>The deployment guide</a>
              </TrustLinks>
            </Reveal>
          </Inner>
        </Section>

        {/* 6. detection without signatures */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Detection without signatures</Eyebrow>
                <h2>The exploit is two function calls that were not there yesterday.</h2>
                <p>
                  Nobody had a signature for this call graph and none was needed. Odigos learns the graph each route normally produces, then surfaces what has never appeared on it. Six ways a request can be
                  structurally wrong, every one of them a shape learned from your own traffic rather than a rule somebody wrote in advance.
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
            <Reveal delay={170}>
              <Verdict>
                <p>
                  Nothing here is a model guessing at intent. <b>The baseline is your own traffic</b>, and a deviation is{' '}
                  <span className='q'>arithmetic on what that route has always done</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* 7. triage */}
        <Section>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Triage</Eyebrow>
                <h2>Which of those four thousand actually ran?</h2>
                <p>
                  A scanner can tell you a vulnerable package is present. It cannot tell you whether the vulnerable function was ever loaded, whether anything can reach it, whether it has been called, or by
                  whom. Odigos answers that from the running system, which is the difference between a backlog and a short list.
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
                  Most of what your scanner ranks critical is <b>present but never called</b>. Some of what it ranks low is executing on a privileged route right now. Without the runtime you are patching in the
                  order <span className='q'>somebody else guessed</span>.
                </p>
              </Verdict>
            </Reveal>
          </Inner>
        </Section>

        {/* 8. mitigation at the function level */}
        <Section $alt>
          <Inner>
            <Reveal>
              <Head>
                <Eyebrow>Mitigation at the function level</Eyebrow>
                <h2>
                  Take one function out of play. <span className='mute'>Not the service. Not the release.</span>
                </h2>
                <p>
                  Because the finding names the exact function, the policy can too. Three situations account for most of the risk you actually carry, and in every one of them the ordinary answer, ship a patch,
                  is unavailable to you at the moment you need it.
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
              <Split>
                <Prose>
                  <p>
                    A FunctionPolicy takes the vulnerable function out of play without touching the code that contains it. Refuse the call for the routes and callers you name, or let it run and replace what it
                    returns. It is written against the function, so it holds for every path that reaches it, including the ones nobody has found yet. When the real patch ships, you delete the policy.
                  </p>
                  <p>
                    The blast radius is one function on one workload, which is why it can move at the speed the threat does. A rule at the perimeter is a decision about every request that will ever arrive. This
                    is a decision about one call.
                  </p>
                  <p>
                    It is an object rather than a console setting: versioned, attributable, and report-only until somebody promotes it, so your auditors can carry it as a compensating control rather than as an
                    undocumented change to a production application. If it is not there, the call behaves exactly as it does today.
                  </p>
                </Prose>

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
              </Split>
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
