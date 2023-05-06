import { Response, Request } from "express";
import { getUserByEmail, User } from "../models/User";
import { responses } from "../lib/response";

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return responses(res, 400, {
        message: "Failed",
        status: 400,
        error: "Email, Username and Password is required!",
      });

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return responses(res, 400, {
        message: "Failed",
        status: 400,
        error: `User with email of ${email} already registered`,
      });

    const user = await User.create({
      email,
      username,
      authentication: {
        password,
      },
    });

    return responses(res, 200, {
      message: "Success",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return responses(res, 500, {
      message: "Failed",
      status: 400,
      error: error.message,
    });
  }
};
