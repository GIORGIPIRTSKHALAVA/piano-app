import { create } from 'zustand';

interface PianoStore {
  currentNote: string | null;
  setCurrentNote: (note: string) => void;
}

export const usePianoStore = create<PianoStore>((set) => ({
  currentNote: null,
  setCurrentNote: (note) => set({ currentNote: note }),
}));
