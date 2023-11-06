import { Router } from 'express';
import {
  getBoxesOpen,
  openBox,
  closeBox,
} from '../controllers/boxCon.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getBoxes', auth, getBoxesOpen);
router.post('/openBox', auth, openBox);
router.put('/closeBox', auth, closeBox);

export default router;
