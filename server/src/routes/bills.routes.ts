import { Router } from 'express';
import { createBill } from '../controllers/bills.controller';

const router: Router = Router();

router.get('/bills', createBill);

export default router;
