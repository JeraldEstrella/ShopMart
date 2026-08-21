import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

export interface UserRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export async function RequireAuth(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies['accessToken'];

    // No token
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    // Validate token
    const { data, error } = await supabaseAdmin.auth.getClaims(token);

    if (error || !data) {
      return res.status(401).json({
        message: 'Invalid Token',
      });
    }

    req.user = {
      id: data.claims.sub,
      email: data.claims.email as string,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
