'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { GITHUB_LINK } from '@/constants';
import { FlexColumn, FlexRow } from '@/styles';
import styled, { css } from 'styled-components';
import { Button, ContactUsButton, Render3D, Text } from '@/components';

const Relative = styled.div<{ $isMobile: boolean }>`
  position: relative;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    `}
`;

const Absolute = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  top: ${({ $isMobile }) => ($isMobile ? '0' : '-15%')};
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ContainText = styled(FlexColumn)<{ $isMobile: boolean }>`
  max-width: ${({ $isMobile }) => ($isMobile ? '400px' : '500px')};
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 24)}px;
`;

const Title = styled(Text)<{ $isMobile: boolean }>`
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '32px' : '58px')};
  font-weight: 600;
  line-height: ${({ $isMobile }) => ($isMobile ? '140%' : '110%')};
`;

const SubTitle = styled(Text)<{ $isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
  line-height: 130%;
`;

const SCENE = 'https://prod.spline.design/eXz-TypCngvWmWW1/scene.splinecode';
const ASPECT_RATIO = 1440 / 600;

export const Hero3 = () => {
  const { isMobile, screenWidth } = useMobile();

  return (
    <Relative $isMobile={isMobile}>
      <Render3D scene={SCENE} width={screenWidth} height={screenWidth / ASPECT_RATIO} />

      <Absolute $isMobile={isMobile}>
        <FlexColumn $gap={isMobile ? 24 : 48} $align='center' $justify='center' $fullHeight>
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
