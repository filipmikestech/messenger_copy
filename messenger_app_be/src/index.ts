import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { Server } from "socket.io";
import defineConversationsRoutes from "./conversations/entry-points/api/routes.js";
import defineConversationsWebsockets from "./conversations/entry-points/api/websockets.js";
import defineLoginRoutes from "./login/entry-points/api/login-routes.js";
import defineMessagesRoutes from "./messages/entry-points/routes.js";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

dotenv.config();

const expressApp: Express = express();
expressApp.use(cors());
const port = process.env.PORT;

expressApp.use(express.json());

defineLoginRoutes(expressApp);

expressApp.use((req, res, next) => {
  const userId = req.headers.authorization;
  if (!userId) {
    return res.status(400).send("Not logged in");
  }

  req.userId = userId;
  return next();
});

defineConversationsRoutes(expressApp);

defineMessagesRoutes(expressApp);

const server = expressApp.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  defineConversationsWebsockets(io, socket);
});
