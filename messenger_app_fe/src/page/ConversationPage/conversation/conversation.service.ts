import { Conversation } from "../../../schema";
import { api } from "../../../utils/axiosIntance";

export const ConversationService = {
  async getConversation(conversationId: string) {
    const { data } = await api.get<Conversation>(`/conversation/${conversationId}`);
    return data;
  },
  async deleteConversation(conversationId: string) {
    const { data } = await api.delete(`/conversation/${conversationId}`);
    return data;
  },
};
