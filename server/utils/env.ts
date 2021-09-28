import dotenv from "dotenv";
dotenv.config();

const env = {
  loginidBackendClientId: process.env.BACKEND_CLIENT_ID || "",
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
  baseUrl: process.env.REACT_APP_BASE_URL || "",
};

export default env;