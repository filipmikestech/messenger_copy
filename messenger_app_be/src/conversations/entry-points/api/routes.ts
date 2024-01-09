import express from "express";
import * as conversationsUseCase from "../../domain/conversations-use-case.js";

export default function defineConversationsRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    console.log("cool", req.userId);
    const userId = req.userId;
    if (!userId) {
      return res.status(400).send("Not logged in");
    }
    try {
      console.log("Getting conversations list");
      const conversationsList = await conversationsUseCase.getAllConversations(userId);
      return res.json(conversationsList);
    } catch (error) {
      console.log("Error while getting conversation list", error);
      return res.status(500).send();
    }
  });

  expressApp.use("/api/conversation", router);
}
