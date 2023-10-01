import React from 'react';
import styled from 'styled-components';
import { KeyvalText } from '../Text/text';

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
      <KeyvalText size={32} color={'rgba(255, 255, 255, 0.60)'} weight={700}>
        {title}
      </KeyvalText>
      <KeyvalText size={24}>{subtitle}</KeyvalText>
    </TextHeaderContainer>
  );
}
