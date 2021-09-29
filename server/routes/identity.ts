import { Router } from "express";
import {
  createUser,
  deleteUser,
  proofInit,
  proofComplete,
} from "../controllers/identity";

const router = Router();

router.post("/init", proofInit);
router.post("/complete", proofComplete);
router.post("/user", createUser);

export default router;
