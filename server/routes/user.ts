import { Router } from "express";
import { register, authenticate } from "../controllers/user";
import { verifyLoginIdJWT } from "../middleware/jwt";

const router = Router();

router.post("/register", verifyLoginIdJWT, register);
router.post("/login", verifyLoginIdJWT, authenticate);

export default router;
