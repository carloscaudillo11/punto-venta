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

router.get('/menu', auth, getMenu);
router.post('/menu', auth, createMenuElement);
router.get('/menu/:id', auth, getMenuElement);
router.put('/menu/:id', auth, updateMenuElement);
router.delete('/menu/:id', auth, deleteMenuElement);

export default router;
