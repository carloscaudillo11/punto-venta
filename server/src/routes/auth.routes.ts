import { Router } from 'express';
import { signin, createUser } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/createUser', createUser);
router.post('/signin', signin);

export default router;
