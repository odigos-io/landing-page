'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import type { ComparisonPage, ComparisonPillar } from '@/constants';
import { COMPARISONS } from '@/constants';
import { Container, Eyebrow, Reveal } from './primitives';

/* Comparison pages in the landing design language. They were still the old dark
   site while "Comparisons" sits third in the light header, so the primary nav
   sent visitors from the paper page to a black one. */

const Section = styled.section<{ $alt?: boolean }>`
  background: ${(p) => (p.$alt ? 'var(--paper-3)' : 'var(--paper)')};
  border-bottom: 1px solid var(--line);
`;
const Inner = styled(Container)`
  padding-top: 84px;
  padding-bottom: 84px;
  @media (max-width: 1000px) {
    padding-top: 56px;
    padding-bottom: 56px;
  }
`;
const Head = styled.div`
  max-width: 760px;
  h1,
  h2 {
    margin: 16px 0 0;
    font-size: clamp(30px, 4vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.035em;
    font-weight: 600;
    color: var(--ink);
    .mute {
      color: var(--ink-faint);
    }
  }
  p {
    margin: 18px 0 0;
    font-size: 17.5px;
    line-height: 1.62;
    color: var(--ink-soft);
  }
`;
const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mute);
  text-decoration: none;
  &:hover {
    color: var(--ink);
  }
`;

/* ── the two columns ──────────────────────────────────────────────────────── */
const Cols = styled.div`
  margin-top: 44px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const Col = styled.div<{ $ours?: boolean }>`
  border: 1px solid ${(p) => (p.$ours ? 'rgba(91,67,241,.28)' : 'var(--line-strong)')};
  background: ${(p) => (p.$ours ? 'var(--paper-2)' : 'transparent')};
  border-radius: var(--r-lg);
  padding: 26px;
  box-shadow: ${(p) => (p.$ours ? 'var(--shadow-soft)' : 'none')};

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(p) => (p.$ours ? 'var(--accent)' : 'var(--ink-faint)')};
  }
  h3 {
    margin: 14px 0 0;
    font-size: 25px;
    line-height: 1.14;
    letter-spacing: -0.02em;
    font-weight: 600;
    color: var(--ink);
  }
  .lede {
    margin: 10px 0 0;
    font-size: 15.5px;
    line-height: 1.55;
    color: var(--ink-soft);
  }
  a.docs {
    display: inline-block;
    margin-top: 12px;
    font-size: 14px;
    color: var(--ink-mute);
    border-bottom: 1px solid var(--line-strong);
    text-decoration: none;
    &:hover {
      color: var(--ink);
    }
  }
`;
const Points = styled.ul`
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 16px;
  li {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 12px;
    align-items: start;
  }
  .ic {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    background: var(--paper);
    display: grid;
    place-items: center;
  }
  /* the icon set is stroked white for the dark site */
  .ic img {
    filter: invert(1) brightness(0.35);
  }
  strong {
    display: block;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  span {
    display: block;
    margin-top: 3px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink-mute);
  }
`;

/* ── the matrix ───────────────────────────────────────────────────────────── */
const Table = styled.div`
  margin-top: 30px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--paper-2);
`;
const Row = styled.div<{ $head?: boolean }>`
  display: grid;
  grid-template-columns: 1.6fr 0.7fr 0.7fr;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  &:last-child {
    border-bottom: 0;
  }
  background: ${(p) => (p.$head ? 'var(--paper-3)' : 'transparent')};

  .feature {
    font-size: 15px;
    line-height: 1.45;
    color: ${(p) => (p.$head ? 'var(--ink-faint)' : 'var(--ink)')};
    ${(p) =>
      p.$head &&
      `font-family: var(--font-mono), ui-monospace, monospace;
       font-size: 11px; letter-spacing: .1em; text-transform: uppercase;`}
  }
  .cell {
    text-align: center;
    font-size: 13.5px;
    line-height: 1.4;
    color: var(--ink-mute);
    ${(p) =>
      p.$head &&
      `font-family: var(--font-mono), ui-monospace, monospace;
       font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink);`}
  }
  .yes {
    color: var(--signal-ink);
    font-weight: 600;
  }
  .no {
    color: var(--ink-faint);
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr 64px 64px;
    padding: 12px 14px;
    gap: 8px;
    .feature {
      font-size: 14px;
    }
    .cell {
      font-size: 12px;
    }
  }
`;

const Cell = ({ v }: { v: boolean | string }) => {
  if (v === true) return <span className='cell yes'>yes</span>;
  if (v === false) return <span className='cell no'>no</span>;
  return <span className='cell'>{v}</span>;
};

const Pillar = ({ p, ours }: { p: ComparisonPillar; ours?: boolean }) => (
  <Col $ours={ours}>
    <span className='tag'>{ours ? 'Odigos' : 'The alternative'}</span>
    <h3>{p.tagline}</h3>
    <p className='lede'>{p.description}</p>
    {p.docsUrl && (
      <a className='docs' href={p.docsUrl} target='_blank' rel='noreferrer'>
        {p.docsLabel || 'Docs'}
      </a>
    )}
    <Points>
      {p.points.map((pt) => (
        <li key={pt.title}>
          <span className='ic'>
            <Image src={pt.icon} alt='' width={14} height={14} />
          </span>
          <div>
            <strong>{pt.title}</strong>
            <span>{pt.body}</span>
          </div>
        </li>
      ))}
    </Points>
  </Col>
);

export const LandingComparison = ({ comparison }: { comparison: ComparisonPage }) => (
  <>
    <Section>
      <Inner>
        <Reveal>
          <Head>
            <Back href='/comparisons'>← all comparisons</Back>
            <div style={{ marginTop: 18 }}>
              <Eyebrow>Comparison</Eyebrow>
            </div>
            <h1>{comparison.title}</h1>
            <p>{comparison.subtitle}</p>
          </Head>
        </Reveal>
        <Reveal delay={70}>
          <Cols>
            <Pillar p={comparison.odigos} ours />
            <Pillar p={comparison.competitor} />
          </Cols>
        </Reveal>
      </Inner>
    </Section>

    <Section $alt>
      <Inner>
        <Reveal>
          <Head>
            <Eyebrow>Side by side</Eyebrow>
            <h2>{comparison.matrixIntro}</h2>
          </Head>
        </Reveal>
        <Reveal delay={60}>
          <Table>
            <Row $head>
              <span className='feature'>Capability</span>
              <span className='cell'>Odigos</span>
              <span className='cell'>{comparison.competitorShort}</span>
            </Row>
            {comparison.matrix.map((r) => (
              <Row key={r.feature}>
                <span className='feature'>{r.feature}</span>
                <Cell v={r.odigos} />
                <Cell v={r.competitor} />
              </Row>
            ))}
          </Table>
        </Reveal>
      </Inner>
    </Section>
  </>
);

/* ── the hub ──────────────────────────────────────────────────────────────── */
const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;
const Card = styled(Link)`
  display: block;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  padding: 26px;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lift);
  }
  h3 {
    margin: 12px 0 0;
    font-size: 24px;
    letter-spacing: -0.022em;
    font-weight: 600;
    color: var(--ink);
  }
  p {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-mute);
  }
  .go {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 16px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
  }
`;

export const LandingComparisonsHub = () => (
  <Section>
    <Inner>
      <Reveal>
        <Head>
          <Eyebrow>Comparisons</Eyebrow>
          <h1>
            How Odigos differs, <span className='mute'>in detail.</span>
          </h1>
          <p>Straight capability comparisons against the tools teams evaluate us next to. No selective benchmarks, no asterisks.</p>
        </Head>
      </Reveal>
      <Reveal delay={70}>
        <Grid>
          {COMPARISONS.map((c) => (
            <Card key={c.slug} href={c.href}>
              <Eyebrow>{c.competitorShort}</Eyebrow>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
              <span className='go'>Read the comparison →</span>
            </Card>
          ))}
        </Grid>
      </Reveal>
    </Inner>
  </Section>
);
