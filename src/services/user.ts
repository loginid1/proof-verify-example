import request from "./request";

const baseUrl = "/user";

export const registerUser = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/register`, { body: { jwt, username } });
};

export const loginUser = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/login`, { body: { jwt, username } });
};

export const logout = async () => {
  return await request(`${baseUrl}/logout`, {});
};

export const isAuthorized = async () => {
  ("");
};

const obj = { registerUser, loginUser, logout };

export default obj;
