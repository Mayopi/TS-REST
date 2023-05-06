import { Response, Request } from "express";
import { getUserByEmail, User } from "../models/User";

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({
        message: "Failed",
        status: 400,
        error: "Email, Username and Password is required!",
      });

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return res.status(400).json({
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

    return res.status(200).json({
      message: "Success",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Failed",
      status: 400,
      error: error.message,
    });
  }
};
