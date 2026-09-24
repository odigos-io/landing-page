'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from './primitives';

interface Announcement {
  id: string;
  text: string;
  href: string;
  // Shown through the end of this day (local time), then hidden automatically.
  until: string;
}

// Listed in date order; the first one that hasn't ended is shown.
const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'observability-summit-europe-2026',
    text: 'Ari Recht keynotes Observability Summit Europe · Prague, Oct 5',
    href: '/events/observability-summit-europe-2026',
    until: '2026-10-05',
  },
  {
    id: 'observability-sre-summit-london-2026',
    text: 'Ari Recht speaks at the Observability & SRE Summit · London, Oct 21-22',
    href: '/events/observability-sre-summit-london-2026',
    until: '2026-10-22',
  },
];

const STORAGE_KEY = 'LANDING_ANNOUNCEMENT_CLOSED';

const Bar = styled.div`
  background: var(--ink);
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
`;

const Row = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  padding-right: 48px;
  @media (max-width: 640px) {
    justify-content: flex-start;
    font-size: 13px;
  }
`;

const Message = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 12px;
  min-width: 0;
  color: inherit;
  text-decoration: none;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--accent);
  }

  b {
    font-weight: inherit;
    min-width: 0;
  }

  span {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: rgba(255, 255, 255, 0.72);
  }
  &:hover span {
    color: #fff;
  }
`;

const Close = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const readClosed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const LandingAnnouncement = () => {
  // Chosen after mount: the page is statically cached, so picking by date on the
  // server would go stale and mismatch the client on hydration.
  const [current, setCurrent] = useState<Announcement | null>(null);

  useEffect(() => {
    const now = Date.now();
    const next = ANNOUNCEMENTS.find((a) => now <= new Date(`${a.until}T23:59:59`).getTime());
    if (next && readClosed() !== next.id) setCurrent(next);
  }, []);

  if (!current) return null;

  const onClose = () => {
    setCurrent(null);
    try {
      sessionStorage.setItem(STORAGE_KEY, current.id);
    } catch {
      // Storage blocked; the bar just comes back on the next visit.
    }
  };

  return (
    <Bar role='region' aria-label='Announcement'>
      <Row>
        <Message href={current.href}>
          <b>{current.text}</b>
          <span>See details →</span>
        </Message>
        <Close type='button' aria-label='Dismiss announcement' onClick={onClose}>
          ×
        </Close>
      </Row>
    </Bar>
  );
};
