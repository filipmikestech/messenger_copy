import * as messagesRepository from "../data-access/messages-repository.js";
export const getAllMessagesByConversation = async (conversationId: string) => {
  return await messagesRepository.getAllMessagesInConversation(conversationId);
};

export const addMessageToConversation = async (text: string, userId: string, conversationId: string) => {
  console.log("addMessageToConversation", text);

  const message = await messagesRepository.addMessageToConversation(text, userId, conversationId);
  return message;
};
