import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { RequireAuth } from './middleware/Auth.middleware';
import { RequireMerchant } from './middleware/Role.middleware';

import storeRoute from './route/store.route';
import userRouter from './route/user.route';
import authRouter from './route/auth.route';
import productRouter from './route/product.route';

const PORT = 8080;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// =======================
// PUBLIC
// =======================

app.use('/api/auth', authRouter);

// =======================
// AUTHENTICATED
// =======================

app.use('/api/auth/user', RequireAuth, userRouter);
app.use('/api/products', RequireAuth, productRouter);

// =======================
// MERCHANT
// =======================

app.use('/api/store', RequireAuth, RequireMerchant, storeRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
