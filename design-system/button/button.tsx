import React, { FC } from 'react';
import { StyledButton, ButtonContainer } from './button.styled';

interface ButtonProps {
  // Additional custom props if needed
  variant?: string;
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
  style?: object;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  style,
  onClick,
  disabled,
  type = 'button',
}) => {
  return (
    <ButtonContainer variant={variant} disabled={disabled}>
      <StyledButton
        type={type}
        variant={variant}
        disabled={disabled}
        onClick={onClick}
        style={{ ...style }}
      >
        {children}
      </StyledButton>
    </ButtonContainer>
  );
};
