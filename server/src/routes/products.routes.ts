import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
  verifyStock,
} from '../controllers/products.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getProducts', auth, getProducts);
router.post('/createProduct', auth, createProduct);
router.get('/getProduct/:id', auth, getProduct);
router.put('/updateProduct/:id', auth, updateProduct);
router.delete('/deleteProduct/:id', auth, deleteProduct);
router.get('/verifyStock', auth, verifyStock);

export default router;
