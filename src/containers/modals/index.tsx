'use client';

import React from 'react';
import { ModalType, useModalStore } from '@/store';
import { ContactUsModal } from './contact-us-modal';
import { DemoModal } from './demo-modal';

const Modals = () => {
  const { modal, setModal } = useModalStore();

  return (
    <>
      <DemoModal isOpen={modal === ModalType.DEMO} onClose={() => setModal(null)} />
      <ContactUsModal isOpen={modal === ModalType.CONTACT_US} onClose={() => setModal(null)} />
    </>
  );
};

export default Modals;
