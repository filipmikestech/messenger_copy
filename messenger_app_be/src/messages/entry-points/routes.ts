import express from "express";
import * as messagesUseCase from "../domain/messages-use-case.js";
export default function defineMessagesRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post("/", async (req, res, next) => {
    const conversationId = req.body.conversationId;
    const messages = await messagesUseCase.getAllMessagesByConversation(conversationId);
    return res.status(200).send(messages);
  });

  expressApp.use("/api/messages", router);
}
