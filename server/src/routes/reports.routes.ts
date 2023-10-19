import { Router } from 'express';
import { Bill } from '../controllers/reports.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/bills', auth, Bill);

export default router;
