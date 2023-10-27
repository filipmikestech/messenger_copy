import * as conversationsRepository from "../data-access/conversations-repository.js";

export const getAllConversations = async () => {
  return await conversationsRepository.getAllConversations();
};
