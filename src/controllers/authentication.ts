import { Response, Request } from "express";
import { getUserByEmail, getUserBySessionToken, User } from "../models/User";
import { responses } from "../lib/response";
import { createToken } from "../lib/session";

export const signin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    const token = await createToken({ email, password });

    return res.cookie("access_token", token, { httpOnly: true, sameSite: "strict" }).json({ user, token });
  } catch (error) {
    console.log(error);
    return responses(res, 400, {
      message: "Failed",
      status: 400,
      error: error.message,
    });
  }
};

export const signout = async (req: Request, res: Response): Promise<Response> => {
  const { access_token: session } = req.cookies;

  if (!session)
    return responses(res, 200, {
      message: "Success",
      status: 200,
      data: "Signed out",
    });

  const user = await getUserBySessionToken(session);

  res.clearCookie("access_token");

  return responses(res, 200, {
    message: "Success",
    status: 200,
    data: `Signed out as ${user.email}`,
  });
};

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
