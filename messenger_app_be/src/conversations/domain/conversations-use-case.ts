import { User } from "@prisma/client";
import * as loginRepository from "../../login/data-access/login-repository.js";
import * as conversationsRepository from "../data-access/conversations-repository.js";

export const getAllConversations = async (userId: string) => {
  return await conversationsRepository.getAllConversations(userId);
};

export const getConversation = async (conversationId: string) => {
  return await conversationsRepository.getConversation(conversationId);
};

export const createConversation = async (userNameJoiner: string, owner: User, textMessage: string) => {
  console.log("userNameJoiner", userNameJoiner);
  const joiner = await loginRepository.getUser(userNameJoiner);
  console.log("joiner", joiner);
  if (!joiner) {
    throw Error("User not found");
  }

  const conversationByOwnerAndJoinerExists = await conversationsRepository.getConversationByUsers(owner.id, joiner.id);

  if (conversationByOwnerAndJoinerExists) {
    throw Error("Conversation already exists");
  }

  const createdConversation = await conversationsRepository.createConversation(joiner.id, owner.id, textMessage && textMessage);

  return createdConversation;
};
