import request from "./request";

const baseUrl = "/user";

export interface User {
  username: string;
  id: string;
}

export const registerUser = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/register`, { body: { jwt, username } });
};

export const loginUser = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/login`, { body: { jwt, username } });
};

export const logout = async () => {
  return await request(`${baseUrl}/logout`);
};

export const isAuthorized = async () => {
  return await request(`${baseUrl}/me`);
};

const obj = { registerUser, loginUser, isAuthorized, logout };

export default obj;
