'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { Subscribe } from './subscribe';
import { Navigation } from '../navigation';
import { Button, Text } from '@/components';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';
import { PRIVACY_POLICY_LINK, TRUST_CENTER_LINK } from '@/constants';

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${({ theme }) => theme.colors.black_light};
`;

const TopHalf = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column-reverse' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: 32px;
`;

const BottomHalf = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '24px')};
`;

const Description = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.off_white};
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  text-align: ${({ $isMobile }) => ($isMobile ? 'start' : 'center')};
  line-height: 150%;
`;

const ContainPolicies = styled(FlexRow)<{ $isMobile: boolean }>`
  gap: 24px;
  align-items: center;
`;

const PolicyLink = styled(Button)`
  color: ${({ theme }) => theme.colors.off_white};
  font-size: 16px;
  text-decoration: underline;
  padding: 0;
`;

const RightsReserved = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '18px')};
  text-align: center;
  line-height: 150%;
`;

const YEAR = new Date().getFullYear();
const COPYRIGHT_TEXT = `© ${YEAR} Odigos. All rights reserved.`;

const Footer = () => {
  const { isMobile } = useMobile();

  return (
    <Container $isMobile={isMobile}>
      <ConstrainedWrapper $isMobile={isMobile} $paddingTop={isMobile ? 32 : 64} $paddingBottom={24}>
        <FlexColumn $gap={32}>
          <TopHalf $isMobile={isMobile}>
            <FlexColumn $gap={12}>
              <Link href='/'>
                <Image src='/assets/odigos/logo_white.svg' alt='logo' width={45} height={45} />
              </Link>
              <Navigation flexDirection={isMobile ? 'column' : 'row'} gap={12} />
            </FlexColumn>
            <Subscribe />
          </TopHalf>

          <FlexColumn $gap={4}>
            <BottomHalf $isMobile={isMobile}>
              <Description $isMobile={isMobile}>Enterprise-Grade OpenTelemetry for Superior Application Performance Monitoring</Description>
              <ContainPolicies $isMobile={isMobile}>
                <PolicyLink variant='transparent' href={PRIVACY_POLICY_LINK}>
                  Privacy Policy
                </PolicyLink>
                <Text>|</Text>
                <PolicyLink variant='transparent' href={TRUST_CENTER_LINK}>
                  Trust Center
                </PolicyLink>
              </ContainPolicies>
            </BottomHalf>

            <RightsReserved $isMobile={isMobile}>{COPYRIGHT_TEXT}</RightsReserved>
          </FlexColumn>
        </FlexColumn>
      </ConstrainedWrapper>
    </Container>
  );
};

// as default, so we can use dynamic import in app/layout.tsx
export default Footer;
