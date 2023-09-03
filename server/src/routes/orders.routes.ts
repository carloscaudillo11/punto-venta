import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/orders", auth, getOrders);
router.post("/orders", auth, createOrder);
router.get("/orders/:id", auth, getOrder);
router.put("/orders/:id", auth, updateOrder);
router.delete("/orders/:id", auth, deleteOrder);

export default router;
