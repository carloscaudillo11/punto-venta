import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
  finishOrder
} from '../controllers/orders.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getOrders', auth, getOrders);
router.post('/createOrder', auth, createOrder);
router.get('/getOrder/:id', auth, getOrder);
router.put('/updateOrder/:id', auth, updateOrder);
router.delete('/deleteOrder/:id', auth, deleteOrder);
router.put('/finishOrder/:id', auth, finishOrder);

export default router;
