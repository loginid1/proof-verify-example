import { Request, Response } from "express";
import { LoginId } from "@loginid/node-sdk";
import env from "../utils/env";

const loginid = new LoginId(
  env.loginidBackendClientId,
  env.privateKey,
  env.baseUrl
);

export const createToken = (req: Request, res: Response) => {
  const { scope = "" } = req.body;

  const response = {
    service_token: loginid.generateServiceToken(scope),
  };

  res.status(200).json(response);
};
