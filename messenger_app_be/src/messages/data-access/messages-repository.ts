import { prisma } from "../../../prisma/prismaInstance.js";

export const createMessage = async (text: string, conversationId: string, userId: string) => {
  return await prisma.message.create({
    data: {
      text: text,
      conversationId: conversationId,
      userId: userId,
    },
  });
};
