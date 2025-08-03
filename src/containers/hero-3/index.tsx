'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled from 'styled-components';
import { GITHUB_LINK } from '@/constants';
import { FlexColumn, FlexRow } from '@/styles';
import { Button, ContactUsButton, Render3D, Text } from '@/components';

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ContainText = styled.div<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? '400px' : '700px')};
`;

const Title = styled(Text)<{ $isMobile: boolean }>`
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '32px' : '88px')};
  font-weight: 600;
  line-height: ${({ $isMobile }) => ($isMobile ? '140%' : '110%')};
`;

const SubTitle = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '18px' : '30px')};
  line-height: 130%;
`;

const SCENE = 'https://prod.spline.design/IVsY-AXOlkJHHIh3/scene.splinecode';
const ASPECT_RATIO = 1440 / 800;

export const Hero3 = () => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <Relative>
      <Render3D scene={SCENE} width={screenWidth} height={screenWidth / ASPECT_RATIO} />

      <Absolute>
        <FlexColumn $gap={32} $align='center' $justify='center' $fullHeight>
          <ContainText $isMobile={isMobile}>
            <Title $isMobile={isMobile}>Unlock Deeper Observability</Title>
            <SubTitle $isMobile={isMobile}>Enterprise-Grade OpenTelemetry for Superior Application Performance Monitoring</SubTitle>
          </ContainText>

          <FlexRow $gap={32}>
            <ContactUsButton />
            <Button variant='secondary' leftIconSrc='/assets/github.svg' href={GITHUB_LINK}>
              GitHub
            </Button>
          </FlexRow>
        </FlexColumn>
      </Absolute>
    </Relative>
  );
};
