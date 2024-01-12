import { Conversation } from "@prisma/client";
import { prisma } from "../../../prisma/prismaInstance.js";

export const getAllConversations = async (userId: string): Promise<Conversation[]> => {
  return await prisma.conversation.findMany({
    where: {
      Users: {
        some: { id: userId },
      },
    },
    include: { Users: true },
  });
};

export const getConversationByUsers = async (user1Id: string, user2Id: string) => {
  return await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          Users: {
            some: { id: user1Id },
          },
        },
        {
          Users: {
            some: { id: user2Id },
          },
        },
      ],
    },
  });
};

export const createConversation = async (joinerId: string, ownerId: string, messageText?: string) => {
  return await prisma.conversation.create({
    data: {
      Users: { connect: [{ id: joinerId }, { id: ownerId }] },
      Messages: messageText ? { create: { text: messageText, userId: ownerId } } : {},
    },
    include: { Users: true },
  });
};
