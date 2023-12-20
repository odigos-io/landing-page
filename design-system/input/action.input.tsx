import React, { ChangeEvent } from 'react';
import { StyledActionInputContainer, StyledActionInput } from './input.styled';
import { Button } from '../button/button';
import { Text } from '../text/text';
import theme from '@/styles/palette';

interface InputProps {
  value: string;
  onAction: () => void;
  onChange: (value: string) => void;
  type?: string;
  style?: React.CSSProperties;
}

export function ActionInput({
  value,
  onChange,
  style = {},
  onAction,
}: InputProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <>
      <StyledActionInputContainer style={{ ...style }}>
        <StyledActionInput
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />

        <Button onClick={onAction}>
          <Text size={14} weight={500} color={theme.text.dark_button}>
            {'Save'}
          </Text>
        </Button>
      </StyledActionInputContainer>
    </>
  );
}
