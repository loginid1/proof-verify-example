import { Request, Response } from "express";
import { LoginIdManagement } from "@loginid/node-sdk";
import { loginidError } from "../utils/errors";
import env from "../utils/env";

const management = new LoginIdManagement(
  env.loginidBackendClientId,
  env.privateKey,
  env.baseUrl
);

export const forceInitFido2 = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const userId = await management.getUserId(username);

    const payload = await management.initAddCredentialWithoutCode(userId);

    return res.status(200).json(payload);
  } catch (e) {
    return loginidError(res, e);
  }
};
