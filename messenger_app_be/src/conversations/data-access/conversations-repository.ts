import { Conversation } from "@prisma/client";
import { prisma } from "../../../prisma/prismaInstance.js";

export const getAllConversations = async (): Promise<Conversation[]> => {
  return await prisma.conversation.findMany({ include: { Users: true } });
};

export const getConversationByUsers = async (user1Id: string, user2Id: string) => {
  return await prisma.conversation.findFirst({
    where: {
      OR: [
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

export const createConversation = async (user1Id: string, user2Id: string) => {
  return await prisma.conversation.create({
    data: {
      Users: { connect: [{ id: user1Id }, { id: user2Id }] },
    },
    include: { Users: true },
  });
};
