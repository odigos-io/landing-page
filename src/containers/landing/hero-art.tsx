'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: four requests, and the scope closing.

   Each row is a different kind of telemetry, asked for on demand. The bar of
   marks is how much of production is still in play, and it collapses as the
   answers come back. The third request is for logs and returns nothing,
   because that is what a static signal does when the question is new. The
   fourth is the one nothing else can serve. */

const T = 8.6;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const rowIn = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(9px)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:none}`;

const scan = (s: number) => keyframes`
  0%,${p(s)}%{transform:scaleX(0)}
  ${p(s + 0.55)}%,100%{transform:scaleX(1)}`;

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.45)}%,100%{opacity:1}`;

const dim = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.4)}%,${p(s + 1.2)}%{opacity:1}
  ${p(s + 1.6)}%,100%{opacity:0.4}`;

const hit = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.88)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:scale(1)}`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;

const Frame = styled.div`
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.16);
  background: var(--paper-2);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 132px 1fr;
  gap: 18px;
  padding: 14px 24px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    grid-template-columns: 104px 1fr;
    gap: 12px;
    padding: 12px 16px;
    font-size: 9px;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 0;
    span + span {
      display: none;
    }
  }
`;

const Rows = styled.div`
  padding: 8px 24px 14px;
  @media (max-width: 1000px) {
    padding: 6px 16px 12px;
  }
`;

const Row = styled.div<{ $t: number }>`
  display: grid;
  grid-template-columns: 132px 1fr;
  gap: 18px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--line);
  animation: ${(x) => rowIn(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 104px 1fr;
    gap: 12px;
    padding: 13px 0;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Kind = styled.span<{ $win?: boolean }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(10.5px, 1vw, 12px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.35;
  color: ${({ $win }) => ($win ? 'var(--accent)' : 'var(--ink-mute)')};
  font-weight: ${({ $win }) => ($win ? 600 : 400)};
`;

/* how much of production is still in play */
const Scope = styled.div<{ $t: number; $h: number; $pick: number; $dead?: boolean; $win?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3px;
  width: 100%;
  transform-origin: left center;
  animation: ${(x) => scan(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}

  i {
    position: relative;
    flex: 1;
    height: ${({ $h }) => $h}px;
    border-radius: 2.5px;
    background: ${({ $dead }) => ($dead ? 'var(--line-strong)' : 'rgba(24,20,54,0.19)')};
  }
  /* the block the next row is a close-up of */
  i:nth-child(${({ $pick }) => $pick}) {
    background: ${({ $dead, $win }) => ($win ? 'var(--accent)' : $dead ? '#b3b0a8' : 'var(--accent)')};
  }
  i:nth-child(${({ $pick }) => $pick})::after {
    content: '';
    display: ${({ $win }) => ($win ? 'none' : 'block')};
    position: absolute;
    left: 50%;
    top: calc(100% + 4px);
    width: 7px;
    height: 7px;
    margin-left: -3.5px;
    border-right: 1.5px solid ${({ $dead }) => ($dead ? '#c2bfb7' : 'var(--accent)')};
    border-bottom: 1.5px solid ${({ $dead }) => ($dead ? '#c2bfb7' : 'var(--accent)')};
    transform: rotate(45deg);
  }
`;

const Got = styled.div<{ $t: number; $dead?: boolean; $win?: boolean }>`
  margin-top: 16px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12px, 1.15vw, 13.5px);
  line-height: 1.5;
  color: ${({ $dead, $win }) => ($win ? 'var(--ink)' : $dead ? 'var(--ink-faint)' : 'var(--ink-mute)')};
  animation: ${(x) => (x.$dead ? dim(x.$t) : x.$win ? hit(x.$t) : fin(x.$t))} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: left center;
  ${reduce}

  s {
    text-decoration-color: rgba(24, 20, 54, 0.32);
  }
  b {
    color: var(--hot-ink);
    font-weight: 600;
  }
  .fn {
    color: var(--accent);
  }
`;

const Foot = styled.div<{ $t: number }>`
  padding: 15px 24px 18px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--signal-ink);
  animation: ${(x) => fin(x.$t)} ${T}s ease both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 13px 16px 15px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.9s ease-in-out infinite;
  }
  .sep {
    color: var(--line-strong);
  }
  .mute {
    color: var(--ink-faint);
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Head>
        <span>asked for</span>
        <span>what it can see at that resolution</span>
      </Head>

      <Rows>
        <Row $t={0.2}>
          <Kind>metrics</Kind>
          <div>
            <Scope $t={0.5} $h={13} $pick={27}>
              {Array.from({ length: 40 }, (_, i) => (
                <i key={i} />
              ))}
            </Scope>
            <Got $t={1.0}>400 services · nothing is failing</Got>
          </div>
        </Row>

        <Row $t={1.7}>
          <Kind>traces</Kind>
          <div>
            <Scope $t={2.0} $h={17} $pick={4}>
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </Scope>
            <Got $t={2.5}>1 service · POST /orders · 214ms, no error</Got>
          </div>
        </Row>

        <Row $t={3.2}>
          <Kind>logs</Kind>
          <div>
            <Scope $t={3.5} $h={22} $pick={2} $dead>
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} />
              ))}
            </Scope>
            <Got $t={4.0} $dead>
              1 request · <s>nothing here about the discount</s> · back out
            </Got>
          </div>
        </Row>

        <Row $t={5.0}>
          <Kind $win>function values</Kind>
          <div>
            <Scope $t={5.3} $h={30} $pick={1} $win>
              <i />
            </Scope>
            <Got $t={5.9} $win>
              1 function · <span className='fn'>promo.Apply</span> returned <b>$0.00</b>, not $24.50
            </Got>
          </div>
        </Row>
      </Rows>

      <Foot $t={6.9}>
        <i className='dot' />
        four requests, seconds apart
        <span className='sep'>·</span>
        <span className='mute'>none of it existed before we asked</span>
      </Foot>
    </Panel>
  </Frame>
);
