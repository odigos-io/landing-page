'use client';
import React from 'react';
import { CardContainer, CardHeader } from './card.styled';
import { Text } from '../text/text';

interface CardProps {
  children?: JSX.Element | JSX.Element[];
  focus?: any;
  type?: string;
  header?: {
    title?: string;
    subtitle?: string;
    body?: () => JSX.Element | JSX.Element[];
  };
}

export function Card({
  children,
  focus = false,
  type = 'primary',
  header,
}: CardProps) {
  function renderHeader() {
    if (header?.body) {
      return header?.body();
    }
    return (
      <>
        <Text size={20} weight={600}>
          {header?.title}
        </Text>
        <Text size={14} color={'#CCD0D2'}>
          {header?.subtitle}
        </Text>
      </>
    );
  }

  return (
    <CardContainer selected={focus || undefined} type={type}>
      {header && <CardHeader>{renderHeader()}</CardHeader>}
      {children}
    </CardContainer>
  );
}
