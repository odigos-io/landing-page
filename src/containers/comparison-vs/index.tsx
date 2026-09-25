'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, ContactUsButton, Text, TextLayers, TrialButton } from '@/components';
import { ComparisonPage, GITHUB_LINK } from '@/constants';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexColumn, FlexRow } from '@/styles';
import styled, { css, useTheme } from 'styled-components';

const Page = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const HeroTitle = styled(Text)<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '20px 16px 12px' : '28px 64px 16px')};
  font-size: ${({ $isMobile }) => ($isMobile ? '40px' : '72px')};
  font-weight: 600;
  line-height: 110%;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.8px' : '-1.72px')};
`;

const HeroIntro = styled(Text)<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '0 16px 24px' : '0 64px 24px')};
  max-width: 900px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '22px')};
  line-height: 150%;
`;

const CtaRow = styled(FlexRow)<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '0 16px 32px' : '0 64px 48px')};
  flex-wrap: wrap;
`;

const SectionPad = styled.div<{ $isMobile: boolean; $compactBottom?: boolean }>`
  padding: ${({ $isMobile, $compactBottom }) =>
    $isMobile ? ($compactBottom ? '24px 16px 0' : '24px 16px') : $compactBottom ? '32px 64px 0' : '32px 64px'};
`;

const LogosRow = styled(FlexRow)<{ $isMobile: boolean }>`
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 16)}px;
  padding: ${({ $isMobile }) => ($isMobile ? '16px 16px 0' : '24px 64px 0')};
`;

const LogoFrame = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  padding: 10px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.grey_darkest};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
`;

const VsLabel = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const PillarGrid = styled.div<{ $isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isMobile }) => ($isMobile ? '1fr' : '1fr 1fr')};
  gap: ${({ $isMobile }) => ($isMobile ? 16 : 24)}px;
`;

const PillarCard = styled(FlexColumn)<{ $accent?: boolean }>`
  gap: 20px;
  padding: 28px;
  border-radius: 24px;
  background: ${({ theme, $accent }) => ($accent ? theme.colors.black_lighter : theme.colors.grey_darkest)};
  border: 1px solid ${({ theme, $accent }) => ($accent ? theme.colors.purple_darker : theme.colors.grey_darker)};
`;

const PillarHeader = styled(FlexRow)`
  align-items: center;
  gap: 12px;
`;

const PillarBadge = styled(Text)<{ $accent?: boolean }>`
  display: inline-flex;
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.off_white};
  background: ${({ theme, $accent }) => ($accent ? theme.colors.purple_darkest : theme.colors.grey_darker)};
  border: 1px solid ${({ theme, $accent }) => ($accent ? theme.colors.purple_darker : 'transparent')};
`;

const DocsLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.purple};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: underline;
  }
`;

const PointList = styled(FlexColumn)`
  gap: 14px;
`;

const Point = styled(FlexRow)`
  align-items: flex-start;
  gap: 12px;
`;

const PointIcon = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};

  /* SVGs ship at ~64% opacity — force solid white glyphs */
  img {
    filter: brightness(0) invert(1);
  }
`;

const PointCopy = styled(FlexColumn)`
  gap: 2px;
  min-width: 0;
`;

const LangSection = styled(FlexColumn)`
  gap: 10px;
`;

const LangGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const LangChip = styled(FlexRow)`
  align-items: center;
  gap: 5px;
  padding: 4px 8px 4px 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
`;

const LangIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  flex-shrink: 0;

  img {
    filter: brightness(0) invert(1);
  }
`;

const MatrixHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'stretch' : 'center')};
  justify-content: space-between;
  gap: 12px;
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '16px 32px')};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.black_lighter};
`;

const MatrixColumns = styled(FlexRow)<{ $isMobile: boolean }>`
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 16)}px;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
      justify-content: space-between;
    `}
`;

const MatrixColLabel = styled(FlexRow)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? 'calc(50% - 4px)' : '200px')};
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grey_darkest};
`;

const MatrixTable = styled(FlexColumn)`
  gap: 12px;
  margin-top: 12px;
`;

const MatrixRow = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? 8 : 0)}px;
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '8px 32px')};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grey_darkest};
`;

const MatrixIndicators = styled(FlexRow)<{ $isMobile: boolean }>`
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 16)}px;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
      justify-content: space-between;
    `}
`;

const MatrixCell = styled(FlexRow)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? 'calc(50% - 4px)' : '200px')};
  align-items: center;
  justify-content: center;
  min-height: 40px;
`;

const MatrixTag = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.grey_darker};
  color: ${({ theme }) => theme.colors.off_white};
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.off_white};
  }
`;

const CellValue = ({ value, isMobile }: { value: boolean | string; isMobile: boolean }) => {
  if (typeof value === 'boolean') {
    return (
      <Image
        src={value ? '/assets/icons/check.gif' : '/assets/icons/cross.svg'}
        alt={value ? 'Supported' : 'Not supported'}
        width={isMobile ? 40 : 32}
        height={isMobile ? 40 : 32}
      />
    );
  }

  return <MatrixTag>{value}</MatrixTag>;
};

const LanguageCoverage = ({
  languages,
  side,
}: {
  languages: ComparisonPage['libraryLanguages'];
  side: 'odigos' | 'competitor';
}) => {
  const visible = languages.filter((lang) => lang[side] !== false);
  if (!visible.length) return null;

  return (
    <LangSection>
      <Text fontSize={11} fontWeight={600} style={{ letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Library-level languages
      </Text>
      <LangGrid>
        {visible.map((lang) => (
          <LangChip key={lang.name}>
            <LangIconWrap>
              <Image src={lang.icon} alt={lang.name} width={12} height={12} />
            </LangIconWrap>
            <Text fontSize={11} fontWeight={600}>
              {lang.name}
            </Text>
          </LangChip>
        ))}
      </LangGrid>
    </LangSection>
  );
};

export const ComparisonVs = ({ comparison }: { comparison: ComparisonPage }) => {
  const theme = useTheme();
  const { isMobile: isM, screenWidth } = useMobile();
  const isMobile = isM || screenWidth <= 900;

  return (
    <Page>
      <SectionPad $isMobile={isMobile} $compactBottom>
        <BackLink href='/comparisons'>← All comparisons</BackLink>
      </SectionPad>

      <LogosRow $isMobile={isMobile}>
        {comparison.logos.map((logo, index) => (
          <React.Fragment key={logo.src}>
            {index > 0 && <VsLabel color={theme.colors.grey}>vs</VsLabel>}
            <LogoFrame $size={isMobile ? 56 : 72}>
              <Image src={logo.src} alt={logo.alt} width={isMobile ? 36 : 48} height={isMobile ? 36 : 48} />
            </LogoFrame>
          </React.Fragment>
        ))}
      </LogosRow>

      <HeroTitle $isMobile={isMobile}>{comparison.title}</HeroTitle>
      <HeroIntro $isMobile={isMobile}>{comparison.subtitle}</HeroIntro>
      <CtaRow $isMobile={isMobile} $gap={16} $align='center'>
        <TrialButton variant='primary' />
        <ContactUsButton variant='secondary' label='Talk to sales' />
        <Button variant='secondary' leftIconSrc='/assets/github.svg' href={GITHUB_LINK}>
          GitHub
        </Button>
      </CtaRow>

      <ConstrainedWrapper $isMobile={isMobile} $overrideMaxWidth={1312} $paddingTop={16} $paddingBottom={16}>
        <FlexColumn $gap={isMobile ? 24 : 32}>
          <TextLayers miniTitle='APPROACH' title='Fundamentally different instrumentation models' titleSettings={{ smallTitle: isMobile }} />
          <PillarGrid $isMobile={isMobile}>
            <PillarCard $accent>
              <PillarHeader>
                <LogoFrame $size={44}>
                  <Image src={comparison.logos[0].src} alt={comparison.logos[0].alt} width={28} height={28} />
                </LogoFrame>
                <PillarBadge $accent>{comparison.odigos.name}</PillarBadge>
              </PillarHeader>
              <Text fontSize={isMobile ? 22 : 28} fontWeight={600} lineHeight='120%'>
                {comparison.odigos.tagline}
              </Text>
              <Text fontSize={16} color={theme.colors.grey} lineHeight='150%'>
                {comparison.odigos.description}
              </Text>
              <LanguageCoverage languages={comparison.libraryLanguages} side='odigos' />
              <PointList>
                {comparison.odigos.points.map((point) => (
                  <Point key={point.title}>
                    <PointIcon>
                      <Image src={point.icon} alt='' width={28} height={28} />
                    </PointIcon>
                    <PointCopy>
                      <Text fontSize={15} fontWeight={600}>
                        {point.title}
                      </Text>
                      <Text fontSize={14} color={theme.colors.grey} lineHeight='140%'>
                        {point.body}
                      </Text>
                    </PointCopy>
                  </Point>
                ))}
              </PointList>
            </PillarCard>

            <PillarCard>
              <PillarHeader>
                <LogoFrame $size={44}>
                  <Image src={comparison.logos[1].src} alt={comparison.logos[1].alt} width={28} height={28} />
                </LogoFrame>
                <PillarBadge>{comparison.competitorShort}</PillarBadge>
              </PillarHeader>
              <Text fontSize={isMobile ? 22 : 28} fontWeight={600} lineHeight='120%'>
                {comparison.competitor.tagline}
              </Text>
              <Text fontSize={16} color={theme.colors.grey} lineHeight='150%'>
                {comparison.competitor.description}
              </Text>
              <LanguageCoverage languages={comparison.libraryLanguages} side='competitor' />
              <PointList>
                {comparison.competitor.points.map((point) => (
                  <Point key={point.title}>
                    <PointIcon>
                      <Image src={point.icon} alt='' width={28} height={28} />
                    </PointIcon>
                    <PointCopy>
                      <Text fontSize={15} fontWeight={600}>
                        {point.title}
                      </Text>
                      <Text fontSize={14} color={theme.colors.grey} lineHeight='140%'>
                        {point.body}
                      </Text>
                    </PointCopy>
                  </Point>
                ))}
              </PointList>
              {(comparison.competitor.docsUrl || comparison.competitor.secondaryDocsUrl) && (
                <FlexColumn $gap={6}>
                  {comparison.competitor.docsUrl && (
                    <DocsLink href={comparison.competitor.docsUrl} target='_blank' rel='noopener noreferrer'>
                      {comparison.competitor.docsLabel ?? 'Learn more'} →
                    </DocsLink>
                  )}
                  {comparison.competitor.secondaryDocsUrl && (
                    <DocsLink href={comparison.competitor.secondaryDocsUrl} target='_blank' rel='noopener noreferrer'>
                      {comparison.competitor.secondaryDocsLabel ?? 'Support matrix'} →
                    </DocsLink>
                  )}
                </FlexColumn>
              )}
            </PillarCard>
          </PillarGrid>
        </FlexColumn>
      </ConstrainedWrapper>

      <SectionPad $isMobile={isMobile}>
        <FlexColumn $gap={isMobile ? 16 : 24}>
          <TextLayers miniTitle='FEATURE MATRIX' title='Support comparison' descriptions={[comparison.matrixIntro]} titleSettings={{ smallTitle: isMobile }} />

          <MatrixHeader $isMobile={isMobile}>
            {!isMobile && (
              <Text fontSize={24} fontWeight={600}>
                Capability
              </Text>
            )}
            <MatrixColumns $isMobile={isMobile}>
              <MatrixColLabel $isMobile={isMobile}>
                <Text fontSize={isMobile ? 14 : 18} fontWeight={600}>
                  Odigos
                </Text>
              </MatrixColLabel>
              <MatrixColLabel $isMobile={isMobile}>
                <Text fontSize={isMobile ? 14 : 18} fontWeight={600}>
                  {comparison.competitorShort}
                </Text>
              </MatrixColLabel>
            </MatrixColumns>
          </MatrixHeader>

          <MatrixTable>
            {comparison.matrix.map((row) => (
              <MatrixRow key={row.feature} $isMobile={isMobile}>
                <Text
                  fontSize={isMobile ? 14 : 17}
                  lineHeight={isMobile ? '150%' : '140%'}
                  color={theme.colors.off_white}
                  style={{ flex: 1, paddingRight: isMobile ? 0 : 16 }}
                >
                  {row.feature}
                </Text>
                <MatrixIndicators $isMobile={isMobile}>
                  <MatrixCell $isMobile={isMobile}>
                    <CellValue value={row.odigos} isMobile={isMobile} />
                  </MatrixCell>
                  <MatrixCell $isMobile={isMobile}>
                    <CellValue value={row.competitor} isMobile={isMobile} />
                  </MatrixCell>
                </MatrixIndicators>
              </MatrixRow>
            ))}
          </MatrixTable>
        </FlexColumn>
      </SectionPad>
    </Page>
  );
};
