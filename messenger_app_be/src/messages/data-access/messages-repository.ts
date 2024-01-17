import { prisma } from "../../../prisma/prismaInstance.js";

export const getAllMessagesInConversation = async (conversationId: string) => {
  return await prisma.message.findMany({ where: { conversationId: conversationId }, include: { user: true } });
};

export const createMessage = async (text: string, conversationId: string, userId: string) => {
  return await prisma.message.create({
    data: {
      text: text,
      conversationId: conversationId,
      userId: userId,
      created: new Date(),
    },
  });
};

export const addMessageToConversation = async (text: string, userId: string, conversationId: string) => {
  console.log("addMessageToConversation repo", text);
  const message = await prisma.message.create({ data: { text: text, userId: userId, conversationId: conversationId, created: new Date() } });
  return message;
};
