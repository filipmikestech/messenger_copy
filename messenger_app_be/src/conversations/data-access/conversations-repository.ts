import { Conversation } from "@prisma/client";
import { prisma } from "../../../prisma/prismaInstance.js";

export const getAllConversations = async (): Promise<Conversation[]> => {
  return await prisma.conversation.findMany();
};
