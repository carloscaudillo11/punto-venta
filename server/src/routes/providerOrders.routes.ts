import { Router } from 'express';
import {
  createProviderOrder,
  getProviderOrders,
  getProviderOrder,
} from '../controllers/providerOrders.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getProviderOrders', auth, getProviderOrders);
router.post('/createProviderOrder', auth, createProviderOrder);
router.get('/getProviderOrder/:id', auth, getProviderOrder);

export default router;
