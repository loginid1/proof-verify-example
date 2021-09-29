import request from "./request";

const baseUrl = "/token";

export const createToken = async (scope: string) => {
  const { service_token: serviceToken } = await request(`${baseUrl}/create`, {
    body: { scope },
  });

  return serviceToken;
};

export default { createToken };
