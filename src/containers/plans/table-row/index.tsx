'use client';

import React from 'react';
import Image from 'next/image';
import { FlexRow } from '@/styles';
import { PLANS } from '@/constants';
import { Text } from '@/components';
import { useMobile } from '@/contexts';
import styled, { useTheme } from 'styled-components';

const Row = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? 8 : 0)}px;
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '8px 32px')};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grey_darkest};
`;

const RowIndicators = styled(FlexRow)<{ $isMobile: boolean }>`
  gap: ${({ $isMobile }) => ($isMobile ? 0 : 16)}px;
`;

const WrapIndicator = styled(FlexRow)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? 'calc(50vw - 24px)' : '350px')};
  align-items: center;
  justify-content: center;
`;

const RowTag = styled(Text)<{ $isMobile: boolean; $isOss: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 24px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid ${({ $isOss, theme }) => ($isOss ? 'transparent' : theme.colors.purple_darker)};
  background: ${({ $isOss, theme }) => ($isOss ? theme.colors.grey_darker : theme.colors.purple_darkest)};
  color: ${({ theme }) => theme.colors.off_white};
  font-size: 14px;
  font-weight: 500;
  text-wrap: ${({ $isMobile }) => ($isMobile ? 'wrap' : 'nowrap')};
`;

const RowBoolean = ({ isMobile, value }: { isMobile: boolean; value: boolean }) => {
  return (
    <Image
      src={value ? '/assets/icons/check.gif' : '/assets/icons/cross.svg'}
      alt={value ? 'check' : 'cross'}
      width={isMobile ? 50 : 32}
      height={isMobile ? 50 : 32}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

export const TableRow = ({ label, oss, enterprise }: (typeof PLANS.base)[number]) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <Row $isMobile={isMobile}>
      <Text
        fontSize={isMobile ? 14 : 18}
        // fontWeight={500}
        lineHeight={isMobile ? '200%' : '140%'}
        color={theme.colors.off_white}
      >
        {label}
      </Text>

      <RowIndicators $isMobile={isMobile}>
        <WrapIndicator $isMobile={isMobile}>
          {typeof oss === 'boolean' ? (
            <RowBoolean value={oss} isMobile={isMobile} />
          ) : (
            <RowTag $isMobile={isMobile} $isOss={true}>
              {oss}
            </RowTag>
          )}
        </WrapIndicator>

        <WrapIndicator $isMobile={isMobile}>
          {typeof enterprise === 'boolean' ? (
            <RowBoolean value={enterprise} isMobile={isMobile} />
          ) : (
            <RowTag $isMobile={isMobile} $isOss={false}>
              {enterprise}
            </RowTag>
          )}
        </WrapIndicator>
      </RowIndicators>
    </Row>
  );
};
