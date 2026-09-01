'use client';

import React from 'react';
import Link from 'next/link';

/* Without this, a render failure anywhere under (site) takes the whole tree
   down to the framework's default screen. */
export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '80px 24px', background: '#fbfaf7' }}>
      <div style={{ maxWidth: 520, textAlign: 'center', fontFamily: 'var(--font-display), system-ui, sans-serif', color: '#121215' }}>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#716e66', margin: 0 }}>Something went wrong</p>
        <h1 style={{ fontSize: 34, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '16px 0 12px' }}>This page failed to load.</h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.55, color: '#3b3b42', margin: '0 0 26px' }}>The error has been logged. You can try again, or head back to the homepage.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ padding: '12px 20px', borderRadius: 999, border: 'none', background: '#121215', color: '#fff', fontSize: 15, cursor: 'pointer' }}>
            Try again
          </button>
          <Link href='/' style={{ padding: '12px 20px', borderRadius: 999, border: '1px solid #d8d4c9', color: '#121215', fontSize: 15, textDecoration: 'none' }}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
