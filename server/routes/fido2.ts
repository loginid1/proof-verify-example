import { Router } from "express";
import { forceInitFido2 } from "../controllers/fido2";

const router = Router();

router.post("/init/force", forceInitFido2);

export default router;
