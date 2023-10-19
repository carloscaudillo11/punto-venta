import { Router } from 'express';
import {
  createProvider,
  deleteProvider,
  getProviders,
  getProvider,
  updateProvider,
} from '../controllers/providers.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getProviders', auth, getProviders);
router.post('/createProvider', auth, createProvider);
router.get('/getProvider/:id', auth, getProvider);
router.put('/updateProvider/:id', auth, updateProvider);
router.delete('/deleteProvider/:id', auth, deleteProvider);

export default router;
