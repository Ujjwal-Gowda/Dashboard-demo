import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WatchItem {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

interface WatchlistState {
  items: WatchItem[];
  addItem: (item: WatchItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "watchlist-storage",
    },
  ),
);
