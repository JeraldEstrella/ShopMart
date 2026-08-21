import { Response, Request } from 'express';
import { APIResponse, APIError } from '../types/types';
import { Pagination } from '@supabase/supabase-js';

interface productData {
  id: number;
  title: string;
  image: string[];
  price: number;
  discount?: number;
  rating?: number;
  sold?: number;
}

export async function getallProduct(
  req: Request<{}, {}, {}, Pagination>,
  res: Response<APIResponse<productData[]> | APIError>
) {
  try {
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function getProduct(
  req: Request<{ productId: string }>,
  res: Response<APIResponse<productData> | APIError>
) {
  try {
    const id = req.params.productId;
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
}
