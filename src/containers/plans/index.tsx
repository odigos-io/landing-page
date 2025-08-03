'use client';

import React from 'react';
import { Heading } from './heading';
import { Text } from '@/components';
import { PLANS } from '@/constants';
import { FlexColumn } from '@/styles';
import { TableRow } from './table-row';
import styled, { css } from 'styled-components';
import { useMobile } from '@/contexts';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Title = styled(Text)<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '32px 16px' : '52px 64px')};
  font-size: ${({ $isMobile }) => ($isMobile ? '48px' : '86px')};
  font-weight: 600;
  line-height: 110%;
  letter-spacing: -1.72px;
`;

const ContainTables = styled(FlexColumn)<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '32px 16px' : '52px 64px')};
  gap: 32px;
`;

const Table = styled(FlexColumn)`
  gap: 12px;
`;

const SubTitle = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '32px')};
  font-weight: 700;
  line-height: 115%;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      text-align: center;
    `}
`;

export const Plans = () => {
  const { isMobile: isM, screenWidth } = useMobile();
  const isMobile = isM || screenWidth <= 1060; // this is to help remove some padding etc. before the actual mobile breakpoint for the inner elements

  return (
    <Container>
      <Title $isMobile={isMobile}>Explore Capabilities by Plan</Title>
      <ContainTables $isMobile={isMobile}>
        <Heading />
        <Table>
          {PLANS.base.map((item) => (
            <TableRow key={item.label} {...item} />
          ))}
        </Table>
        <SubTitle $isMobile={isMobile}>Low Overhead eBPF instrumentation</SubTitle>
        <Table>
          {PLANS.ebpf.map((item) => (
            <TableRow key={item.label} {...item} />
          ))}
        </Table>
        <SubTitle $isMobile={isMobile}>Database Extended Distributed Tracting</SubTitle>
        <Table>
          {PLANS.databases.map((item) => (
            <TableRow key={item.label} {...item} />
          ))}
        </Table>
      </ContainTables>
    </Container>
  );
};
