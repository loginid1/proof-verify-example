import { Router } from "express";
import { createToken } from "../controllers/token";

const router = Router();

router.post("/create", createToken);

export default router;
