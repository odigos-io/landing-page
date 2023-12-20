import styled from 'styled-components';

interface ButtonProps {
  variant?: string;
  disabled?: boolean;
}

export const ButtonContainer = styled.div<ButtonProps>`
  :hover {
    background: ${({ disabled, variant }) =>
      disabled ? '#374A5B' : variant === 'primary' ? '#96F2FF' : 'transparent'};
  }
  p {
    cursor: ${({ disabled }) =>
      disabled ? 'not-allowed !important' : 'pointer !important'};
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  border-radius: 8px;
  border: none;
  width: 100%;
  height: 100%;
  border: 1px solid
    ${({ variant }) => (variant === 'primary' ? 'transparent' : '#0EE6F3')};
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed !important' : 'pointer !important'};
  background: ${({ disabled, variant }) =>
    disabled
      ? variant === 'primary'
        ? '#374A5B'
        : 'transparent'
      : variant === 'primary'
      ? '#0EE6F3'
      : 'transparent'};
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled, variant }) =>
    variant !== 'primary' && disabled ? 0.5 : 1};
`;
