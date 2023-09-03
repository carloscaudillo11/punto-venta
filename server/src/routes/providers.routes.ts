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

router.get("/products", auth, getProviders);
router.post("/products", auth, createProvider);
router.get("/products/:id", auth, getProvider);
router.put("/products/:id", auth, updateProvider);
router.delete("/products/:id", auth, deleteProvider);

export default router;
