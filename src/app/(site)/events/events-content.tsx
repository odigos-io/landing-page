'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useEvents } from '@/contexts';
import { formatEventDateRange, getPlaceholderImage, isValidImageSrc } from '@/functions';
import { LandingHeader, LandingFooter } from '@/containers/landing';
import { Container, Eyebrow, Reveal, TrialCTA, DemoCTA } from '@/containers/landing/primitives';

/* ----------------------------------------------------------------
   Page header
----------------------------------------------------------------- */
const HeaderSection = styled.section`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;

const HeaderInner = styled(Container)`
  padding-top: 108px;
  padding-bottom: 72px;
  @media (max-width: 1000px) {
    padding-top: 80px;
    padding-bottom: 56px;
  }
`;

const Head = styled.div`
  max-width: 680px;
  h1 {
    margin: 18px 0 0;
    font-size: clamp(28px, 4.4vw, 50px);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: var(--ink);
  }
  p {
    margin: 18px 0 0;
    font-size: 18px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

/* ----------------------------------------------------------------
   Events grid
----------------------------------------------------------------- */
const GridSection = styled.section`
  background: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;

const GridInner = styled(Container)`
  padding-top: 72px;
  padding-bottom: 96px;
  @media (max-width: 1000px) {
    padding-top: 56px;
    padding-bottom: 64px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  text-decoration: none;
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lift);
    border-color: var(--line-strong);
  }
`;

const Cover = styled.div<{ $src: string }>`
  aspect-ratio: 16 / 9;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  background-color: var(--paper-3);
  border-bottom: 1px solid var(--line);
`;

const CardBody = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
`;

const DateChip = styled.span`
  align-self: flex-start;
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: var(--ink-mute);
  padding: 6px 11px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: var(--paper-2);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 19px;
  line-height: 1.28;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

const MetaList = styled.dl`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  dt {
    margin: 0;
    font-family: var(--font-mono), monospace;
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  dd {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--ink-mute);
  }
`;

const ReadMore = styled.span`
  margin-top: auto;
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  svg {
    transition: transform 0.2s ease;
  }
  ${CardLink}:hover & svg {
    transform: translateX(3px);
  }
`;

const Empty = styled.div`
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  padding: 48px 40px;
  text-align: center;
  p {
    margin: 0;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--ink-mute);
  }
`;

/* ----------------------------------------------------------------
   Closing CTA (dark panel)
----------------------------------------------------------------- */
const CtaSection = styled.section`
  background: var(--paper);
  padding: 28px 0 0;
`;

const CtaCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: radial-gradient(120% 140% at 15% 0%, #1a1a20, var(--panel) 55%);
  border: 1px solid var(--panel-line);
  box-shadow: var(--shadow-panel);
  padding: 76px 56px;
  text-align: center;
  @media (max-width: 700px) {
    padding: 52px 24px;
    border-radius: 20px;
  }
`;

const Mesh = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
  mask-image: radial-gradient(70% 90% at 50% 0%, #000, transparent 75%);
`;

const Glow = styled.div`
  position: absolute;
  top: -120px;
  left: 50%;
  width: 700px;
  height: 460px;
  transform: translateX(-50%);
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(91, 67, 241, 0.34), transparent 70%);
`;

const CtaTitle = styled.h2`
  position: relative;
  margin: 22px auto 0;
  max-width: 18ch;
  font-size: clamp(28px, 4.4vw, 50px);
  line-height: 1.06;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: #fff;
`;

const CtaText = styled.p`
  position: relative;
  margin: 18px auto 0;
  max-width: 46ch;
  font-size: 16.5px;
  line-height: 1.6;
  color: var(--panel-mute);
`;

const Ctas = styled.div`
  position: relative;
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const Arrow = () => (
  <svg width='15' height='15' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
    <path d='M3 8h9M8.5 3.5 13 8l-4.5 4.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export const EventsContent = () => {
  const { events } = useEvents();

  return (
    <div className='landing-root'>
      <LandingHeader />
      <main>
        <HeaderSection>
          <HeaderInner>
            <Reveal>
              <Head>
                <Eyebrow>Events</Eyebrow>
                <h1>Discover our latest events.</h1>
                <p>Meet the Odigos team in person. Catch our talks, stop by the booth, and see eBPF-powered observability up close at conferences around the world.</p>
              </Head>
            </Reveal>
          </HeaderInner>
        </HeaderSection>

        <GridSection>
          <GridInner>
            {events.length > 0 ? (
              <Grid>
                {events.map((event, i) => {
                  const cover = !event.image || !isValidImageSrc(event.image) ? getPlaceholderImage() : event.image;
                  const dateRange = formatEventDateRange(event.eventStartDate, event.eventEndDate);
                  return (
                    <Reveal key={event.slug} delay={i * 60}>
                      <CardLink href={`/events/${event.slug}`}>
                        <Cover $src={cover} />
                        <CardBody>
                          {dateRange ? <DateChip>{dateRange}</DateChip> : null}
                          <CardTitle>{event.title}</CardTitle>
                          {event.location || event.booth ? (
                            <MetaList>
                              {event.location ? (
                                <MetaRow>
                                  <dt>Location</dt>
                                  <dd>{event.location}</dd>
                                </MetaRow>
                              ) : null}
                              {event.booth ? (
                                <MetaRow>
                                  <dt>Booth</dt>
                                  <dd>{event.booth}</dd>
                                </MetaRow>
                              ) : null}
                            </MetaList>
                          ) : null}
                          <ReadMore>
                            View event
                            <Arrow />
                          </ReadMore>
                        </CardBody>
                      </CardLink>
                    </Reveal>
                  );
                })}
              </Grid>
            ) : (
              <Reveal>
                <Empty>
                  <p>No events on the calendar right now. Check back soon, or get a demo to see Odigos without leaving your desk.</p>
                </Empty>
              </Reveal>
            )}
          </GridInner>
        </GridSection>

        <CtaSection>
          <Container>
            <Reveal>
              <CtaCard>
                <Mesh />
                <Glow />
                <Eyebrow $light>Can&apos;t make it in person</Eyebrow>
                <CtaTitle>See Odigos in action without the travel.</CtaTitle>
                <CtaText>Start a 14-day trial and instrument your stack in minutes, or book a guided demo with our team.</CtaText>
                <Ctas>
                  <TrialCTA />
                  <DemoCTA />
                </Ctas>
              </CtaCard>
            </Reveal>
          </Container>
        </CtaSection>
      </main>
      <LandingFooter />
    </div>
  );
};
