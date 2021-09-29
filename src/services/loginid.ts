import request from "./request";
import env from "../utils/env";

const baseUrl = env.baseUrl;
const clientId = env.loginidWebClientId;

export const authenticateWithVerifyInit = async (
  username: string,
  serviceToken: string,
  credentialUUID?: string
) => {
  return await request(`${baseUrl}/authenticate/authid/init`, {
    headers: { Authorization: `Bearer ${serviceToken}` },
    body: {
      client_id: clientId,
      username,
      ...(credentialUUID && { options: { credential_uuid: credentialUUID } }),
    },
  });
};

export const authenticateWithVerifyComplete = async (
  username: string,
  credentialUUID: string
) => {
  return await request(`${baseUrl}/authenticate/authid/complete`, {
    body: {
      client_id: clientId,
      username,
      credential_uuid: credentialUUID,
    },
  });
};

export default { authenticateWithVerifyInit, authenticateWithVerifyComplete };
