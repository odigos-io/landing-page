'use client';

import React from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

/* Hero art: the real console, with a live capture landing on top of it.

   Six attempts at a bespoke diagram in this hero all read as a diagram, which
   is the wrong register for the first thing an enterprise buyer sees. The
   product itself has density and credibility that a drawing cannot fake, so
   the screenshot carries the frame and a small overlay carries the argument:
   somebody asks, and data that was not being collected shows up. */

const DUR = '9s';

const rise = keyframes`
  0%,6%{opacity:0;transform:translateY(10px)}
  12%,88%{opacity:1;transform:none}
  95%,100%{opacity:0;transform:translateY(-6px)}`;

const land = (r: number) => keyframes`
  0%,${r}%{opacity:0;transform:translateX(14px)}
  ${r + 5}%{opacity:1;transform:none}
  88%{opacity:1;transform:none}
  95%,100%{opacity:0;transform:translateX(-8px)}`;

const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}`;

const Frame = styled.div`
  position: relative;
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Shot = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0b0b0d;
  box-shadow: var(--shadow-panel);
  line-height: 0;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  /* the console is dense and dark; this lifts the overlay off it */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(8, 8, 12, 0) 40%, rgba(8, 8, 12, 0.72) 100%);
    pointer-events: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 4%;
  right: 4%;
  bottom: 5%;
  z-index: 2;
  display: grid;
  gap: 8px;
`;

const Ask = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 12px;
  background: rgba(16, 14, 30, 0.82);
  border: 1px solid rgba(166, 144, 255, 0.4);
  backdrop-filter: blur(10px);
  animation: ${rise} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(11px, 1.02vw, 13.5px);
  color: #efeaff;
  .caret {
    color: #a690ff;
    font-weight: 700;
  }
  .who {
    margin-left: auto;
    font-size: 0.78em;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9a92c8;
    white-space: nowrap;
  }
  @media (max-width: 620px) {
    .who {
      display: none;
    }
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Chip = styled.span<{ $kf: ReturnType<typeof keyframes> }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border-radius: 10px;
  background: rgba(10, 32, 26, 0.82);
  border: 1px solid rgba(31, 215, 147, 0.45);
  backdrop-filter: blur(10px);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(10.5px, 0.95vw, 12.5px);
  color: #d8f5e8;
  white-space: nowrap;
  animation: ${(p) => p.$kf} ${DUR} cubic-bezier(0.16, 1, 0.3, 1) infinite;
  b {
    color: #1fd793;
    font-weight: 600;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Live = styled.span`
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  border-radius: 999px;
  background: rgba(8, 8, 12, 0.7);
  border: 1px solid rgba(31, 215, 147, 0.4);
  backdrop-filter: blur(8px);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9fe9c8;
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1fd793;
    animation: ${blink} 1.6s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`;

const CAPTURED = [
  { t: 'fraudScore()', v: '240ms', at: 18 },
  { t: 'risk-api · retry 3/3', v: '210ms', at: 26 },
  { t: 'userId "u_8843"', v: 'captured', at: 34 },
];

export const HeroArt = () => {
  return (
    <Frame>
      <Shot>
        <Image
          src='/assets/renders/product_preview.png'
          alt='The Odigos console showing detected sources, in-flight actions and export destinations for a production cluster'
          width={1440}
          height={900}
          priority
          sizes='(max-width: 1000px) 100vw, 620px'
        />
        <Live>no redeploy</Live>
        <Overlay>
          <Ask>
            <span className='caret'>❯</span>
            <span>why is checkout p99 up 3x?</span>
            <span className='who'>ai agent</span>
          </Ask>
          <Chips>
            {CAPTURED.map((c) => (
              <Chip key={c.t} $kf={land(c.at)}>
                {c.t} <b>{c.v}</b>
              </Chip>
            ))}
          </Chips>
        </Overlay>
      </Shot>
    </Frame>
  );
};
