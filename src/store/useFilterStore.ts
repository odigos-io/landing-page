import { create } from 'zustand';

interface FilterStore {
  filterByTag: string;
  setFilterByTag: (str: string) => void;
}

export const ALL_TAG = 'EXPLORE ALL';

export const useFilterStore = create<FilterStore>((set) => ({
  filterByTag: ALL_TAG,
  setFilterByTag: (str) => set({ filterByTag: str }),
}));
