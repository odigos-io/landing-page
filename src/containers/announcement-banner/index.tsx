'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FlexRow } from '@/styles';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Button, Text } from '@/components';

interface AnnouncementBannerProps {
  title: string;
  link: string;
  linkText: string;
}

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  background-color: ${({ theme }) => theme.colors.cyan};
  border-radius: 0 0 24px 24px;
  padding: ${({ $isMobile }) => ($isMobile ? '12px 16px' : '16px 24px')};
  width: ${({ $isMobile }) => ($isMobile ? 'calc(100% - 32px)' : 'calc(100% - 48px)')};
`;

const Divider = styled.div`
  width: 1.5px;
  height: 20px;
  opacity: 0.4;
  background: ${({ theme }) => theme.colors.black};
`;

const Content = styled(FlexRow)<{ $isMobile: boolean }>`
  ${({ $isMobile }) => $isMobile && 'flex-direction: column;'}
`;

const Typography = styled(Text)<{ $small?: boolean }>`
  color: ${({ theme }) => theme.colors.black};
  ${({ $small }) => $small && 'font-size: 14px;'}
`;

const SESSION_STORAGE_KEY = 'ANNOUNCEMENT_BANNER_CLOSED';

const initState = () => {
  const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return stored === 'true' || false;
};

const AnnouncementBanner = ({ title, link, linkText }: AnnouncementBannerProps) => {
  const { isMobile } = useMobile();
  const [isClosed, setIsClosed] = useState(initState());

  const onClose = () => {
    setIsClosed(true);
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  };

  if (isClosed || !title) {
    return null;
  }

  return (
    <Container $isMobile={isMobile}>
      <div />
      <Content $gap={isMobile ? 8 : 24} $align='center' $isMobile={isMobile}>
        <FlexRow $gap={4} $align='center'>
          <Image
            src='/assets/icons/flame.svg'
            alt='flame'
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
            style={{
              filter: 'invert(100%)',
            }}
          />
          <Typography $small={isMobile}>{title}</Typography>
        </FlexRow>
        {!isMobile && <Divider />}
        <Button variant='transparent' padding='0' href={link}>
          <Typography $small={isMobile} textDecoration='underline'>{linkText}</Typography>
        </Button>
      </Content>
      <Button variant='transparent' padding='0' onClick={onClose}>
        <Image
          src='/assets/icons/close.svg'
          alt='close'
          width={24}
          height={24}
          style={{
            filter: 'invert(100%)',
          }}
        />
      </Button>
    </Container>
  );
};

// as default, so we can use dynamic import in app/layout.tsx
export default AnnouncementBanner;
