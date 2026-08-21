import { Router } from 'express';
import {
  getCurrentUser,
  updateUserProfile,
} from '../controller/user.controller';

const userRouter = Router();

// /api/users/me
userRouter.get('/me:id', getCurrentUser);
// /api/users/me
userRouter.patch('/me:id', updateUserProfile);

export default userRouter;
