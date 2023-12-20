import { Text } from '@/design-system/text/text';
import React from 'react';
import styled from 'styled-components';

const TextHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  text-align: center;
`;

export function TextHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <TextHeaderContainer>
      <Text size={32} color={'rgba(255, 255, 255, 0.60)'} weight={700}>
        {title}
      </Text>
      <Text size={24}>{subtitle}</Text>
    </TextHeaderContainer>
  );
}
