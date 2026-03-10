import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getMe, authCallback } from "../controllers/authController"

const router = Router();


router.get("/me", protectRoute, getMe)
router.get("/calback", authCallback,)





export default router;