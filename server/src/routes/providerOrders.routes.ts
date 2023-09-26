import { Router } from "express";
import {
  createProviderOrder,
  getProviderOrders,
  getProviderOrder,
  updateProviderOrder,
  deleteProviderOrder
} from "../controllers/providerOrders.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/providerOrders", auth, getProviderOrders);
router.post("/providerOrders", auth, createProviderOrder);
router.get("/providerOrders/:id", auth, getProviderOrder);
router.put("/providerOrders/:id", auth, updateProviderOrder);
router.delete("/providerOrders/:id", auth, deleteProviderOrder);

export default router;