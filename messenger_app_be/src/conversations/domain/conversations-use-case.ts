import { User } from "@prisma/client";
import * as loginRepository from "../../login/data-access/login-repository.js";
import * as conversationsRepository from "../data-access/conversations-repository.js";

export const getAllConversations = async (userId: string) => {
  return await conversationsRepository.getAllConversations(userId);
};

export const getConversation = async (conversationId: string) => {
  return await conversationsRepository.getConversationUsersMessages(conversationId);
};

export const createConversation = async (userNameJoiner: string, owner: User, textMessage: string) => {
  const joiner = await loginRepository.getUser(userNameJoiner);
  if (!joiner) {
    throw Error("User not found");
  }
  const conversationByOwnerAndJoinerExists = await conversationsRepository.getConversationByUsers(owner.id, joiner.id);
  if (conversationByOwnerAndJoinerExists) {
    throw Error("Conversation already exists");
  }

  return await conversationsRepository.createConversation(joiner.id, owner.id, textMessage && textMessage);
};

export const deleteConversation = async (conversationId: string) => {
  return await conversationsRepository.deleteConversation(conversationId);
};
