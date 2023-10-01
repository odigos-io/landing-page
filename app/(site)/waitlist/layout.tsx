'use client';
import Background from '@/public/background.svg';
import Image from 'next/image';
import { CSSProperties } from 'react';
import styled from 'styled-components';

const STYLE: CSSProperties = {
  backgroundColor: '#07111A',
};

const WaitListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: sticky;
`;

export default function WaitListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={STYLE} suppressHydrationWarning={true}>
        <WaitListContainer>
          <Image src={Background} className="svg-background" fill alt={''} />
          {children}
        </WaitListContainer>
      </body>
    </html>
  );
}
