'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';
import { ModalType, useModalStore } from '@/store';

export const ContactUsButton = (props: ButtonProps) => {
  const { setModal } = useModalStore();

  return (
    <Button onClick={() => setModal(ModalType.CONTACT_US)} {...props}>
      Contact Us
    </Button>
  );
};
