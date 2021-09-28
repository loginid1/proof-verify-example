import request from "./request";

const baseUrl = "/authid";

export const createUser = async (username: string) => {
  return await request(`${baseUrl}/user`, { body: { username } });
};

export const init = async (username: string, userId?: string) => {
  return await request(`${baseUrl}/init`, {
    body: { username, user_id: userId },
  });
};

export default { createUser, init };
