import * as messagesRepository from "../data-access/messages-repository.js";

export const getAllMessagesByConversation = async (conversationId: string) => {
  return await messagesRepository.getAllMessagesInConversation(conversationId);
};
