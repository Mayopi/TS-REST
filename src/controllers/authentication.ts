import { Response, Request } from "express";

export const register = (req: Request, res: Response): Response => {
  try {
    res.status(200).json({
      message: "Hello TypeScript!",
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
