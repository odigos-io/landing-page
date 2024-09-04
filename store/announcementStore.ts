import create from 'zustand';

interface AnnouncementState {
  isOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
}

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  isOpen: false,
  openBanner: () => set({ isOpen: true }),
  closeBanner: () => set({ isOpen: false }),
}));
