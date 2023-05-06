import { Response } from "express";

export interface IResponse {
  message: string;
  status: number;
  data?: any;
  error?: string;
}

export const responses = (res: Response, status: number, ...payload: IResponse[]): Response => {
  return res.status(status).json(payload);
};
