import { Router } from 'express';
import { Bill } from '../controllers/reports.controller';

const router: Router = Router();

router.get('/bills', Bill);

export default router;
