import request from "./request";

const baseUrl = "/fido2";

export const forceInit = async (username: string) => {
  return await request(`${baseUrl}/init/force`, { body: { username } });
};

const def = { forceInit };

export default def;
