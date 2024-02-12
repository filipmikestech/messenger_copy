import { create } from "zustand";
import { Message } from "../schema";

interface StoreState {
  lastMessage: Message | undefined;
  setLastMessage: (message: Message) => void;
}

export const useAppStore = create<StoreState>()((set) => ({
  lastMessage: undefined,
  setLastMessage: (message) => set({ lastMessage: message }),
}));
