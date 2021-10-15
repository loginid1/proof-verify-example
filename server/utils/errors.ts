import { Response } from "express";

export const internalErrorResponse = (res: Response) => {
  return res.status(500).json({ message: "Internal Server Error" });
};

export const loginidError = (res: Response, error: any) => {
  return res.status(400).json({ message: error.message, code: error.code });
};
