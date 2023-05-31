import { Router } from 'express';
import {
    getProfileById,
    followUserById,
    unfollowUserById,
    getFollowing,
    getMyProfile,
    updateMyProfile,
    deleteMyProfile,
    getAllUsers
} from '../controllers/userController.js'
import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';

const userRouter = Router();

userRouter.get('/me', sessionMiddleware, getMyProfile);
userRouter.put('/me', sessionMiddleware, updateMyProfile);
userRouter.delete('/me', sessionMiddleware, deleteMyProfile);

userRouter.post('/follow/:id', sessionMiddleware, followUserById);
userRouter.delete('/unfollow/:id', sessionMiddleware, unfollowUserById);

userRouter.get('/all', getAllUsers)
userRouter.get('/profile/:id', getProfileById);
userRouter.get('/:userId/following', getFollowing);

export default userRouter;