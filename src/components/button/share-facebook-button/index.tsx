'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';

export const ShareFacebookButton = ({ url, ...props }: { url: string } & ButtonProps) => {
  const encodedUri = encodeURIComponent(url);

  return (
    <Button variant='secondary' leftIconSrc='/assets/facebook.svg' iconSize={18} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUri}`} {...props}>
      Facebook
    </Button>
  );
};
