import * as conversationRepository from "../../conversations/data-access/conversations-repository.js";
import * as messagesRepository from "../data-access/messages-repository.js";
export const getAllMessagesByConversation = async (conversationId: string) => {
  return await messagesRepository.getAllMessagesInConversation(conversationId);
};

export const getRoomName = async (conversationId: string) => {
  const conversation = await conversationRepository.getConversationUsers(conversationId);
  let roomName = "";
  conversation?.Users.forEach((user) => {
    roomName = roomName + user.name;
  });

  return roomName;
};

export const addMessageToConversation = async (text: string, userId: string, conversationId: string) => {
  console.log("addMessageToConversation", text);

  const message = await messagesRepository.addMessageToConversation(text, userId, conversationId);
  return message;
};
