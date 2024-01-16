import { Message } from "../../../../../schema";
import { api } from "../../../../../utils/axiosIntance";

export const MessengesService = {
  async getMessages(conversationId: string) {
    const { data } = await api.post<Message[]>("/messages", { conversationId: conversationId });
    return data;
  },
};
