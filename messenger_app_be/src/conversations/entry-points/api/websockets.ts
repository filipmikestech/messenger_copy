import { Server, Socket } from "socket.io";
import { prisma } from "../../../../prisma/prismaInstance.js";
import { createConversation } from "../../domain/conversations-use-case.js";
type ErrorType = { error?: string; success?: string };

const subscribeToRooms = async (userId: string, socket: Socket) => {
  const user = await prisma.user.findFirst({ where: { id: userId }, include: { Rooms: true } });
  user?.Rooms.forEach((room) => {
    socket.join(room.id);
  });
};

export default function defineConversationsWebsockets(io: Server, socket: Socket) {
  const owner = socket.handshake.auth.user;

  console.log("owner", owner);
  subscribeToRooms(owner.id, socket);

  socket.on("openConversation", async (userName: string, textMessage: string, callback: (error: ErrorType) => void) => {
    console.log("openConversation", userName);

    try {
      const { createdConversation, room } = await createConversation(userName, owner, textMessage);
      const sockets = await io.fetchSockets();
      const roomName = room.id;

      socket.join(roomName);
      let userToSocketId = null;

      sockets.forEach((socket) => {
        if (socket.handshake.auth.user.name === userName) {
          userToSocketId = socket.id;
          socket.join(roomName);
        }
      });
      if (userToSocketId) {
        io.to(roomName).emit("openConversation", createdConversation);
      }

      console.log("room name open conversation", roomName);
      console.log("rooms conversation", io.sockets.adapter.rooms);
      callback({ success: "Conversation created" });
    } catch (e: any) {
      console.log(e);
      callback({ error: e.message });
    }
  });
}
