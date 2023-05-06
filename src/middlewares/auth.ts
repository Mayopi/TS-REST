import { getUserBySessionToken } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { responses } from "../lib/response";

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const session = req.cookies.access_token;
  if (!session) {
    //   throw new Error("You're not logged in, permission denied");
    return responses(res, 403, {
      message: "Failed",
      status: 403,
      error: "You're not logged in, permission denied",
    });
  }

  const user = await getUserBySessionToken(session, true);
  if (!user) {
    return responses(res, 403, {
      message: "Failed",
      status: 403,
      error: "Invalid Access Token",
    });
  }

  next();
};
