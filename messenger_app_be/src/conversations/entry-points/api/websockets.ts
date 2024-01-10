import { Server, Socket } from "socket.io";
import { createConversation } from "../../domain/conversations-use-case.js";
type ErrorType = { error?: string; success?: string };

export default function defineConversationsWebsockets(io: Server, socket: Socket) {
  const owner = socket.handshake.auth.user;

  socket.on("openConversation", async (userName: string, textMessage: string, callback: (error: ErrorType) => void) => {
    console.log("openConversation", userName);

    try {
      const conversation = await createConversation(userName, owner, textMessage);
      const sockets = await io.fetchSockets();
      const roomName = userName + owner.name;
      socket.join(roomName);
      let userToSocketId = null;

      sockets.forEach((socket) => {
        if (socket.handshake.auth.user.name === userName) {
          userToSocketId = socket.id;
          socket.join(roomName);
        }
      });
      if (userToSocketId) {
        io.to(roomName).emit("openConversation", conversation);
      }
      let roomUsers = await io.in(roomName).fetchSockets();
      console.log("room users", roomUsers);
      callback({ success: "Conversation created" });
    } catch (e: any) {
      console.log(e);
      callback({ error: e.message });
    }
  });
}
