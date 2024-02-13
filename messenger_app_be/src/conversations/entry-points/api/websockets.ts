import { Server, Socket } from "socket.io";
import { prisma } from "../../../../prisma/prismaInstance.js";
import { createConversation } from "../../domain/conversations-use-case.js";
type ErrorType = { error?: string; success?: string };

const subscribeToRooms = async (userId: string, socket: Socket) => {
  const user = await prisma.user.findFirst({ where: { id: userId }, include: { Conversations: true } });
  user?.Conversations.forEach((conversation) => {
    socket.join(conversation.id);
  });
};

export default function defineConversationsWebsockets(io: Server, socket: Socket) {
  const owner = socket.handshake.auth.user;

  console.log("owner", owner);
  subscribeToRooms(owner.id, socket);

  socket.on("openConversation", async (userName: string, textMessage: string, callback: (error: ErrorType) => void) => {
    try {
      const createdConversation = await createConversation(userName, owner, textMessage);
      const sockets = await io.fetchSockets();
      const roomName = createdConversation.id;

      socket.join(roomName);

      sockets.forEach((socket) => {
        if (socket.handshake.auth.user.name === userName) {
          socket.join(roomName);
        }
      });

      io.to(roomName).emit("openConversation", createdConversation);
      callback({ success: "Conversation created" });
    } catch (e: any) {
      console.log(e);
      callback({ error: e.message });
    }
  });
}
