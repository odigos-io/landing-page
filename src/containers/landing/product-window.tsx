'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* A calm, light product visual for the hero. Shows production at a glance:
   a health overview of services, one degraded, and the resolved root cause.
   Pure CSS/SVG, light to paint, no typewriter. */

const floaty = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}`;
const pulse = keyframes`0%{box-shadow:0 0 0 0 rgba(255,93,143,.5)}70%{box-shadow:0 0 0 7px rgba(255,93,143,0)}100%{box-shadow:0 0 0 0 rgba(255,93,143,0)}`;
const rise = keyframes`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`;
const draw = keyframes`to{stroke-dashoffset:0}`;

const Frame = styled.div`
  position: relative;
  animation: ${floaty} 9s ease-in-out infinite;
`;

const Window = styled.div`
  position: relative;
  border-radius: 18px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(var(--paper-2), var(--paper));
`;
const Dots = styled.div`
  display: flex;
  gap: 7px;
  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--line-strong);
  }
`;
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), monospace;
  font-size: 12.5px;
  color: var(--ink-soft);
  font-weight: 500;
  .live {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--signal-bright);
  }
`;
const Region = styled.div`
  margin-left: auto;
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  color: var(--ink-faint);
`;

const Body = styled.div`
  padding: 16px 18px 18px;
`;

const Caption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono), monospace;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 12px;
  .ok {
    color: var(--signal);
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div<{ $hot?: boolean; $i: number }>`
  display: grid;
  grid-template-columns: 14px 1fr 76px 56px;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border-radius: 9px;
  animation: ${rise} 0.5s ease both;
  animation-delay: ${({ $i }) => 0.05 + $i * 0.08}s;
  background: ${({ $hot }) => ($hot ? 'rgba(255,93,143,.06)' : 'transparent')};
  border: 1px solid ${({ $hot }) => ($hot ? 'rgba(255,93,143,.2)' : 'transparent')};

  .status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $hot }) => ($hot ? 'var(--hot)' : 'var(--signal-bright)')};
    ${({ $hot }) =>
      $hot &&
      css`
        animation: ${pulse} 2s infinite;
      `}
  }
  .name {
    font-size: 13.5px;
    color: var(--ink);
    font-weight: 450;
  }
  .metric {
    text-align: right;
    font-family: var(--font-mono), monospace;
    font-size: 11.5px;
    color: ${({ $hot }) => ($hot ? 'var(--hot)' : 'var(--ink-mute)')};
  }
`;

const Spark = styled.svg<{ $hot?: boolean }>`
  width: 76px;
  height: 22px;
  overflow: visible;
  path {
    fill: none;
    stroke: ${({ $hot }) => ($hot ? 'var(--hot)' : 'var(--signal-bright)')};
    stroke-width: 1.5;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    animation: ${draw} 1.1s ease forwards;
    animation-delay: 0.5s;
  }
`;

const Insight = styled.div`
  margin-top: 14px;
  padding: 14px 15px;
  border-radius: 13px;
  background: var(--signal-soft);
  border: 1px solid rgba(17, 168, 119, 0.25);
  display: flex;
  gap: 12px;
  animation: ${rise} 0.6s ease both;
  animation-delay: 0.9s;
`;
const Mark = styled.div`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: var(--signal);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
const IText = styled.div`
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--ink);
  b {
    font-weight: 600;
  }
  small {
    display: block;
    margin-top: 4px;
    font-family: var(--font-mono), monospace;
    font-size: 11px;
    letter-spacing: 0.02em;
    color: var(--signal);
  }
`;

const Badge = styled.div`
  position: absolute;
  right: -18px;
  bottom: -20px;
  z-index: 3;
  padding: 12px 15px;
  border-radius: 13px;
  background: var(--ink);
  color: var(--paper-2);
  box-shadow: var(--shadow-lift);
  animation: ${floaty} 9s ease-in-out infinite;
  animation-delay: 0.6s;
  @media (max-width: 520px) {
    display: none;
  }
  .k {
    font-family: var(--font-mono), monospace;
    font-size: 9.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--panel-mute);
  }
  .v {
    margin-top: 3px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
`;

const Check = () => (
  <svg width='15' height='15' viewBox='0 0 16 16' fill='none' aria-hidden>
    <path d='M3 8.4 6.3 11.7 13 4.5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const SERVICES = [
  { name: 'api-gateway', metric: '180ms', d: 'M0,14 6,12 12,15 18,11 24,13 30,12 38,13 46,11 54,12 62,13 70,12 76,12' },
  { name: 'web-frontend', metric: '92ms', d: 'M0,13 8,14 16,12 24,13 32,11 40,13 48,12 56,13 64,12 70,13 76,12' },
  { name: 'checkout-svc', metric: '402ms', hot: true, d: 'M0,16 8,15 16,16 24,14 32,15 40,9 48,3 56,6 64,4 70,5 76,5' },
  { name: 'payments-api', metric: '120ms', d: 'M0,13 8,12 16,13 24,12 32,13 40,12 48,13 56,12 64,13 70,12 76,13' },
  { name: 'inventory', metric: '64ms', d: 'M0,14 8,13 16,14 24,13 32,14 40,13 48,14 56,13 64,14 70,13 76,14' },
];

export const ProductWindow = () => {
  return (
    <Frame>
      <Window>
        <TopBar>
          <Dots>
            <span />
            <span />
            <span />
          </Dots>
          <Title>
            <span className='live' /> Production
          </Title>
          <Region>342 services · live</Region>
        </TopBar>

        <Body>
          <Caption>
            <span>Service health</span>
            <span>
              <span className='ok'>341 healthy</span> · 1 degraded
            </span>
          </Caption>

          <Rows>
            {SERVICES.map((s, i) => (
              <Row key={s.name} $hot={s.hot} $i={i}>
                <span className='status' />
                <span className='name'>{s.name}</span>
                <Spark $hot={s.hot} viewBox='0 0 76 22' preserveAspectRatio='none'>
                  <path d={s.d} />
                </Spark>
                <span className='metric'>{s.metric}</span>
              </Row>
            ))}
          </Rows>

          <Insight>
            <Mark>
              <Check />
            </Mark>
            <IText>
              <b>checkout-svc</b> p99 traced to a missing index on <b>pg.query</b>, introduced by the 14:30 deploy.
              <small>root cause found in 3.2s · no redeploy</small>
            </IText>
          </Insight>
        </Body>
      </Window>

      <Badge>
        <div className='k'>Mean time to root cause</div>
        <div className='v'>seconds, not days</div>
      </Badge>
    </Frame>
  );
};
