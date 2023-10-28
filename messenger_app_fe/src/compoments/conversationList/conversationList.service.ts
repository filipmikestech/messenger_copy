import { api } from "../../utils/axiosIntance";

export const ConversationListService = {
  async getConversationList() {
    const { data } = await api.get("/conversation");
    console.log("getConversationList", data);
    return data;
  },
};
