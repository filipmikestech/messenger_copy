import express from "express";
import * as conversationsUseCase from "../../domain/conversations-use-case.js";

export default function defineConversationsRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    const userId = req.userId;
    try {
      console.log("Getting conversations list");
      const conversationsList = await conversationsUseCase.getAllConversations(userId);
      return res.json(conversationsList);
    } catch (error) {
      console.log("Error while getting conversation list", error);
      return res.status(500).send();
    }
  });

  router.get("/:conversationId", async (req, res, next) => {
    const { conversationId } = req.params;
    console.log("params", conversationId);
    console.log("get conversation");
    const conversation = await conversationsUseCase.getConversation(conversationId);
    console.log("one conversation", conversation);
    return res.status(200).send(conversation);
  });

  expressApp.use("/api/conversation", router);
}
