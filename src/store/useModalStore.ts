import { create } from 'zustand';

export enum ModalType {
  CONTACT_US = 'contact-us',
  DEMO = 'demo',
}

interface ModalStore {
  modal: ModalType | null;
  setModal: (str: ModalType | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  setModal: (str) => set({ modal: str }),
}));
