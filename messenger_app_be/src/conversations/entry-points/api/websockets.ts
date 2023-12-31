import { Server, Socket } from "socket.io";
import { createConversation } from "../../domain/conversations-use-case.js";
type ErrorType = { error?: string; success?: string };

export default function defineConversationsWebsockets(io: Server, socket: Socket) {
  const owner = socket.handshake.auth.user;

  socket.on("openConversation", async (userName: string, callback: (error: ErrorType) => void) => {
    console.log("openConversation", userName);

    try {
      const conversation = await createConversation(userName, owner);
      const sockets = await io.fetchSockets();
      let userToSocketId = null;

      sockets.forEach((socket) => {
        if (socket.handshake.auth.user.name === userName) {
          userToSocketId = socket.id;
        }
      });
      console.log(userToSocketId);
      if (userToSocketId) {
        socket.to(userToSocketId).emit("openConversation", conversation);
      }
      callback({ success: "Conversation created" });
    } catch (e: any) {
      console.log(e);
      callback({ error: e.message });
    }
  });
}
