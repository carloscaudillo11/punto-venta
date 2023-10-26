import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
  finishOrder,
  getPendingOrders
} from '../controllers/orders.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getOrders', auth, getOrders);
router.get('/getOrder/:id', auth, getOrder);
router.get('/getPendingOrders/:id', auth, getPendingOrders);
router.post('/createOrder', auth, createOrder);
router.put('/updateOrder/:id', auth, updateOrder);
router.put('/finishOrder/:id', auth, finishOrder);
router.delete('/deleteOrder/:id', auth, deleteOrder);

export default router;
