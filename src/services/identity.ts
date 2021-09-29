import request from "./request";

const baseUrl = "/identity";

interface CompleteProps {
  credentialUUID: string;
  username?: string;
  userId?: string;
}

export const createUser = async (username: string) => {
  return await request(`${baseUrl}/user`, { body: { username } });
};

export const init = async (username: string, userId?: string) => {
  return await request(`${baseUrl}/init`, {
    body: { username, user_id: userId },
  });
};

export const complete = async ({
  credentialUUID,
  username,
  userId,
}: CompleteProps) => {
  return await request(`${baseUrl}/complete`, {
    body: { username, user_id: userId, credential_uuid: credentialUUID },
  });
};

const obj = { createUser, init, complete };

export default obj;
