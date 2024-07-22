import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../Controllers/userController.js';

const router = express.Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);

export default router;
