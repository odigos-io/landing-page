'use client';
import theme from '@/style/theme';
import React from 'react';
import styled from 'styled-components';
import { ColumnContainer } from '@/style';

type ParagraphComponentProps = {
  title: string;
  paragraphs: string[];
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  paragraphStyle?: React.CSSProperties;
};

const Title = styled.span`
  color: ${theme.text.primary};
  font-size: 40px;
  font-weight: 500;
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
  titleStyle = {},
  paragraphStyle = {},
}) => {
  const wordsToBold = ['20x faster', 'less then 1% performance impact'];

  return (
    <ColumnContainer
      gap={24}
      style={{ background: theme.colors.primary, ...style }}
    >
      <Title style={{ ...titleStyle }}>{title}</Title>
      <ColumnContainer gap={15}>
        {paragraphs.map((text, index) => (
          <Paragraph style={{ ...paragraphStyle }} key={index}>
            {/* {text} */}
            <span
              dangerouslySetInnerHTML={{
                __html: boldWordsInText(text, wordsToBold),
              }}
            />
          </Paragraph>
        ))}
      </ColumnContainer>
    </ColumnContainer>
  );
};

// Function to make specified words bold in a text
const boldWordsInText = (text: string, wordsToBold: string[]): string => {
  const regex = new RegExp(`\\b(${wordsToBold.join('|')})\\b`, 'gi');
  return text.replace(regex, '<b><u>$1</u></b>');
};
