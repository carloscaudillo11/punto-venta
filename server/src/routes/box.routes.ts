import { Router } from 'express';
import {
  createBox,
  deleteBox,
  getBoxes,
  getBox,
  updateBox,
  getBoxClose,
} from '../controllers/box.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getBoxes', auth, getBoxes);
router.post('/createBox', auth, createBox);
router.get('/getBox/:id', auth, getBox);
router.get('/getBoxClose', auth, getBoxClose);
router.put('/updateBox/:id',auth, updateBox);
router.delete('/deleteBox/:id', auth, deleteBox);

export default router;
