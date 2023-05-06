import { Router, Request, Response } from "express";
import { register } from "../controllers/authentication";
import { allUser } from "../controllers/user";

export default (router: Router): void => {
  router.post("/api/auth/register", register);
  router.get("/api/auth/user", allUser);
};
