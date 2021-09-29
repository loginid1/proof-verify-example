import request from "./request";

const baseUrl = "/user";

export const registerUser = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/register`, { body: { jwt, username } });
};

export const loginUser = async (jwt: string, username: string) => {
  return await request(`${baseUrl}/login`, { body: { jwt, username } });
};

const obj = { registerUser, loginUser };

export default obj;
