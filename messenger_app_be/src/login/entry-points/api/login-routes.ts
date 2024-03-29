import express from "express";
import { loginUser } from "../../domain/login-use-case.js";

export default function defineLoginRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post("/login", async (req, res, next) => {
    const userName = req.body.userName;
    try {
      const user = await loginUser(userName);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send();
    }
  });

  expressApp.use("/api/", router);
}
