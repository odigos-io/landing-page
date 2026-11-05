'use client';

import { LandingTrialModal } from '@/containers/landing/trial-modal';
import { ModalType, useModalStore } from '@/store';

export const NewTrialModal = () => {
  const modal = useModalStore((s) => s.modal);
  const setModal = useModalStore((s) => s.setModal);

  return <LandingTrialModal isOpen={modal === ModalType.TRIAL} onClose={() => setModal(null)} />;
};
