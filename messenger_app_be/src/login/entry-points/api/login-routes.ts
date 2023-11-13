import express from "express";
import * as loginRepository from "../../data-access/login-repository.js";

export default function defineLoginRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post("/login", async (req, res, next) => {
    const userName = req.body.userName;
    try {
      console.log(`Trying to log in with user ${userName}`);

      let user = null;
      user = await loginRepository.getUser(userName);

      if (!user) {
        user = await loginRepository.createUser(userName);
      }
      return res.status(200).send({ user: user });
    } catch (error) {
      console.log("Error while getting user", error);
      return res.status(500).send();
    }
  });

  expressApp.use("/api/", router);
}
