import { Router } from 'express';
import {
  addProductController,
  updateProductController,
} from '../controller/store.controller';
import { upload } from '../middleware/Multer';

const storeRoute = Router();

storeRoute.put('/add-product', upload.array('images', 8), addProductController);
storeRoute.patch(
  '/update-product',
  upload.array('images', 8),
  updateProductController
);

export default storeRoute;
