import { Router } from "express";
import { authIdInit, createUser } from "../controllers/authid";

const router = Router();

router.post("/init", authIdInit);
router.post("/user", createUser);

export default router;
