import { Router } from "express";
import { verifyLoginIdJWT, verifyUser } from "../middleware/jwt";
import { register, authenticate, logout, authorize } from "../controllers/user";

const router = Router();

router.post("/register", verifyLoginIdJWT, register);
router.post("/login", verifyLoginIdJWT, authenticate);
router.post("/logout", logout);
router.post("/me", verifyUser, authorize);

export default router;
