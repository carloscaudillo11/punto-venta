import { Router } from 'express';
import {
  createTransaction,
  getTransaction,
  getTransactions,
  getSalesByBox
} from '../controllers/transactions.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getTransactions', auth, getTransactions);
router.post('/createTransaction', auth, createTransaction);
router.get('/getTransaction/:id', auth, getTransaction);
router.get('/getSalesByBox/:id', auth, getSalesByBox);

export default router;
