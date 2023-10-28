import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import defineConversationsRoutes from "./conversations/entry-points/api/routes.js";

dotenv.config();

const expressApp: Express = express();
expressApp.use(cors());
const port = process.env.PORT;

expressApp.use(express.json());

defineConversationsRoutes(expressApp);

expressApp.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
