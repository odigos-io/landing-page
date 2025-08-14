'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMobile } from '@/contexts';
import { FlexColumn, FlexRow } from '@/styles';
import styled, { css, useTheme } from 'styled-components';
import { Button, ContactUsButton, Text } from '@/components';
import { GITHUB_LINK, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MOBILE } from '@/constants';

const Container = styled(FlexRow)<{ $isMobile: boolean; $isSticky: boolean }>`
  position: sticky;
  top: ${({ $isMobile }) => ($isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP)}px;
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
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'unset')};
  margin-left: ${({ $isMobile }) => ($isMobile ? 'unset' : 'auto')};
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 16)}px;
`;

const ContainPlan = styled(FlexColumn)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? 'calc(100% - 24px)' : 'calc(350px - 48px)')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '24px')};
  gap: ${({ $isMobile }) => ($isMobile ? 8 : 18)}px;
  border-radius: ${({ $isMobile }) => ($isMobile ? 12 : 24)}px;
  background: ${({ theme }) => theme.colors.grey_darkest};
  box-shadow: 0px 2px 12.3px 0px rgba(0, 0, 0, 0.25);

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      & button {
        font-size: 12px;
      }
    `}
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

          if (!isSticky) setClientHeightBeforeSticky(container.clientHeight + (isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP));
          if (isSticky !== nowSticky) setIsSticky(nowSticky);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky, isMobile, clientHeightBeforeSticky]);

  return (
    <Container ref={containerRef} $isMobile={isMobile} $isSticky={isSticky}>
      {!isMobile && (
        <FlexRow $gap={12} $align='center'>
          <Image src='/assets/icons/swap.svg' alt='arrows' width={48} height={48} />
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
      <FlexRow $gap={isMobile ? 8 : 12} $align='center'>
        <Image src={isOss ? '/assets/github.svg' : '/assets/icons/enterprise.svg'} alt='' width={isMobile ? 16 : 36} height={isMobile ? 16 : 36} />
        <Text fontSize={isMobile ? 12 : 24} fontWeight={600} lineHeight='120%'>
          {isOss ? 'OPEN SOURCE' : 'ENTERPRISE'}
        </Text>
      </FlexRow>
      {!isSticky && !isMobile && <Text color={theme.colors.off_white}>{isOss ? 'Zero-code distributed tracing.' : 'Mission critical distributed tracing.'}</Text>}
      {isOss ? (
        <PlanButton variant='secondary' href={GITHUB_LINK}>
          GitHub
        </PlanButton>
      ) : (
        <ContactUsButton variant='primary' fullWidth />
      )}
    </ContainPlan>
  );
};
