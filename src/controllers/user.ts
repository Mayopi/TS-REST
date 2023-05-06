import { Request, Response, response } from "express";
import { getUserByEmail, getUsers } from "../models/User";
import { responses } from "../lib/response";

export const allUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await getUsers();
    return responses(res, 200, {
      message: "Success",
      status: 200,
      data: users,
    }).end();
  } catch (error) {
    console.log(error);
    return responses(res, 500, {
      message: "Failed",
      status: 500,
      error: error.message,
    });
  }
};

export const user = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.params;

    if (!email)
      return responses(res, 400, {
        message: "Failed",
        status: 400,
        error: "Email is required!",
      });

    const user = await getUserByEmail(email);

    if (!user)
      return responses(res, 404, {
        message: "Failed",
        status: 404,
        error: `User with email ${email} is not found!`,
      });

    return responses(res, 200, {
      message: "Success",
      status: 200,
      data: user,
    }).end();
  } catch (error) {
    console.log(error);
    return responses(res, 500, {
      message: "Failed",
      status: 500,
      error: error.message,
    });
  }
};
