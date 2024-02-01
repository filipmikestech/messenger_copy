import { Server, Socket } from "socket.io";
import * as conversationRepository from "../../conversations/data-access/conversations-repository.js";
import { addMessageToConversation } from "../domain/messages-use-case.js";

export default function defineMessagesWebsockets(io: Server, socket: Socket) {
  const owner = socket.handshake.auth.user;
  socket.on("sendMessage", async (conversationId: string, textMessage: string) => {
    console.log("send message", conversationId, textMessage);
    console.log("rooms", io.sockets.adapter.rooms);

    const conversation = await conversationRepository.getConversationUsers(conversationId);
    const roomName = conversation?.id;
    try {
      const message = await addMessageToConversation(textMessage, owner.id, conversationId);
      console.log("database message");

      console.log("room name", roomName);
      if (roomName) {
        io.to(roomName).emit("sendMessage", message);
      }
    } catch (e: any) {
      console.log("error", e);
    }
  });
}
