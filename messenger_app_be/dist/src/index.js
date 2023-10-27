import dotenv from "dotenv";
import express from "express";
import defineConversationsRoutes from "./conversations/entry-points/api/routes.js";
dotenv.config();
const expressApp = express();
const port = process.env.PORT;
expressApp.use(express.json());
defineConversationsRoutes(expressApp);
expressApp.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map