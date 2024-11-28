import express from 'express';
import authenticationToken from '../Auth/vetifyToken.js';
import paginationMiddleware from '../Middleware/Pagination.js';
import Task from '../Models/Task.js';
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

router.get('/', authenticationToken, getAllTask, paginationMiddleware(Task));
router.get(
  '/completeds',
  authenticationToken,
  getTaskCompleteds,
  paginationMiddleware(Task)
);
router.get(
  '/importants',
  authenticationToken,
  getTaskImportants,
  paginationMiddleware(Task)
);
router.get(
  '/incompletes',
  authenticationToken,
  getTaskIncompletes,
  paginationMiddleware(Task)
);
router.get('/:id', authenticationToken, getTask);
router.post('/', authenticationToken, createTask);
router.put('/:id', authenticationToken, updateTask);
router.delete('/:id', authenticationToken, deleteTask);
export default router;
