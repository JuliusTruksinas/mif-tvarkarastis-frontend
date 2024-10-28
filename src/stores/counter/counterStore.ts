import { create } from 'zustand';

export interface CounterStore {
  count: number;
  increase: (amount: number) => void;
  decrease: (amount: number) => void;
  clear: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increase: (amount: number) =>
    set((state) => ({ count: state.count + amount })),
  decrease: (amount: number) =>
    set((state) => ({ count: state.count - amount })),
  clear: () => set({ count: 0 }),
}));
