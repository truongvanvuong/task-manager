import express from 'express';
import authenticationToken from '../Auth/vetifyToken.js';
import {
  createTask,
  getTask,
  getTaskImportants,
  getTaskCompleteds,
  getTaskIncompletes,
  getAllTask,
  updateTask,
  deleteTask,
} from '../Controllers/TaskController.js';

const router = express.Router();

router.get('/', authenticationToken, getAllTask);
router.get('/completeds', authenticationToken, getTaskCompleteds);
router.get('/importants', authenticationToken, getTaskImportants);
router.get('/incompletes', authenticationToken, getTaskIncompletes);
router.get('/:id', authenticationToken, getTask);
router.post('/', authenticationToken, createTask);
router.put('/:id', authenticationToken, updateTask);
router.delete('/:id', authenticationToken, deleteTask);
export default router;
