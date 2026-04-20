import express from 'express';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  getTaskAnalytics 
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.get('/analytics', protect, getTaskAnalytics);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
