import { Router } from 'express';
import {
  createTransaction,
  getTransaction,
  getTransactions,
} from '../controllers/transactions.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getTransactions', auth, getTransactions);
router.post('/createTransaction', auth, createTransaction);
router.get('/getTransaction/:id', auth, getTransaction);

export default router;
