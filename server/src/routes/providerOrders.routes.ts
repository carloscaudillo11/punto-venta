import { Router } from 'express';
import {
  createProviderOrder,
  getProviderOrders,
  getProviderOrder,
  updateProviderOrder,
  deleteProviderOrder,
} from '../controllers/providerOrders.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getProviderOrders', auth, getProviderOrders);
router.post('/createProviderOrder', auth, createProviderOrder);
router.get('/getProviderOrder/:id', auth, getProviderOrder);
router.put('/updateProviderOrder/:id', auth, updateProviderOrder);
router.delete('/deleteProviderOrder/:id', auth, deleteProviderOrder);

export default router;
