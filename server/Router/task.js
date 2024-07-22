import express from 'express';
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

router.get('/', getAllTask);
router.get('/completeds', getTaskCompleteds);
router.get('/importants', getTaskImportants);
router.get('/incompletes', getTaskIncompletes);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
export default router;
