import { Router } from "express";
import { setUserRole, getUserRole } from "../controllers/roles.controller";

const router = Router();

router.post("/set-role", setUserRole);

router.get("/:uid", getUserRole);

export default router;
