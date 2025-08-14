'use client';

import React, { type CSSProperties, type InputHTMLAttributes } from 'react';
import { Text } from '../text';
import { FlexColumn, FlexRow } from '@/styles';
import { useMobile } from '@/contexts';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  hasError?: boolean;
  stretch?: boolean;
  minHeight?: CSSProperties['minHeight'];
}

const StyledTextArea = styled.textarea<{
  $error: boolean;
  $isMobile: boolean;
  $stretch?: boolean;
  $minHeight: CSSProperties['minHeight'];
}>`
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
  width: calc(
    ${({ $isMobile, $stretch }) => ($isMobile || $stretch ? '100%' : '330px')} - 32px
  );
  border-radius: 12px;
  border: 1px solid ${({ $error, theme }) => ($error ? theme.colors.pink : theme.colors.grey_darker)};
  background: transparent;
  color: ${({ theme }) => theme.colors.off_white};
  padding: 12px 16px;
  font-size: 14px;
  line-height: 140%;
  outline: none;

  &:focus,
  &:hover {
    border-color: ${({ $error, theme }) => ($error ? theme.colors.pink : theme.colors.off_white)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ContainLabel = styled(FlexRow)`
  align-items: center;
  gap: 4px;
  padding: 0 4px;
`;

const Label = styled(Text)`
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
`;

const Required = styled.span`
  font-size: 14px;
  font-weight: 300;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.pink};
  &::after {
    content: '*';
  }
`;

const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.pink};
  font-size: 14px;
  padding: 0 4px;
`;

export const TextArea = ({ label, errorMessage, hasError, stretch, minHeight, required, ...props }: InputProps) => {
  const { isMobile } = useMobile();

  return (
    <FlexColumn $gap={4}>
      <ContainLabel>
        {label && <Label>{label}</Label>}
        {label && required && ' '}
        {required && <Required />}
      </ContainLabel>

      <StyledTextArea $error={hasError || !!errorMessage} $isMobile={isMobile} $stretch={stretch} $minHeight={minHeight} required={required} {...props} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FlexColumn>
  );
};
