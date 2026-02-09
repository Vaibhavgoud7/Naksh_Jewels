import express from 'express';
import { listProducts, singleProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;