import { Router } from 'express';
import {
  getMenu,
  createMenuElement,
  getMenuElement,
  updateMenuElement,
  deleteMenuElement,
} from '../controllers/menu.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getMenu', getMenu);
router.post('/createMenuElement', auth, createMenuElement);
router.get('/getMenuElement/:id', getMenuElement);
router.put('/updateMenuElement/:id', auth, updateMenuElement);
router.delete('/deleteMenuElement/:id', auth, deleteMenuElement);

export default router;
