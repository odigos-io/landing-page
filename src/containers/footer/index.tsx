'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
// import { Subscribe } from './subscribe';
import { Navigation } from '../navigation';
import { Button, Text } from '@/components';
import { ConstrainedWrapper, FlexColumn } from '@/styles';
import { PRIVACY_POLICY_LINK, SOC_LINK, TRUST_CENTER_LINK } from '@/constants';

const Container = styled.div<{ $isMobile: boolean }>`
  background-color: ${({ theme }) => theme.colors.black_light};
`;

const TopHalf = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column-reverse' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: 32px;
  position: relative;
`;

const BottomHalf = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '24px')};
`;

const Description = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.off_white};
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  text-align: ${({ $isMobile }) => ($isMobile ? 'start' : 'center')};
  line-height: 150%;
`;

const ContainPolicies = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'auto')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

const PaddToMatchNav = styled.div<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '0 16px' : '0 24px')};
`;

const Soc2Badge = styled(Link)<{ $isMobile: boolean }>`
  position: absolute;
  top: 0;
  right: ${({ $isMobile }) => ($isMobile ? '16px' : '24px')};
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
              <PaddToMatchNav $isMobile={isMobile}>
                <Link href='/'>
                  <Image src='/assets/odigos/logo_white.svg' alt='logo' width={48} height={48} />
                </Link>
              </PaddToMatchNav>
              <Navigation flexDirection={isMobile ? 'column' : 'row'} />
            </FlexColumn>

            {/* <Subscribe /> */}

            <Soc2Badge href={SOC_LINK} target='_blank' $isMobile={isMobile}>
              <Image src='/assets/SOC_NonCPA.png' alt='SOC 2' width={96} height={96} />
            </Soc2Badge>
          </TopHalf>

          <PaddToMatchNav $isMobile={isMobile}>
            <FlexColumn $gap={isMobile ? 12 : 4}>
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
          </PaddToMatchNav>
        </FlexColumn>
      </ConstrainedWrapper>
    </Container>
  );
};

// as default, so we can use dynamic import in app/layout.tsx
export default Footer;
