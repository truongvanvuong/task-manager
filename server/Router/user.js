import express from 'express';
import authenticationToken from '../Auth/vetifyToken.js';

import {
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  changPassword,
} from '../Controllers/userController.js';

const router = express.Router();

router.put('/change-password', authenticationToken, changPassword);
router.put('/:id', authenticationToken, updateUser);
router.delete('/:id', authenticationToken, deleteUser);
router.get('/:id', authenticationToken, getUser);
router.get('/profile/me', authenticationToken, getUserProfile);
export default router;
