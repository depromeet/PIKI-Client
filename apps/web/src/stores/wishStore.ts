import { create } from 'zustand';

type WishStore = {
  pendingUrl: string;
  setPendingUrl: (url: string) => void;
  clearPendingUrl: () => void;
};

export const useWishStore = create<WishStore>(set => ({
  pendingUrl: '',
  setPendingUrl: url => set({ pendingUrl: url }),
  clearPendingUrl: () => set({ pendingUrl: '' }),
}));
