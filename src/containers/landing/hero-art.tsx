'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: focusing.

   A field of production, and a focus box that racks in on it, four times,
   until it is sitting on one function. The only words are the kind of
   telemetry being asked for at each stop, and they change because the
   question changed. One of them comes back empty, so the focus keeps going. */

const T = 9.2;

const track = keyframes`
  0%,5%   { opacity:0; left:3%;    top:5%;  width:94%;  height:90%; }
  9%,20%  { opacity:1; left:3%;    top:5%;  width:94%;  height:90%; }
  28%,38% { opacity:1; left:43%;   top:12%; width:35%;  height:42%; }
  46%,58% { opacity:1; left:56%;   top:25%; width:16%;  height:20%; }
  66%,100%{ opacity:1; left:62.4%; top:32%; width:6.4%; height:8.4%; }
`;

const show = (a: number, b: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 3}%,${b}% { opacity:1; transform:none }
  ${b + 3}%,100% { opacity:0; transform:translateY(-4px) }`;

const stay = (a: number) => keyframes`
  0%,${a}% { opacity:0; transform:translateY(4px) }
  ${a + 3}%,100% { opacity:1; transform:none }`;

const lock = keyframes`
  0%,66% { opacity:.22; transform:scale(1) }
  72%    { opacity:1;   transform:scale(2.6) }
  78%,100%{ opacity:1;  transform:scale(1.9) }`;

const halo = keyframes`
  0%,70%  { opacity:0; transform:scale(.4) }
  80%     { opacity:.5; transform:scale(1) }
  100%    { opacity:0; transform:scale(1.9) }`;

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const blink = keyframes`0%,100%{opacity:.35}50%{opacity:1}`;

const reduce = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal);
    animation: ${blink} 1.9s ease-in-out infinite;
    ${reduce}
  }
`;

const Field = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.42 / 1;
  background-image: radial-gradient(circle, rgba(24, 20, 54, 0.19) 1.2px, transparent 1.2px);
  background-size: 21px 21px;
  background-position: 11px 11px;
  @media (max-width: 560px) {
    aspect-ratio: 1.15 / 1;
    background-size: 17px 17px;
  }
`;

/* the focus box */
const Reticle = styled.div`
  position: absolute;
  animation: ${track} ${T}s cubic-bezier(0.65, 0, 0.2, 1) infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    left: 62.4%;
    top: 32%;
    width: 6.4%;
    height: 8.4%;
    opacity: 1;
  }

  span {
    position: absolute;
    width: 11px;
    height: 11px;
    border: 1.6px solid var(--accent);
  }
  span:nth-child(1) {
    top: -1px;
    left: -1px;
    border-right: 0;
    border-bottom: 0;
    border-radius: 3px 0 0 0;
  }
  span:nth-child(2) {
    top: -1px;
    right: -1px;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 3px 0 0;
  }
  span:nth-child(3) {
    bottom: -1px;
    left: -1px;
    border-right: 0;
    border-top: 0;
    border-radius: 0 0 0 3px;
  }
  span:nth-child(4) {
    bottom: -1px;
    right: -1px;
    border-left: 0;
    border-top: 0;
    border-radius: 0 0 3px 0;
  }
  /* crosshairs */
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(91, 67, 241, 0.22);
  }
  &::before {
    left: 50%;
    top: 12%;
    bottom: 12%;
    width: 1px;
  }
  &::after {
    top: 50%;
    left: 12%;
    right: 12%;
    height: 1px;
  }
`;

/* what it lands on */
const Target = styled.i`
  position: absolute;
  left: 65.6%;
  top: 36.2%;
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--accent);
  animation: ${lock} ${T}s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scale(1.9);
  }
`;

const Halo = styled.i`
  position: absolute;
  left: 65.6%;
  top: 36.2%;
  width: 46px;
  height: 46px;
  margin: -23px 0 0 -23px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  animation: ${halo} ${T}s ease-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

/* the only words on the picture */
const Asked = styled.div`
  position: absolute;
  left: 22px;
  bottom: 20px;
  height: 22px;
  @media (max-width: 1000px) {
    left: 16px;
    bottom: 16px;
  }

  span {
    position: absolute;
    left: 0;
    bottom: 0;
    white-space: nowrap;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: clamp(12.5px, 1.25vw, 15px);
    letter-spacing: 0.02em;
    color: var(--accent);
  }
  .dead {
    color: var(--ink-faint);
  }
  .dead s {
    text-decoration-color: rgba(24, 20, 54, 0.3);
  }
`;

const A1 = styled.span`
  animation: ${show(6, 22)} ${T}s ease infinite;
  ${reduce}
`;
const A2 = styled.span`
  animation: ${show(25, 40)} ${T}s ease infinite;
  ${reduce}
`;
const A3 = styled.span`
  animation: ${show(43, 58)} ${T}s ease infinite;
  ${reduce}
`;
const A4 = styled.span`
  animation: ${stay(62)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`;

const Answer = styled.span`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: clamp(12px, 1.2vw, 13.5px);
  color: var(--ink);
  animation: ${stay(74)} ${T}s ease infinite;
  ${reduce}
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  b {
    color: var(--hot-ink);
    font-weight: 600;
  }
`;

const Foot = styled.div`
  padding: 14px 22px 17px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--ink-faint);
  @media (max-width: 1000px) {
    padding: 12px 16px 15px;
  }

  .sep {
    color: var(--line-strong);
    margin: 0 8px;
  }
  .meta {
    white-space: nowrap;
  }
`;

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Bar>
        <span>production</span>
        <span className='live'>
          <i className='dot' />
          live
        </span>
      </Bar>

      <Field>
        <Halo />
        <Target />
        <Reticle>
          <span />
          <span />
          <span />
          <span />
        </Reticle>

        <Asked>
          <A1>asking for metrics</A1>
          <A2>asking for traces</A2>
          <A3 className='dead'>
            <s>asking for logs</s> nothing here
          </A3>
          <A4>asking for the function&rsquo;s values</A4>
        </Asked>

      </Field>

      <Foot>
        <Answer>
          promo.Apply returned <b>$0.00</b>, not $24.50
        </Answer>
        <span className='meta'>
          seconds per step
          <span className='sep'>·</span>
          no code change
        </span>
      </Foot>
    </Panel>
  </Frame>
);
