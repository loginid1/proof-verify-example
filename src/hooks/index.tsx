import { useEffect } from "react";
import env from "../utils/env";

const { type } = env;

export const useCheckHttps = () => {
  useEffect(() => {
    if (type === "production") {
      const url = window.location.href;
      if (url.includes("http")) {
        const newUrl = url.replace("http", "https");
        window.location.replace(newUrl);
      }
    }
  }, []);
};
