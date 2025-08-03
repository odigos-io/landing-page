'use client';

import React, { useState } from 'react';
import { Button, type ButtonProps } from '..';
import { ContactUsModal } from '@/containers';

export const ContactUsButton = (props: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} {...props}>
        Contact Us
      </Button>
      <ContactUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
