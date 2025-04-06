import { create } from 'zustand';

interface titleStore {
  title: string;
  setTitle: (title: string) => void;
}

export const useTitleStore = create<titleStore>((set, get) => ({
  title: '',
  setTitle: (title) => {
    set({ title });
  },
}));
