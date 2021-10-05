import { LoginIdManagement } from "@loginid/node-sdk";
import { Request, Response } from "express";
import { setJWTCookie } from "../middleware/jwt";
import env from "../utils/env";

const management = new LoginIdManagement(
  env.loginidBackendClientId,
  env.privateKey,
  env.baseUrl
);

export const register = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const id = await management.getUserId(username);
    const user = {
      username,
      id,
    };

    setJWTCookie(res, user);
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { username } = req.body;

  let id: string = "";
  try {
    id = await management.getUserId(username);
  } catch {}

  if (!id) {
    return res.status(404).json({ message: "User cannot be found" });
  }

  const user = {
    username,
    id,
  };

  setJWTCookie(res, user);
  return res.status(200).json(user);
};

export const logout = (_: Request, res: Response) => {
  return res.clearCookie("jwt").status(204).end();
};

export const authorize = (req: Request, res: Response) => {
  const { user } = req;
  return res.status(200).json(user);
};
