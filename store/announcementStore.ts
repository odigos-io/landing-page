import create from 'zustand';

interface AnnouncementState {
  isOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
}

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  isOpen: true,
  openBanner: () => set({ isOpen: true }),
  closeBanner: () => set({ isOpen: false }),
}));
