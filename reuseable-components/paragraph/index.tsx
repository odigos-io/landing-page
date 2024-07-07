'use client';
import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';
import { ColumnContainer } from '@/style';

type ParagraphComponentProps = {
  title: string;
  paragraphs: string[];
  style?: React.CSSProperties;
};

const Title = styled.span`
  color: ${theme.text.primary};
  font-family: ${theme.font_family.primary};
  font-size: 40px;
  font-weight: 400;
  line-height: 120%;
  @media (max-width: 850px) {
    font-size: 24px;
  }
`;

const Paragraph = styled.p`
  font-size: 20px;
  line-height: 160%;
  font-weight: 300;
  margin-bottom: 10px;
  color: ${theme.text.off_white};
  letter-spacing: 0.4px;
  font-family: ${theme.font_family.primary};
  @media (max-width: 850px) {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.32px;
  }
`;

export const ParagraphComponent: React.FC<ParagraphComponentProps> = ({
  title,
  style = {},
  paragraphs,
}) => {
  return (
    <ColumnContainer
      gap={24}
      style={{ background: theme.colors.primary, ...style }}
    >
      <Title>{title}</Title>
      <ColumnContainer gap={15}>
        {paragraphs.map((text, index) => (
          <Paragraph key={index}>{text}</Paragraph>
        ))}
      </ColumnContainer>
    </ColumnContainer>
  );
};
