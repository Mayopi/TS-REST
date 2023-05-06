import { Router } from "express";
import { register, signin } from "../controllers/authentication";

export default (router: Router): void => {
  router.post("/api/auth/register", register);
  router.post("/api/auth/signin", signin);
};
