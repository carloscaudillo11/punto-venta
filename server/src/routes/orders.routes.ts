import { Router } from 'express';
import {
  createOrder,
  getOrder,
  getOrders,
} from '../controllers/orders.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getOrders', auth, getOrders);
router.get('/getOrder/:id', auth, getOrder);
router.post('/createOrder', auth, createOrder);

export default router;
