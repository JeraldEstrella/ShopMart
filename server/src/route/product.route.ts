import { Router } from 'express';
import { getallProduct, getProduct } from '../controller/product.controller';

const productRouter = Router();

productRouter.get('/products', getallProduct);
productRouter.get('/products/:id', getProduct);

export default productRouter;
