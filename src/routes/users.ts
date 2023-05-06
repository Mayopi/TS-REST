import { Router } from "express";
import { allUser } from "../controllers/user";
import { checkAuth } from "../middlewares/auth";

export default (router: Router): void => {
  router.get("/api/users", checkAuth, allUser);
};
