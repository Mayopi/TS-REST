import { Router } from "express";
import { allUser, user } from "../controllers/user";
import { checkAuth } from "../middlewares/auth";

export default (router: Router): void => {
  router.get("/api/users", checkAuth, allUser);
  router.get("/api/users/:email", checkAuth, user);
};
