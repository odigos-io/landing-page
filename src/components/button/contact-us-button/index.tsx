'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';
import { ModalType, useModalStore } from '@/store';

interface ContactUsButtonProps extends ButtonProps {
  label?: string;
}

export const ContactUsButton = ({ label = 'Contact Us', ...props }: ContactUsButtonProps) => {
  const { setModal } = useModalStore();

  return (
    <Button onClick={() => setModal(ModalType.CONTACT_US)} {...props}>
      {label}
    </Button>
  );
};
