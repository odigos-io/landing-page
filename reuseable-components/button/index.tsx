'use client';
import React, { ReactNode, ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  containerStyle?: React.CSSProperties;
  variant?: 'primary' | 'secondary';
}

const Wrapper = styled.div<{ variant: 'primary' | 'secondary' }>`
  border-radius: 48px;
  padding: ${({ variant }) => (variant === 'primary' ? '0.1rem;' : '0')};
  height: fit-content;
  width: fit-content;

  background: linear-gradient(
    317deg,
    rgb(249, 249, 249) 4%,
    rgb(66, 69, 159) 80%,
    rgb(66, 69, 159) 100%,
    rgb(249, 249, 249) 100%,
    rgb(66, 69, 159)
  );

  &:hover {
    background: linear-gradient(
      317deg,
      rgb(249, 249, 249) 4%,
      #ffb160 80%,
      #ffb160 100%,
      rgb(249, 249, 249) 100%,
      #ffb160
    );
  }
`;

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  border-radius: 48px;
  background: ${({ variant, theme }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  box-shadow: ${({ variant }) =>
    variant === 'primary' ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  display: flex;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  containerStyle = {},
  ...props
}) => {
  return (
    <Wrapper variant={variant} style={containerStyle}>
      <StyledButton variant={variant} onClick={onClick} type={type} {...props}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};
