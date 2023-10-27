import express from "express";
import * as conversationsUseCase from "../../domain/conversations-use-case.js";

export default function defineConversationsRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      console.log("Getting conversations list");
      const conversationsList = await conversationsUseCase.getAllConversations();
      return res.json(conversationsList);
    } catch (error) {
      console.log("Error while getting conversation list", error);
      return res.status(500).send();
    }
  });

  expressApp.use("/conversation", router);
}
