import { Router } from "express";
import {
  createUser,
  proofInit,
  proofComplete,
  proofEvaluate,
} from "../controllers/identity";

const router = Router();

router.post("/init", proofInit);
router.post("/complete", proofComplete);
router.post("/evaluate", proofEvaluate);
router.post("/user", createUser);

export default router;
