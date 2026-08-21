import { Router } from 'express';
import { storeToken } from '../controller/auth.controller';

const authRouter = Router();

authRouter.put('/store', storeToken);

export default authRouter;
