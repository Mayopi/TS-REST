import { Response } from "express";

export const responses = (res: Response, status: number, ...props: any): Response => {
  return res.status(status).json(props);
};
