import { Router, Request, Response } from "express";
import { register } from "../controllers/authentication";

export default (router: Router): void => {
  router.get("/auth/register", register);
};