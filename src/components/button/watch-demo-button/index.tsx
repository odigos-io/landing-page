'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';
import { ModalType, useModalStore } from '@/store';

export const WatchDemoButton = (props: ButtonProps) => {
  const { setModal } = useModalStore();

  return (
    <Button variant='secondary' leftIconSrc='/assets/icons/play_media.svg' onClick={() => setModal(ModalType.DEMO)} {...props}>
      Watch Demo
    </Button>
  );
};
