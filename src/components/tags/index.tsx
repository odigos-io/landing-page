'use client';

import React, { Fragment } from 'react';
import { Text } from '../text';
import styled from 'styled-components';
import { FlexRow, hexOpacity } from '@/styles';

interface TagsProps {
  id?: string;
  tags?: string[];
  indexesOfBoldTags?: number[];
  doNotPushToBottom?: boolean;
  fontSize?: number;
}

const WrapTags = styled(FlexRow)<{ $doNotPushToBottom?: boolean }>`
  flex-wrap: wrap;
  gap: 8px;
  margin-top: ${({ $doNotPushToBottom }) => ($doNotPushToBottom ? 'unset' : 'auto')};
`;

const Tag = styled(Text)<{ $fontSize: number; $isBold?: boolean }>`
  font-size: ${({ $fontSize }) => $fontSize}px;
  line-height: 120%;
  color: ${({ $isBold, theme }) => ($isBold ? theme.colors.off_white : theme.colors.grey + hexOpacity['075'])};
  font-weight: ${({ $isBold }) => ($isBold ? 600 : 400)};
  text-transform: uppercase;
`;

export const Tags = ({ id, tags, indexesOfBoldTags, doNotPushToBottom = false, fontSize = 14 }: TagsProps) => {
  if (!tags?.length) return null;

  return (
    <WrapTags $doNotPushToBottom={doNotPushToBottom}>
      {tags.map((str, i) => (
        <Fragment key={`${id}-tag-${str}`}>
          <Tag $fontSize={fontSize} $isBold={indexesOfBoldTags?.includes(i)}>
            {str}
          </Tag>
          {i !== tags.length - 1 && <Tag $fontSize={fontSize}>|</Tag>}
        </Fragment>
      ))}
    </WrapTags>
  );
};
