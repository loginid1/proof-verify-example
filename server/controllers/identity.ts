import { Request, Response } from "express";
import { LoginId } from "@loginid/node-sdk";
import fetch from "node-fetch";
import env from "../utils/env";

const loginid = new LoginId(
  env.loginidBackendClientId,
  env.privateKey,
  env.baseUrl
);

const postHeaders = { "Content-Type": "application/json" };

const internalErrorResponse = (res: Response) => {
  return res.status(500).json({ message: "Internal Server Error" });
};

/*
 * Creates a user without credentials.
 */
export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  const url = `${env.baseUrl}/api/native/manage/users`;

  const serviceToken = loginid.generateServiceToken("users.create");

  const requestPayload = { username };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...postHeaders,
        Authorization: `Bearer ${serviceToken}`,
        "X-Client-ID": env.loginidBackendClientId,
      },
      body: JSON.stringify(requestPayload),
    });

    const payload = await response.json();

    return res.status(response.status).json(payload);
  } catch (e) {
    console.log(e.message);
    internalErrorResponse(res);
  }
};

/*
 * Initiate adding a new AuthID credential.
 */
export const proofInit = async (req: Request, res: Response) => {
  const {
    username,
    user_id: userId,
    credential_name: credentialName,
  } = req.body;

  const url = `${env.baseUrl}/api/native/credentials/authid/init`;

  const serviceToken = loginid.generateServiceToken("credentials.force_add");

  const requestPayload = {
    client_id: env.loginidBackendClientId,
    username,
    user_id: userId,
    ...(credentialName && {
      options: {
        credential_name: credentialName,
      },
    }),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { ...postHeaders, Authorization: `Bearer ${serviceToken}` },
      body: JSON.stringify(requestPayload),
    });

    const payload = await response.json();

    return res.status(response.status).json(payload);
  } catch (e) {
    console.log(e.message);
    internalErrorResponse(res);
  }
};

/*
 * Complete adding a new AuthID credential.
 */
export const proofComplete = async (req: Request, res: Response) => {
  const {
    username,
    user_id: userId,
    credential_uuid: credentialUUID,
  } = req.body;

  const url = `${env.baseUrl}/api/native/credentials/authid/complete`;

  const requestPayload = {
    client_id: env.loginidBackendClientId,
    username,
    user_id: userId,
    credential_uuid: credentialUUID,
    activate_credential: true,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: postHeaders,
      body: JSON.stringify(requestPayload),
    });

    const payload = await response.json();

    return res.status(response.status).json(payload);
  } catch (e) {
    console.log(e.message);
    internalErrorResponse(res);
  }
};
