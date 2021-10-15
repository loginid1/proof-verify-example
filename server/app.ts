import express, { Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import {
  tokenRouter,
  identityRouter,
  userRouter,
  fido2Router,
} from "./routes/";

const app = express();
const buildDir = path.join(__dirname, "..", "build");

app.set("port", process.env.PORT || 3001);
app.set("env", process.env.NODE_ENV || "development");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(express.static(buildDir));

app.use("/user", userRouter);
app.use("/token", tokenRouter);
app.use("/identity", identityRouter);
app.use("/fido2", fido2Router);

app.use((_, res: Response) => {
  return res.sendFile(path.join(buildDir, "index.html"));
});

app.listen(app.get("port"), () => {
  console.log(`Listening to ${app.get("port")}`);
});
