import express from "express";
import * as conversationsUseCase from "../../domain/conversations-use-case.js";

export default function defineConversationsRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    const userId = req.userId;
    try {
      const conversationsList = await conversationsUseCase.getAllConversations(userId);
      return res.json(conversationsList);
    } catch (error) {
      return res.status(500).send();
    }
  });

  router.get("/:conversationId", async (req, res, next) => {
    const { conversationId } = req.params;
    let conversation = null;
    try {
      conversation = await conversationsUseCase.getConversation(conversationId);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }

    return res.status(200).send(conversation);
  });

  router.delete("/:conversationId", async (req, res, next) => {
    const { conversationId } = req.params;
    try {
      await conversationsUseCase.deleteConversation(conversationId);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }

    return res.status(200).send();
  });

  expressApp.use("/api/conversation", router);
}
