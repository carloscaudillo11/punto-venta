import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyToken,
} from "../controllers/auth.controller";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.get("/logout", logout);

export default router;
