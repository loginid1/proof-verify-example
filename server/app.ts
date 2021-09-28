import express from "express";
import cookieParser from "cookie-parser";
import { tokenRouter, authIdRouter } from "./routes/";

const app = express();

app.set("port", process.env.PORT || 3001);
app.set("env", process.env.NODE_ENV || "development");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

app.use("/token", tokenRouter);
app.use("/authid", authIdRouter);

app.listen(app.get("port"), () => {
  console.log(`Listening to ${app.get("port")}`);
});
