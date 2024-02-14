import { create } from "zustand";
import { Message } from "../schema";

interface StoreState {
  lastMessage: Message | undefined;
  setLastMessage: (message: Message) => void;
  filteredConversation?: string;
  setFilteredConversation: (text: string) => void;
}

export const useAppStore = create<StoreState>()((set) => ({
  lastMessage: undefined,
  setLastMessage: (message) => set({ lastMessage: message }),
  filteredConversation: "",
  setFilteredConversation: (text) => set({ filteredConversation: text }),
}));
