import { Router } from 'express';
import {
  createOrder,
  getOrder,
  getOrders,
  getOrdersByBox
} from '../controllers/orders.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getOrders', auth, getOrders);
router.get('/getOrder/:id', auth, getOrder);
router.post('/createOrder', auth, createOrder);
router.get('/getOrdersByBox/:id', auth, getOrdersByBox);

export default router;
