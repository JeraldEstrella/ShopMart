import { Response, NextFunction } from 'express';
import { pool } from '../config/pg';
import type { UserRequest } from './Auth.middleware';

export async function RequireMerchant(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    // Already verified as merchant
    if (req.user.role === 'merchant') {
      return next();
    }

    // Role is not available, check database
    const result = await pool.query(
      `
      SELECT role
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const role = result.rows[0].role;

    if (role !== 'merchant') {
      return res.status(403).json({
        message: 'Merchant access required',
      });
    }

    // Store verified role for the rest of this request
    req.user.role = role;

    return next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
