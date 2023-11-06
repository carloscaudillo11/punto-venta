import { Router } from 'express';
import {
  signin,
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from '../controllers/auth.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/getUsers', auth, getUsers);
router.get('/getUser/:id', auth, getUser);
router.put('/updateUser/:id', auth, updateUser);
router.delete('/deleteUser/:id', auth, deleteUser);
router.post('/createUser',auth, createUser);
router.post('/signin', signin);

export default router;
