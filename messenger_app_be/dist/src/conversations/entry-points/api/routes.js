var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import * as conversationsUseCase from "../../domain/conversations-use-case.js";
export default function defineConversationsRoutes(expressApp) {
    const router = express.Router();
    router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Getting conversations list");
            const conversationsList = yield conversationsUseCase.getAllConversations();
            return res.json(conversationsList);
        }
        catch (error) {
            console.log("Error while getting conversation list", error);
            return res.status(500).send();
        }
    }));
    expressApp.use("/conversation", router);
}
//# sourceMappingURL=routes.js.map