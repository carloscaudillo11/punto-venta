import { Router } from "express";
import {
  createProvider,
  deleteProvider,
  getProviders,
  getProvider,
  updateProvider,
} from "../controllers/providers.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/providers", auth, getProviders);
router.post("/providers", auth, createProvider);
router.get("/providers/:id", auth, getProvider);
router.put("/providers/:id", auth, updateProvider);
router.delete("/providers/:id", auth, deleteProvider);

export default router;
