'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/* Hero art: the borehole.

   One shaft cut down into a running production system, four cuts, each at
   higher resolution than the one above, ending inside one function's
   arguments. Two channels run the length of it: violet going down carrying
   what we want production to capture, green coming back up carrying what it
   captured. Every rung has an arrow in and an arrow out.

   The third rung fails on purpose. A stripped binary hands back nothing, we
   read DWARF and go again. Then the answer travels back up the shaft and
   rewrites the top band, where the whole category said nothing was wrong. */

const T = 11.4; // seconds
const p = (s: number) => Math.max(0, Math.min(100, (s / T) * 100));

const fin = (s: number, d = 0.4) => keyframes`
  0%,${p(s)}%{opacity:0}
  ${p(s + d)}%,100%{opacity:1}`;

const fout = (s: number, d = 0.4) => keyframes`
  0%,${p(s)}%{opacity:1}
  ${p(s + d)}%,100%{opacity:0}`;

const rise = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(6px)}
  ${p(s + 0.5)}%,100%{opacity:1;transform:translateY(0)}`;

const pop = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scale(.9)}
  ${p(s + 0.45)}%,100%{opacity:1;transform:scale(1)}`;

const grow = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scaleY(0)}
  ${p(s + 0.35)}%,100%{opacity:1;transform:scaleY(1)}`;

const wipe = (s: number, d = 0.5) => keyframes`
  0%,${p(s)}%{opacity:0;transform:scaleX(0)}
  ${p(s + d)}%,100%{opacity:1;transform:scaleX(1)}`;

/* the request travelling all the way down, once */
const dive = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(0)}
  ${p(s + 0.06)}%{opacity:1}
  ${p(s + 0.54)}%{opacity:1;transform:translateY(470px)}
  ${p(s + 0.6)}%,100%{opacity:0;transform:translateY(496px)}`;

/* the answer travelling all the way back up, once */
const surface = (s: number) => keyframes`
  0%,${p(s)}%{opacity:0;transform:translateY(0)}
  ${p(s + 0.06)}%{opacity:1}
  ${p(s + 0.64)}%{opacity:1;transform:translateY(-450px)}
  ${p(s + 0.7)}%,100%{opacity:0;transform:translateY(-450px)}`;

const flow = keyframes`to{stroke-dashoffset:-96}`;
const flowUp = keyframes`to{stroke-dashoffset:96}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;

const anim = (kf: ReturnType<typeof keyframes>) => css`
  animation: ${kf} ${T}s cubic-bezier(0.16, 1, 0.3, 1) both;
`;

const Frame = styled.div`
  animation: ${float} 16s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(91, 67, 241, 0.14);
  background: linear-gradient(180deg, #fbfaff 0%, #f6f3fd 100%);
  box-shadow: var(--shadow-panel);
  padding: 14px 12px 12px;
  @media (max-width: 1000px) {
    padding: 12px 8px 10px;
  }
`;

const Art = styled.svg`
  display: block;
  width: 100%;
  height: auto;

  text {
    font-family: var(--font-mono), ui-monospace, monospace;
    letter-spacing: -0.01em;
  }
  .lbl {
    font-size: 10px;
    letter-spacing: 0.15em;
    fill: var(--ink-faint);
  }
  .down {
    font-size: 11.5px;
    fill: var(--accent);
  }
  .up {
    font-size: 11.5px;
    fill: var(--signal-ink);
  }
  .dead {
    font-size: 11.5px;
    fill: #9b9891;
  }
  .code {
    font-size: 12px;
    fill: var(--ink);
  }
  .dim {
    font-size: 11px;
    fill: var(--ink-mute);
  }
  .hot {
    font-size: 11.5px;
    fill: var(--hot-ink);
  }
  .legend {
    font-size: 10px;
    letter-spacing: 0.02em;
  }
  .big {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.03em;
    fill: var(--ink);
  }
  g[data-anim] {
    transform-box: fill-box;
    transform-origin: center;
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

const Desktop = styled(Art)`
  @media (max-width: 720px) {
    display: none;
  }
`;
const Mobile = styled(Art)`
  display: none;
  @media (max-width: 720px) {
    display: block;
  }
`;

/* ---------- animated svg primitives ---------- */

const In = styled.g<{ $t: number }>`
  ${(x) => anim(fin(x.$t))}
`;
const Out = styled.g<{ $t: number }>`
  ${(x) => anim(fout(x.$t))}
`;
const Rise = styled.g<{ $t: number }>`
  ${(x) => anim(rise(x.$t))}
  transform-box: fill-box;
`;
const Pop = styled.g<{ $t: number }>`
  ${(x) => anim(pop(x.$t))}
  transform-box: fill-box;
  transform-origin: left center;
`;
const Grow = styled.g<{ $t: number }>`
  ${(x) => anim(grow(x.$t))}
  transform-box: fill-box;
  transform-origin: top center;
`;
const Wipe = styled.g<{ $t: number; $d?: number }>`
  ${(x) => anim(wipe(x.$t, x.$d))}
  transform-box: fill-box;
  transform-origin: left center;
`;
const Dive = styled.g<{ $t: number }>`
  ${(x) => anim(dive(x.$t))}
`;
const Surface = styled.g<{ $t: number }>`
  ${(x) => anim(surface(x.$t))}
`;

const DownRail = styled.line`
  stroke: var(--accent);
  stroke-width: 1.4;
  stroke-dasharray: 5 7;
  opacity: 0.5;
  animation: ${flow} 7s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
const UpRail = styled.line`
  stroke: var(--signal);
  stroke-width: 1.4;
  stroke-dasharray: 5 7;
  opacity: 0.5;
  animation: ${flowUp} 7s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* ---------- geometry ---------- */

const XD = 24; // request channel, going down
const XU = 42; // answer channel, coming up
const L = 68; // content left
const R = 496; // content right
const CL = L - 16; // card left
const CR = R + 16; // card right

const Card = ({ top, h, depth, l = CL, r = CR }: { top: number; h: number; depth: number; l?: number; r?: number }) => (
  <>
    <rect x={l} y={top} width={r - l} height={h} rx={9} fill='var(--paper-2)' stroke='rgba(24,20,54,0.09)' strokeWidth='1' />
    <rect x={l} y={top} width={3} height={h} rx={1.5} fill={`rgba(91,67,241,${0.16 + depth * 0.22})`} />
  </>
);

type RungProps = { y: number; t: number; down: string; up: string; upAt: number; dead?: boolean; xd?: number; xu?: number; l?: number; r?: number };

const Rung = ({ y, t, down, up, upAt, dead, xd = XD, xu = XU, l = L, r = R }: RungProps) => (
  <>
    <In $t={t}>
      <path d={`M${xd} ${y - 4} H${l - 12}`} stroke='var(--accent)' strokeWidth='1.5' />
      <path d={`m${l - 12} ${y - 7.5} 5 3.5 -5 3.5z`} fill='var(--accent)' />
      <text className='down' x={l} y={y}>
        {down}
      </text>
    </In>
    {up ? (
      <In $t={upAt}>
        <path d={`M${l - 12} ${y + 5} H${xu}`} stroke={dead ? '#b3b0a8' : 'var(--signal)'} strokeWidth='1.5' strokeDasharray={dead ? '3 3' : undefined} />
        <path d={`m${xu} ${y + 1.5} -5 3.5 5 3.5z`} fill={dead ? '#c2bfb7' : 'var(--signal)'} />
        <text className={dead ? 'dead' : 'up'} x={r} y={y} textAnchor='end' textDecoration={dead ? 'line-through' : undefined}>
          {up}
        </text>
      </In>
    ) : null}
  </>
);

/* the zoom cone: a bracket on 40px of one card, splaying to the full width of the next */
const Cone = ({ x1, x2, top, bottom, t, l = CL, r = CR }: { x1: number; x2: number; top: number; bottom: number; t: number; l?: number; r?: number }) => (
  <Grow $t={t}>
    <path d={`M${x1} ${top} L${x2} ${top} L${r} ${bottom} L${l} ${bottom} Z`} fill='rgba(91,67,241,0.06)' />
    <path d={`M${x1} ${top} L${l} ${bottom}`} stroke='rgba(91,67,241,0.4)' strokeWidth='1' />
    <path d={`M${x2} ${top} L${r} ${bottom}`} stroke='rgba(91,67,241,0.4)' strokeWidth='1' />
    <path d={`M${x1} ${top - 6} v6 H${x2} v-6`} stroke='var(--accent)' strokeWidth='1.7' fill='none' />
  </Grow>
);

const SPANS = [
  { name: 'POST /orders', ms: 214, indent: 0 },
  { name: 'auth.Verify', ms: 6, indent: 12 },
  { name: 'cart.Price', ms: 31, indent: 24 },
  { name: 'promo.Apply', ms: 4, indent: 24, pick: true },
  { name: 'db.Commit', ms: 168, indent: 12 },
];

const FRAMES = [
  { blind: '??? 0x4c81a0', real: 'checkout.(*PromoEngine).Apply', at: 'promo.go:212' },
  { blind: '??? 0x4c79c4', real: 'checkout.(*Order).Total', at: 'order.go:88' },
  { blind: '??? 0x4c6f30', real: 'checkout.HandleOrders', at: 'http.go:41' },
];

const ARGS: [string, string][] = [
  ['code', '"BLACK50"'],
  ['userId', '8843'],
  ['cart', '49.00'],
];

export const HeroArt = () => (
  <Frame>
    <Panel>
      <Desktop viewBox='0 0 520 574' role='img' aria-label='Four cuts into a running production system, each at higher resolution than the one above, ending in the arguments and return value of one function.'>
        <Card top={14} h={84} depth={0} />
        <Card top={120} h={126} depth={1} />
        <Card top={268} h={118} depth={2} />
        <Card top={408} h={136} depth={3} />

        <In $t={0}>
          <DownRail x1={XD} y1={14} x2={XD} y2={544} />
          <UpRail x1={XU} y1={14} x2={XU} y2={544} />
        </In>

        {/* ---- 1 : the whole cluster, five minutes ---- */}
        <In $t={0}>
          <text className='lbl' x={L} y={34}>
            400 SERVICES · 5 MINUTES
          </text>
        </In>
        <Wipe $t={0.2} $d={0.7}>
          {Array.from({ length: 52 }, (_, i) => (
            <rect key={i} x={L + i * 8} y={42} width={3} height={13} rx={1} fill='var(--line-strong)' />
          ))}
        </Wipe>
        <Rung y={74} t={0.9} down='watch checkout · 5 min' up='p99 flat · 0 errors' upAt={1.5} />
        <In $t={10.6}>
          <path d={`M${R - 104} 70 H${R}`} stroke='#b3b0a8' strokeWidth='1' />
          <text className='hot' x={R} y={90} textAnchor='end'>
            wrong for six days · 41,208 orders
          </text>
        </In>

        <Cone x1={276} x2={320} top={98} bottom={120} t={2.0} />

        {/* ---- 2 : one order ---- */}
        <In $t={2.3}>
          <text className='lbl' x={L} y={140}>
            ONE ORDER · POST /orders · 214ms
          </text>
        </In>
        <Rung y={158} t={2.5} down='open an order that paid full price' up='5 spans' upAt={3.4} />
        {SPANS.map((s, i) => {
          const y = 176 + i * 14;
          const w = Math.max(3, (s.ms / 214) * 150);
          return (
            <Wipe key={s.name} $t={2.7 + i * 0.12} $d={0.4}>
              <text className={s.pick ? 'code' : 'dim'} x={L + s.indent} y={y}>
                {s.name}
              </text>
              <rect x={300 + s.indent} y={y - 7} width={w} height={7} rx={2} fill={s.pick ? 'var(--accent)' : 'var(--line-strong)'} />
              <text className='dim' x={R} y={y} textAnchor='end'>
                {s.ms}ms
              </text>
            </Wipe>
          );
        })}

        <Cone x1={324} x2={340} top={246} bottom={268} t={4.0} />

        {/* ---- 3 : inside one span, and the try that fails ---- */}
        <In $t={4.3}>
          <text className='lbl' x={L} y={288}>
            INSIDE promo.Apply · GO 1.22 · STRIPPED
          </text>
        </In>
        <Rung y={306} t={4.5} down='read the promo logic' up='no symbols in the binary' upAt={5.3} dead />
        <Rung y={326} t={6.1} down='recover layout · attach uprobe' up='3 frames' upAt={7.1} />

        {FRAMES.map((f, i) => {
          const y = 346 + i * 14;
          return (
            <g key={f.blind}>
              <Out $t={6.6 + i * 0.09}>
                <In $t={4.7 + i * 0.09}>
                  <text className='dead' x={L} y={y}>
                    {f.blind}
                  </text>
                </In>
              </Out>
              <In $t={6.7 + i * 0.09}>
                <text className='code' x={L} y={y}>
                  {f.real}
                </text>
                <text className='dim' x={R} y={y} textAnchor='end'>
                  {f.at}
                </text>
              </In>
            </g>
          );
        })}

        <Cone x1={L} x2={L + 44} top={386} bottom={408} t={7.4} />

        {/* ---- 4 : inside one call ---- */}
        <In $t={7.6}>
          <text className='lbl' x={L} y={428}>
            INSIDE ONE CALL
          </text>
        </In>
        <Rung y={446} t={7.8} down='capture arguments and return' up='discount = 0.00' upAt={9.4} />

        {ARGS.map(([k, v], i) => (
          <Rise key={k} $t={8.2 + i * 0.18}>
            <text className='dim' x={L + 14} y={470 + i * 15} style={{ fontSize: 12.5 }}>
              {k}
            </text>
            <text className='code' x={L + 92} y={470 + i * 15} fill='var(--accent)' style={{ fontSize: 12.5 }}>
              {v}
            </text>
          </Rise>
        ))}

        <Pop $t={9.2}>
          <text className='dim' x={L} y={532}>
            returned
          </text>
          <text className='big' x={L + 66} y={538}>
            0.00
          </text>
          <text className='hot' x={L + 152} y={538} textDecoration='line-through'>
            expected 24.50
          </text>
        </Pop>

        <In $t={9.9}>
          <path d='M28 560 v-9 m-3.4 5.6 3.4 3.4 3.4-3.4' stroke='var(--accent)' strokeWidth='1.4' fill='none' />
          <text className='legend' x={38} y={563} fill='var(--accent)'>
            what we asked production to capture
          </text>
          <path d='M330 552 v9 m-3.4-5.6 3.4-3.4 3.4 3.4' stroke='var(--signal)' strokeWidth='1.4' fill='none' />
          <text className='legend' x={340} y={563} fill='var(--signal-ink)'>
            what it sent back
          </text>
        </In>

        <Dive $t={6.1}>
          <circle cx={XD} cy={20} r={3.6} fill='var(--accent)' />
        </Dive>
        <Surface $t={9.7}>
          <circle cx={XU} cy={500} r={3.6} fill='var(--signal)' />
        </Surface>
      </Desktop>

      {/* ---------------- mobile ---------------- */}
      <Mobile viewBox='0 0 350 570' role='img' aria-label='Four cuts into a running production system, ending in the arguments and return value of one function.'>
        <Card top={12} h={100} depth={0} l={36} r={346} />
        <Card top={136} h={126} depth={1} l={36} r={346} />
        <Card top={286} h={130} depth={2} l={36} r={346} />
        <Card top={440} h={112} depth={3} l={36} r={346} />

        <In $t={0}>
          <DownRail x1={12} y1={12} x2={12} y2={548} />
          <UpRail x1={26} y1={12} x2={26} y2={548} />
        </In>

        <In $t={0}>
          <text className='lbl' x={52} y={32}>
            400 SERVICES · 5 MINUTES
          </text>
        </In>
        <Wipe $t={0.2} $d={0.7}>
          {Array.from({ length: 23 }, (_, i) => (
            <rect key={i} x={52 + i * 12} y={40} width={3} height={12} rx={1} fill='var(--line-strong)' />
          ))}
        </Wipe>
        <Rung y={70} t={0.9} down='watch checkout · 5 min' up='' upAt={99} xd={12} xu={26} l={52} r={336} />
        <In $t={1.5}>
          <path d='M40 86 H26' stroke='var(--signal)' strokeWidth='1.5' />
          <path d='m26 82.5 -5 3.5 5 3.5z' fill='var(--signal)' />
          <text className='up' x={52} y={89}>
            p99 flat · 0 errors
          </text>
        </In>
        <In $t={10.6}>
          <path d='M52 85 H160' stroke='#b3b0a8' strokeWidth='1' />
          <text className='hot' x={52} y={105}>
            wrong for six days · 41,208 orders
          </text>
        </In>

        <Cone x1={150} x2={186} top={112} bottom={136} t={2.0} l={36} r={346} />

        <In $t={2.3}>
          <text className='lbl' x={52} y={156}>
            ONE ORDER · POST /orders
          </text>
        </In>
        <Rung y={174} t={2.5} down='open an order that paid full' up='' upAt={99} xd={12} xu={26} l={52} r={336} />
        {SPANS.map((s, i) => {
          const y = 194 + i * 14;
          const w = Math.max(3, (s.ms / 214) * 76);
          return (
            <Wipe key={s.name} $t={2.7 + i * 0.12} $d={0.4}>
              <text className={s.pick ? 'code' : 'dim'} x={52 + s.indent} y={y}>
                {s.name}
              </text>
              <rect x={218} y={y - 7} width={w} height={6} rx={2} fill={s.pick ? 'var(--accent)' : 'var(--line-strong)'} />
              <text className='dim' x={336} y={y} textAnchor='end'>
                {s.ms}ms
              </text>
            </Wipe>
          );
        })}
        <In $t={3.4}>
          <path d='M40 258 H26' stroke='var(--signal)' strokeWidth='1.5' />
          <path d='m26 254.5 -5 3.5 5 3.5z' fill='var(--signal)' />
          <text className='up' x={52} y={261}>
            promo.Apply · 4ms
          </text>
        </In>

        <Cone x1={218} x2={248} top={262} bottom={286} t={4.0} l={36} r={346} />

        <In $t={4.3}>
          <text className='lbl' x={52} y={306}>
            INSIDE promo.Apply · STRIPPED
          </text>
        </In>
        <Rung y={324} t={4.5} down='read the promo logic' up='' upAt={99} xd={12} xu={26} l={52} r={336} />
        <In $t={5.3}>
          <path d='M40 340 H26' stroke='#b3b0a8' strokeWidth='1.5' strokeDasharray='3 3' />
          <path d='m26 336.5 -5 3.5 5 3.5z' fill='none' stroke='#b3b0a8' strokeWidth='1.2' />
          <text className='dead' x={52} y={343} textDecoration='line-through'>
            no symbols in the binary
          </text>
        </In>
        <Rung y={364} t={6.1} down='recover layout · attach uprobe' up='' upAt={99} xd={12} xu={26} l={52} r={336} />
        {FRAMES.map((f, i) => {
          const y = 384 + i * 14;
          return (
            <g key={f.blind}>
              <Out $t={6.6 + i * 0.09}>
                <In $t={4.7 + i * 0.09}>
                  <text className='dead' x={52} y={y}>
                    {f.blind}
                  </text>
                </In>
              </Out>
              <In $t={6.7 + i * 0.09}>
                <text className='code' x={52} y={y}>
                  {f.real}
                </text>
              </In>
            </g>
          );
        })}

        <Cone x1={52} x2={96} top={416} bottom={440} t={7.4} l={36} r={346} />

        <Rung y={466} t={7.8} down='capture arguments and return' up='' upAt={99} xd={12} xu={26} l={52} r={336} />
        <In $t={8.2}>
          <text className='code' x={52} y={488}>
            Apply(code &quot;BLACK50&quot;, cart 49.00)
          </text>
        </In>
        <Pop $t={9.2}>
          <text className='big' x={52} y={528} style={{ fontSize: 28 }}>
            0.00
          </text>
          <text className='hot' x={122} y={528} textDecoration='line-through'>
            expected 24.50
          </text>
        </Pop>

        <Dive $t={6.1}>
          <circle cx={12} cy={18} r={3.2} fill='var(--accent)' />
        </Dive>
        <Surface $t={9.7}>
          <circle cx={26} cy={500} r={3.2} fill='var(--signal)' />
        </Surface>
      </Mobile>
    </Panel>
  </Frame>
);
