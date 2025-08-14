'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';

export const ShareTwitterButton = ({ url, ...props }: { url: string } & ButtonProps) => {
  const encodedUri = encodeURIComponent(url);

  return (
    <Button variant='secondary' leftIconSrc='/assets/x.svg' iconSize={18} href={`https://twitter.com/intent/tweet?url=${encodedUri}`} {...props}>
      Twitter
    </Button>
  );
};
