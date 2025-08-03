'use client';

import React, { useState } from 'react';
import { DemoModal } from '@/containers';
import { Button, type ButtonProps } from '..';

export const WatchDemoButton = (props: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant='secondary' leftIconSrc='/assets/icons/play_media.svg' onClick={() => setIsModalOpen(true)} {...props}>
        Watch Demo
      </Button>
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
