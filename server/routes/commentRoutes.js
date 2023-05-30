import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentByUserId,
  updateComment,
} from '../controllers/commentController.js';
import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';

const commentRouter = Router();

commentRouter.get('/:id', getCommentById);
commentRouter.post('/', sessionMiddleware, createComment);
commentRouter.put('/:id', sessionMiddleware, updateComment);
commentRouter.delete('/:id', sessionMiddleware, deleteComment);
commentRouter.get('/user/:userId', getCommentByUserId);

export default commentRouter;
