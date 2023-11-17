import { Server, Socket } from "socket.io";

export default function defineConversationsWebsockets(io: Server, socket: Socket) {
  const user = socket.handshake.auth.user;
  console.log(user);
}
