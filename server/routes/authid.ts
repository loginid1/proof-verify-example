import { Router } from "express";
import { authIdInit } from "../controllers/authid";

const router = Router();

router.post("/init", authIdInit);

export default router;
