import { Router } from "express";
import { register, signin, signout } from "../controllers/authentication";

export default (router: Router): void => {
  router.post("/api/auth/register", register);
  router.post("/api/auth/signin", signin);
  router.get("/api/auth/signout", signout);
};
