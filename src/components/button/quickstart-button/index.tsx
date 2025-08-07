'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';
import { QUICKSTART_LINK } from '@/constants';

export const QuickstartButton = (props: ButtonProps) => {
  return (
    <Button tag='Open Source' href={QUICKSTART_LINK} rightIconSrc='/assets/icons/arrow.svg' {...props}>
      Quick Start
    </Button>
  );
};
