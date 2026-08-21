import { Request, Response } from 'express';
import { APIResponse, APIError } from '../types/types';
import type {
  CreateProductData,
  UpdateFormProductData,
  UpdateProductData,
} from '../types/product.types';
import type { NewProduct } from '../types/product.types';
import { createProduct, updateProduct } from '../services/Store.services';
import { generateSku } from '../utils/generateSku';

export async function addProductController(
  req: Request<{}, {}, CreateProductData>,
  res: Response<APIResponse<NewProduct> | APIError>
) {
  try {
    const {
      categoryid,
      name,
      description,
      price,
      discount,
      status,
      stock,
      variants,
    } = req.body;

    // Store ID should come from authenticated user
    const storeid = req.user?.storeId;

    if (!name || !categoryid) {
      return res.status(400).json({
        message: 'Name and category are required',
      });
    }

    if (!storeid) {
      return res.status(403).json({
        message: 'Store not found',
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: 'Price cannot be negative',
      });
    }

    if (discount !== undefined && discount !== null && discount < 0) {
      return res.status(400).json({
        message: 'Discount cannot be negative',
      });
    }

    const images = req.files as Express.Multer.File[];

    if (!images || images.length === 0) {
      return res.status(400).json({
        message: 'At least one image is required',
      });
    }

    const sku = generateSku(name);

    const data: CreateProductData = {
      storeid,
      categoryid,
      name,
      description,
      sku,
      price,
      discount,
      status,
      stock,
      images,
      variants,
    };

    // Service returns the newly created product
    const product = await createProduct(data);

    // Send that product directly to frontend
    return res.status(201).json({
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
}

export async function updateProductController(
  req: Request<{ productId: string; storeId: string }, {}, CreateProductData>,
  res: Response<APIResponse<UpdateProductData> | APIError>
) {
  try {
    const { productId, storeId } = req.params;

    const {
      categoryid,
      name,
      description,
      price,
      discount,
      status,
      stock,
      variants,
    } = req.body;

    if (!productId || !storeId) {
      return res.status(400).json({
        message: 'Unauthorized request',
      });
    }

    if (!name || !categoryid) {
      return res.status(400).json({
        message: 'Name and category are required',
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: 'Price cannot be negative',
      });
    }

    if (discount !== undefined && discount !== null && discount < 0) {
      return res.status(400).json({
        message: 'Discount cannot be negative',
      });
    }

    const data: UpdateFormProductData = {
      categoryid,
      name,
      description,
      sku: generateSku(name),
      price,
      discount,
      status,
      stock,
      variants,
    };

    const updatedProduct = await updateProduct(productId, storeId, data);

    return res.status(201).json({
      data: updatedProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
}
