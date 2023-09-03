import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/products.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/products", auth, getProducts);
router.post("/products", auth, createProduct);
router.get("/products/:id", auth, getProduct);
router.put("/products/:id", auth, updateProduct);
router.delete("/products/:id", auth, deleteProduct);

export default router;
