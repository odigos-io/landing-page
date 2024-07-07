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
  padding: ${({ variant }) => (variant === 'primary' ? '0.1rem;' : '0')};
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
    background: ${({ disabled, theme }) =>
      disabled
        ? `linear-gradient(
    317deg,
    rgb(249, 249, 249) 4%,
    rgb(66, 69, 159) 80%,
    rgb(66, 69, 159) 100%,
    rgb(249, 249, 249) 100%,
    rgb(66, 69, 159)
  )`
        : theme.colors.white};
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
  /* opacity: ${({ disabled }) => (disabled ? 0.5 : 1)}; */
  /* border: ${({ disabled }) =>
    disabled ? '2px solid #f9f9f958' : 'none'}; */
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ variant, theme, color }) =>
      variant === 'primary'
        ? color
          ? color
          : theme.colors.primary
        : color
        ? color
        : 'linear-gradient(90deg, rgb(111 115 225) 1%, rgba(255, 255, 255, 1) 89%)'};
  }
`;

export const Button: React.FC<ButtonProps> = ({
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
