'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMobile } from '@/contexts';
import { GITHUB_LINK } from '@/constants';
import { FlexColumn, FlexRow } from '@/styles';
import styled, { useTheme } from 'styled-components';
import { Button, ContactUsButton, Text } from '@/components';

const Container = styled(FlexRow)<{ $isMobile: boolean; $isSticky: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1;
  flex-wrap: wrap;
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 16)}px;
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '24px 32px')};
  background-color: ${({ theme }) => theme.colors.black_lighter};
  border-radius: ${({ $isSticky }) => ($isSticky ? '0 0 12px 12px' : '24px')};
  box-shadow: 0px 8px 13.3px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.35px);
`;

const ContainPlans = styled(FlexRow)<{ $isMobile: boolean }>`
  margin-left: ${({ $isMobile }) => ($isMobile ? 'unset' : 'auto')};
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 16)}px;
`;

const ContainPlan = styled(FlexColumn)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? 'calc(50vw - 84px)' : 'calc(350px - 48px)')};
  padding: 16px 24px;
  gap: 18px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.grey_darkest};
  box-shadow: 0px 2px 12.3px 0px rgba(0, 0, 0, 0.25);
`;

const PlanButton = styled(Button)`
  width: 100%;
`;

export const Heading = () => {
  const { isMobile } = useMobile();
  const [isSticky, setIsSticky] = useState(false);
  const [clientHeightBeforeSticky, setClientHeightBeforeSticky] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const container = containerRef.current;

        if (container) {
          const rect = container.getBoundingClientRect();
          const nowSticky = rect.bottom <= clientHeightBeforeSticky;

          if (!isSticky) setClientHeightBeforeSticky(container.clientHeight);
          if (isSticky !== nowSticky) setIsSticky(nowSticky);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky, clientHeightBeforeSticky]);

  return (
    <Container ref={containerRef} $isMobile={isMobile} $isSticky={isSticky}>
      {!isMobile && (
        <FlexRow $gap={12} $align='center'>
          <Image
            src='/assets/icons/swap.svg'
            alt='arrows'
            width={48}
            height={48}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <Text fontSize={42} fontWeight={600} lineHeight='130%'>
            Compare Plans
          </Text>
        </FlexRow>
      )}
      <ContainPlans $isMobile={isMobile}>
        <Plan isOss={true} isSticky={isSticky} />
        <Plan isOss={false} isSticky={isSticky} />
      </ContainPlans>
    </Container>
  );
};

const Plan = ({ isOss, isSticky }: { isOss: boolean; isSticky: boolean }) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <ContainPlan $isMobile={isMobile}>
      <FlexRow $gap={12} $align='center'>
        <Image
          src={isOss ? '/assets/github.svg' : '/assets/icons/enterprise.svg'}
          alt=''
          width={36}
          height={36}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Text fontSize={isMobile ? 16 : 24} fontWeight={600} lineHeight='120%'>
          {isOss ? 'OPEN SOURCE' : 'ENTERPRISE'}
        </Text>
      </FlexRow>
      {!isSticky && <Text color={theme.colors.off_white}>{isOss ? 'Zero-code distributed tracing.' : 'Mission critical distributed tracing.'}</Text>}
      {isOss ? (
        <PlanButton variant='secondary' href={GITHUB_LINK}>
          Go to GitHub
        </PlanButton>
      ) : (
        <ContactUsButton variant='primary' fullWidth />
      )}
    </ContainPlan>
  );
};
