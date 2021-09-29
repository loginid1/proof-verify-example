import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../database/Users";
import { LoginId } from "@loginid/node-sdk";
import env from "../utils/env";

declare module "express-serve-static-core" {
  export interface Request {
    user?: {
      id: string;
      username: string;
    };
  }
}

export interface UserJWT {
  id: string;
  username: string;
  iat: number;
}

const loginid = new LoginId(
  env.loginidBackendClientId,
  env.privateKey,
  env.baseUrl
);

export const setJWTCookie = (res: Response, user: User) => {
  const token = jsonwebtoken.sign(user, env.localTokenSecret);
  res.cookie("jwt", token, {
    httpOnly: true,
    signed: true,
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
    secure: env.nodeEnvironment === "production",
  });
};

export const verifyLoginIdJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jwt = "", username = "" } = req.body;

  try {
    const isValid = await loginid.verifyToken(jwt, username);

    if (isValid) {
      return next();
    } else {
      return res.status(401).json({ message: "Invalid JWT" });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies?.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Failed to verify authorization token" });
  }

  try {
    const data = jsonwebtoken.verify(token, env.localTokenSecret) as UserJWT;

    req.user.username = data.username;
    req.user.id = data.id;

    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Invalid authorization token" });
  }
};
