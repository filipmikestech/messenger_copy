import express from "express";
import * as messagesUseCase from "../domain/messages-use-case.js";
export default function defineMessagesRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post("/", async (req, res, next) => {
    console.log(req.body);
    const conversationId = req.body.conversationId;
    const messages = await messagesUseCase.getAllMessagesByConversation(conversationId);
    console.log(messages);
    return res.status(200).send(messages);
  });

  expressApp.use("/api/messages", router);
}
