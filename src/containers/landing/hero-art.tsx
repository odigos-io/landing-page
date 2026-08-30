'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: zooming into production.

   Not a list and not a ladder. A view of the whole estate from above, and
   then a frame inside a frame inside a frame, each one a decision to go
   further in, ending on the value that explains it. One direction was tried
   and backed out of, because that is what looking for something actually
   looks like. */

const T = 8.2;
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

/* each frame snaps in, as if the view just closed on it */
const zoom = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(1.1)}
  ${p(s + 0.55)}%,100%{opacity:1;transform:scale(1)}`;

const fin = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.5)}%,100%{opacity:1}`;

const fade = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + 0.3)}%,${p(s + 1.1)}%{opacity:1}
  ${p(s + 1.5)}%,100%{opacity:0.42}`;

const land = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.9)}
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

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 22px;
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 12px 16px;
    font-size: 9.5px;
  }

  .live {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--signal-ink);
    white-space: nowrap;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.9s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

/* the estate, seen from above */
const Sky = styled.div`
  position: relative;
  padding: 26px;
  background-image: radial-gradient(circle, rgba(24, 20, 54, 0.16) 1.1px, transparent 1.1px);
  background-size: 17px 17px;
  @media (max-width: 1000px) {
    padding: 16px;
  }
`;

const Box = styled.div<{ $t: number; $depth: number }>`
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(91, 67, 241, ${({ $depth }) => 0.16 + $depth * 0.13});
  background: rgba(255, 255, 255, ${({ $depth }) => 0.62 + $depth * 0.1});
  padding: ${({ $depth }) => ($depth === 1 ? '30px 18px 56px' : $depth === 0 ? '32px 20px 20px' : '30px 17px 18px')};
  transform-origin: center;
  animation: ${(x) => zoom(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: ${({ $depth }) => ($depth === 1 ? '26px 11px 48px' : '26px 11px 12px')};
  }
`;

const Tag = styled.span<{ $t: number }>`
  position: absolute;
  top: 9px;
  left: 14px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(9.5px, 0.92vw, 11px);
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent);
  animation: ${(x) => fin(x.$t)} ${T}s ease both;
  ${reduce}
`;

const Count = styled.span`
  position: absolute;
  top: 9px;
  right: 14px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(9.5px, 0.92vw, 11px);
  color: var(--ink-faint);
`;

/* the direction that turned out to be wrong */
const DeadEnd = styled.div<{ $t: number }>`
  position: absolute;
  left: 16px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 11px;
  border-radius: 8px;
  border: 1px dashed var(--line-strong);
  background: var(--paper);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(10px, 0.95vw, 11.5px);
  color: var(--ink-faint);
  animation: ${(x) => fade(x.$t)} ${T}s ease both;
  ${reduce}
  @media (max-width: 560px) {
    display: none;
  }

  s {
    text-decoration-color: rgba(24, 20, 54, 0.35);
  }
`;

const Hit = styled.div<{ $t: number }>`
  text-align: center;
  padding: 6px 0 4px;
  animation: ${(x) => land(x.$t)} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: center;
  ${reduce}

  .n {
    font-size: clamp(30px, 3.6vw, 44px);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1;
    color: var(--ink);
  }
  .was {
    display: block;
    margin-top: 8px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(11px, 1.05vw, 12.5px);
    color: var(--hot-ink);
  }
  .was s {
    text-decoration-color: rgba(201, 52, 106, 0.5);
  }
`;

const Foot = styled.div<{ $t: number }>`
  padding: 15px 22px 18px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: baseline;
  gap: 9px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-faint);
  animation: ${(x) => fin(x.$t)} ${T}s ease both;
  ${reduce}
  @media (max-width: 1000px) {
    padding: 13px 16px 15px;
  }

  .sep {
    color: var(--line-strong);
  }
`;

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>production, from above</span>
        <span className='live'>
          <i className='dot' />
          live
        </span>
      </Bar>

      <Sky>
        <Box $t={0.1} $depth={0}>
          <Tag $t={0.1}>the whole cluster</Tag>
          <Count>400 services</Count>

          <Box $t={1.3} $depth={1}>
            <Tag $t={1.3}>checkout</Tag>
            <Count>p99 flat</Count>

            <Box $t={2.5} $depth={2}>
              <Tag $t={2.5}>POST /orders</Tag>
              <Count>214ms</Count>

              <Box $t={4.4} $depth={3}>
                <Tag $t={4.4}>promo.Apply</Tag>
                <Count>no error</Count>
                <Hit $t={5.2}>
                  <span className='n'>$0.00</span>
                  <span className='was'>
                    it should have returned <s>$24.50</s>
                  </span>
                </Hit>
              </Box>
            </Box>

            <DeadEnd $t={3.3}>
              <s>db.Commit</s>
              nothing here, back out
            </DeadEnd>
          </Box>
        </Box>
      </Sky>

      <Foot $t={6.2}>
        four moves
        <span className='sep'>·</span>
        about a second each
        <span className='sep'>·</span>
        no code change
      </Foot>
    </Panel>
  </Frame>
);
