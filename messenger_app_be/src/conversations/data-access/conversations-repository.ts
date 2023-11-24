import { Conversation } from "@prisma/client";
import { prisma } from "../../../prisma/prismaInstance.js";

export const getAllConversations = async (): Promise<Conversation[]> => {
  return await prisma.conversation.findMany({ include: { owner: true, joiner: true } });
};

export const getConversationByOwnerAndJoiner = async (userIdOwner: string, userIdJoiner: string) => {
  return await prisma.conversation.findFirst({
    where: { userIdOwner: userIdOwner || userIdJoiner, userIdJoiner: userIdJoiner || userIdOwner },
    include: { owner: true, joiner: true },
  });
};

export const createConversation = async (userIdJoiner: string, userIdOwner: string) => {
  return await prisma.conversation.create({
    data: {
      userIdJoiner: userIdJoiner,
      userIdOwner: userIdOwner,
    },
    include: { owner: true, joiner: true },
  });
};
