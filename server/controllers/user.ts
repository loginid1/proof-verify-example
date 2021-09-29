import { Request, Response } from "express";
import UsersDB from "../database/Users";
import { setJWTCookie } from "../middleware/jwt";

export const register = (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const db = new UsersDB();
    const user = db.createUser(username);

    setJWTCookie(res, user);
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
};

export const authenticate = (req: Request, res: Response) => {
  const { username } = req.body;

  const db = new UsersDB();
  const user = db.getUser(username);

  if (!user) {
    return res.status(404).json({ message: "User cannot be found" });
  }

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
