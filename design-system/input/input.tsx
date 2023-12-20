import React, { ChangeEvent, useState } from 'react';
import {
  StyledInputContainer,
  StyledInput,
  ErrorWrapper,
  LabelWrapper,
} from './input.styled';
import { Text } from '../text/text';
interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

export function Input({
  label,
  value,
  onChange,
  error = '',
  style = {},
  placeholder,
}: InputProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div style={{ ...style }}>
      {label && (
        <LabelWrapper>
          <Text size={14} weight={600}>
            {label}
          </Text>
        </LabelWrapper>
      )}
      <StyledInputContainer
        active={!!value || undefined}
        error={error ? true : undefined}
      >
        <StyledInput
          type={'text'}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          placeholder={placeholder}
        />
      </StyledInputContainer>
      {error && (
        <ErrorWrapper>
          <Text size={14} color={'#FD3F3F'}>
            {error}
          </Text>
        </ErrorWrapper>
      )}
    </div>
  );
}
