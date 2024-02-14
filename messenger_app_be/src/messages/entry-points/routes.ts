import { Message } from "@prisma/client";
import express from "express";
import * as messagesUseCase from "../domain/messages-use-case.js";
export default function defineMessagesRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post("/", async (req, res, next) => {
    const conversationId = req.body.conversationId;
    let messages: Message[] = [];
    try {
      messages = await messagesUseCase.getAllMessagesByConversation(conversationId);
    } catch (e) {
      console.log(e);
      res.status(500);
    }

    return res.status(200).send(messages);
  });

  expressApp.use("/api/messages", router);
}
