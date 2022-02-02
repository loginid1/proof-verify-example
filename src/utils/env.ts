import dotenv from "dotenv";
dotenv.config();

const env = {
  loginidWebClientId: process.env.REACT_APP_WEB_CLIENT_ID || "",
  baseUrl: process.env.REACT_APP_BASE_URL || "",
  type: "development",
};

export default env;
