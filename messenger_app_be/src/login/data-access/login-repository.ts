import { prisma } from "../../../prisma/prismaInstance.js";

export const createUser = async (name: string) => {
  return await prisma.user.create({
    data: {
      name: name,
    },
  });
};

export const getUser = async (name: string) => {
  return await prisma.user.findFirst({ where: { name: name } });
};
