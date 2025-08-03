'use client';

import React from 'react';
import Image from 'next/image';
import { Text } from '@/components';
import { FlexColumn } from '@/styles';
import { useMobile } from '@/contexts';
import { PRINCIPLES } from '@/constants';
import styled, { useTheme } from 'styled-components';

const Container = styled(FlexColumn)`
  align-self: stretch;
  justify-content: flex-start;
  gap: 16px;
  padding: 40px;
  max-width: 260px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
`;

export const PrincipleCard = ({ title, description, icon }: (typeof PRINCIPLES)[number]) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <Container>
      <Image src={icon} alt={title} width={64} height={64} />
      <Text fontSize={isMobile ? 20 : 28} fontWeight={500}>
        {title}
      </Text>
      <Text fontSize={16} color={theme.colors.grey}>
        {description}
      </Text>
    </Container>
  );
};
