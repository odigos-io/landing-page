'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';
import { ModalType, useModalStore } from '@/store';

export const TrialButton = ({ label = 'Start 14-day trial', ...props }: ButtonProps) => {
  const setModal = useModalStore((s) => s.setModal);

  return <Button onClick={() => setModal(ModalType.TRIAL)} label={label} {...props} />;
};
