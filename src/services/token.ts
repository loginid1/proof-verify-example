import request from "./request";

const baseUrl = "/token";

export const createToken = async (scope: string) => {
  const { service_token: serviceToken } = await request(`${baseUrl}/create`, {
    body: { scope },
  });

  return serviceToken;
};

export const verifyToken = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/verify`, { body: { jwt, username } });
};

const obj = { createToken };

export default obj;
