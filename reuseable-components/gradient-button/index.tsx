'use client';
import React, { ReactNode, ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  containerStyle?: React.CSSProperties;
  variant?: 'primary' | 'secondary';
}

const Wrapper = styled.div<{
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  border-radius: 48px;
  padding: ${({ variant }) => (variant === 'primary' ? '1.5px;' : '0')};
  height: fit-content;
  width: 100%;

  background: linear-gradient(
    317deg,
    rgb(249, 249, 249) 4%,
    rgb(66, 69, 159) 80%,
    rgb(66, 69, 159) 100%,
    rgb(249, 249, 249) 100%,
    rgb(66, 69, 159)
  );
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  &:hover {
    background: rgba(68, 74, 217, 0.12);
    padding: ${({ variant }) => (variant === 'primary' ? '0.5px;' : '0')};
  }
`;

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary';
  color?: string;
  disabled?: boolean;
}>`
  border-radius: 48px;
  background: ${({ variant, theme, color }) =>
    variant === 'primary'
      ? color
        ? color
        : theme.colors.primary
      : color
      ? color
      : theme.colors.white};
  box-shadow: ${({ variant }) =>
    variant === 'primary' ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  display: flex;
  width: 100%;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    border: 1.2px solid #f9f9f9;
    background: ${({ variant, theme }) =>
      variant === 'primary'
        ? 'rgba(68, 74, 217, 0.12)'
        : theme.colors.white} !important;
  }
`;

export const GradientButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  containerStyle = {},

  ...props
}) => {
  return (
    <Wrapper disabled={disabled} variant={variant} style={containerStyle}>
      <StyledButton
        disabled={disabled}
        variant={variant}
        onClick={onClick}
        type={type}
        {...props}
      >
        {children}
      </StyledButton>
    </Wrapper>
  );
};
