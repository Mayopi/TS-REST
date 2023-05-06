import { Request, Response, response } from "express";
import { getUser } from "../models/User";
import { responses } from "../lib/response";

export const allUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await getUser();
    return responses(res, 200, {
      message: "Success",
      status: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return responses(res, 500, {
      message: "Failed",
      status: 500,
      error: error.message,
    });
  }
};
