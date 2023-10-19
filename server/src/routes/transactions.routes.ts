import { Router } from 'express';
import {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactions.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getTransactions', auth, getTransactions);
router.post('/createTransaction', auth, createTransaction);
router.get('/getTransaction/:id', auth, getTransaction);
router.put('/updateTransaction/:id', auth, updateTransaction);
router.delete('/deleteTransaction/:id', auth, deleteTransaction);

export default router;
