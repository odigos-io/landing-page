'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';

export const ShareLinkedinButton = ({ url, ...props }: { url: string } & ButtonProps) => {
  const encodedUri = encodeURIComponent(url);

  return (
    <Button variant='secondary' leftIconSrc='/assets/linkedin.svg' iconSize={18} href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUri}`} {...props}>
      LinkedIn
    </Button>
  );
};
