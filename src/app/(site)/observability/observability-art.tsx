'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Keep going.

   The trace waterfall every buyer already reads: four spans, four
   durations. Then the line where most traces end. Below it, Odigos keeps
   going: the functions inside that one service, and then the call itself,
   with the value it returned.

   Four beats, one direction, downward. No timeline, no incident clock.
   The payoff is the returned 0.00, and it lands last. */

const T = '15s';

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

/* every keyframe also moves stroke-dashoffset, a main-thread property, so
   headless capture advances the loop the same way a browser does */
const rise = (from: number, to: number) => keyframes`
  0%, ${from}% { opacity: 0; margin-top: 6px; stroke-dashoffset: 0; }
  ${to}%, 94% { opacity: 1; margin-top: 0; stroke-dashoffset: 1; }
  100% { opacity: 0; margin-top: 6px; stroke-dashoffset: 0; }
`;
const open = (from: number, to: number) => keyframes`
  0%, ${from}% { opacity: 0; transform: scaleY(0.04); stroke-dashoffset: 0; }
  ${to}%, 94% { opacity: 1; transform: scaleY(1); stroke-dashoffset: 1; }
  100% { opacity: 0; transform: scaleY(0.04); stroke-dashoffset: 0; }
`;
const land = keyframes`
  0%, 46% { opacity: 0; transform: scale(0.72); stroke-dashoffset: 0; }
  53% { opacity: 1; transform: scale(1.06); stroke-dashoffset: 0.5; }
  57%, 94% { opacity: 1; transform: scale(1); stroke-dashoffset: 1; }
  100% { opacity: 0; transform: scale(0.72); stroke-dashoffset: 0; }
`;

const kC1 = open(4, 13);
const kL2a = rise(9, 17);
const kL2b = rise(12, 20);
const kL2c = rise(15, 23);
const kC2 = open(25, 35);
const kL3 = rise(29, 39);
const kCall = rise(38, 46);
const kFoot = rise(56, 62);

const Frame = styled.div`
  position: relative;
  animation: ${float} 9s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  width: 100%;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: var(--shadow-panel);
  overflow: hidden;
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .c1,
  .l2a,
  .l2b,
  .l2c,
  .c2,
  .l3,
  .call,
  .zero,
  .foot {
    opacity: 0;
  }
  .c1 {
    transform-box: view-box;
    transform-origin: 393px 94px;
    animation: ${kC1} ${T} cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  .l2a {
    animation: ${kL2a} ${T} ease-out infinite;
  }
  .l2b {
    animation: ${kL2b} ${T} ease-out infinite;
  }
  .l2c {
    animation: ${kL2c} ${T} ease-out infinite;
  }
  .c2 {
    transform-box: view-box;
    transform-origin: 335px 149px;
    animation: ${kC2} ${T} cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  .l3 {
    animation: ${kL3} ${T} cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  }
  .call {
    animation: ${kCall} ${T} ease-out infinite;
  }
  .zero {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${land} ${T} cubic-bezier(0.2, 0.9, 0.3, 1.4) infinite;
  }
  .foot {
    animation: ${kFoot} ${T} ease-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    g {
      opacity: 1;
      animation: none;
      transform: none;
      margin-top: 0;
    }
  }
`;

export const ObservabilityArt = () => (
  <Frame>
    <Panel
      role='img'
      aria-label='A trace waterfall of four services, then a dashed line reading most traces end here. Below it Odigos keeps going: the functions inside the promo service, and then the call itself, applyDiscount with the code BLACK50 and a cart of 49.00, which returned 0.00 at promo.go line 41. The row for BLACK50 was not found, and 312 orders were affected.'
    >
      <svg viewBox='0 0 640 460' width='640' height='460' shapeRendering='geometricPrecision' aria-hidden>
        <defs>
          <linearGradient id='oaLens1' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0' stopColor='#ece9ff' stopOpacity='0.35' />
            <stop offset='1' stopColor='#ece9ff' stopOpacity='0.85' />
          </linearGradient>
          <linearGradient id='oaLens2' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0' stopColor='#ffffff' stopOpacity='0.95' />
            <stop offset='1' stopColor='#ece9ff' stopOpacity='0.75' />
          </linearGradient>
          <filter id='oaLift' x='-20%' y='-20%' width='140%' height='150%'>
            <feDropShadow dx='0' dy='10' stdDeviation='14' floodColor='#121215' floodOpacity='0.13' />
          </filter>
        </defs>

        <g className='c2'>
          <polygon points='158,149 512,149 614,234 74,234' fill='url(#oaLens2)' />
          <line x1='158' y1='149' x2='74' y2='234' stroke='#5b43f1' strokeOpacity='0.22' strokeWidth='1' />
          <line x1='512' y1='149' x2='614' y2='234' stroke='#5b43f1' strokeOpacity='0.22' strokeWidth='1' />
        </g>

        <g className='c1'>
          <polygon points='354,94 433,94 540,138 158,138' fill='url(#oaLens1)' />
          <line x1='354' y1='94' x2='158' y2='138' stroke='#5b43f1' strokeOpacity='0.3' strokeWidth='1' />
          <line x1='433' y1='94' x2='540' y2='138' stroke='#5b43f1' strokeOpacity='0.3' strokeWidth='1' />
        </g>

        <g className='l1' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <rect x='126' y='28' width='414' height='9' rx='4.5' fill='#f4f2ec' />
          <rect x='126' y='47' width='414' height='9' rx='4.5' fill='#f4f2ec' />
          <rect x='126' y='66' width='414' height='9' rx='4.5' fill='#f4f2ec' />
          <rect x='126' y='85' width='414' height='9' rx='4.5' fill='#f4f2ec' />

          <rect x='126' y='28' width='414' height='9' rx='4.5' fill='#d8d4c9' />
          <rect x='141' y='47' width='375' height='9' rx='4.5' fill='#d8d4c9' />
          <rect x='165' y='66' width='23' height='9' rx='4.5' fill='#d8d4c9' />
          <rect x='354' y='85' width='79' height='9' rx='4.5' fill='#ece9ff' stroke='#5b43f1' strokeWidth='1.25' />

          <text x='26' y='35.5' fontSize='11' fill='#6d6d75'>
            POST /checkout
          </text>
          <text x='26' y='54.5' fontSize='11' fill='#6d6d75'>
            cart-api
          </text>
          <text x='26' y='73.5' fontSize='11' fill='#6d6d75'>
            orders-db
          </text>
          <text x='26' y='92.5' fontSize='11' fill='#121215'>
            promo-svc
          </text>

          <text x='614' y='35.5' fontSize='11' fill='#6d6d75' textAnchor='end'>
            214 ms
          </text>
          <text x='614' y='54.5' fontSize='11' fill='#6d6d75' textAnchor='end'>
            194 ms
          </text>
          <text x='614' y='73.5' fontSize='11' fill='#6d6d75' textAnchor='end'>
            12 ms
          </text>
          <text x='614' y='92.5' fontSize='11' fill='#121215' textAnchor='end'>
            41 ms
          </text>
        </g>

        <g className='bnd' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <text x='26' y='119.5' fontSize='11' fill='#716e66'>
            most traces end here
          </text>
          <line x1='168' y1='116' x2='614' y2='116' stroke='#d8d4c9' strokeWidth='1' strokeDasharray='3 4' />
        </g>

        <g className='l2a' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <rect x='158' y='138' width='382' height='11' rx='5.5' fill='#ffffff' stroke='#e8e5dd' strokeWidth='1' />
          <rect x='158' y='138' width='354' height='11' rx='5.5' fill='#5b43f1' />
          <text x='50' y='147.5' fontSize='12' fill='#121215'>
            applyDiscount
          </text>
          <text x='614' y='147.5' fontSize='12' fill='#121215' textAnchor='end'>
            38 ms
          </text>
        </g>

        <g className='l2b' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <rect x='158' y='162' width='382' height='11' rx='5.5' fill='#ffffff' stroke='#e8e5dd' strokeWidth='1' />
          <rect x='186' y='162' width='224' height='11' rx='5.5' fill='#d8d4c9' />
          <text x='62' y='171.5' fontSize='12' fill='#6d6d75'>
            rules.Fetch
          </text>
          <text x='614' y='171.5' fontSize='12' fill='#6d6d75' textAnchor='end'>
            24 ms
          </text>
        </g>

        <g className='l2c' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <rect x='158' y='186' width='382' height='11' rx='5.5' fill='#ffffff' stroke='#e8e5dd' strokeWidth='1' />
          <rect x='205' y='186' width='47' height='11' rx='5.5' fill='#d8d4c9' />
          <text x='74' y='195.5' fontSize='12' fill='#6d6d75'>
            cache.Get
          </text>
          <text x='614' y='195.5' fontSize='12' fill='#6d6d75' textAnchor='end'>
            5 ms
          </text>
        </g>

        <g className='l3' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <rect x='74' y='234' width='540' height='206' rx='14' fill='#0b0b0d' filter='url(#oaLift)' />
          <rect x='100' y='248' width='488' height='4' rx='2' fill='#5b43f1' />
          <text x='100' y='279' fontSize='12' fill='#ffffff' fillOpacity='0.46'>
            promo.go:41
          </text>
          <text x='588' y='279' fontSize='12' fill='#ffffff' fillOpacity='0.46' textAnchor='end'>
            deploy 4812
          </text>
        </g>

        <g className='call' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <text x='100' y='322' fontSize='24' fill='#ffffff' fillOpacity='0.92'>
            applyDiscount(
            <tspan fill='#1fd793' fillOpacity='1'>&quot;BLACK50&quot;</tspan>, 49.00)
          </text>
          <text x='100' y='382' fontSize='22' fill='#ffffff' fillOpacity='0.46'>
            returned
          </text>
        </g>

        <g className='zero' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <text x='218' y='382' fontSize='42' fill='#ff5d8f'>
            0.00
          </text>
        </g>

        <g className='foot' fontFamily='var(--font-mono), ui-monospace, monospace'>
          <line x1='100' y1='402' x2='588' y2='402' stroke='#ffffff' strokeOpacity='0.1' strokeWidth='1' />
          <text x='100' y='423' fontSize='12' fill='#ffffff' fillOpacity='0.46'>
            rules[
            <tspan fill='#1fd793' fillOpacity='0.75'>&quot;BLACK50&quot;</tspan>] not found
          </text>
          <text x='588' y='423' fontSize='12' fill='#ffffff' fillOpacity='0.46' textAnchor='end'>
            312 orders affected
          </text>
        </g>
      </svg>
    </Panel>
  </Frame>
);
