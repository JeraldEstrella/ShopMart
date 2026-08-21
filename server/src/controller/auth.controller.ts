import { Request, Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export async function storeToken(req: Request, res: Response) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  const storedToken = req.cookies.accessToken;

  if (token === storedToken) {
    return res.status(200).json({
      message: 'Already Stored',
    });
  }

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 60 * 60 * 1000,
    path: '/',
  });

  return res.status(200).json({
    message: 'Token stored successfully',
  });
}

export async function getStoreId(req: Request, res: Response) {
  
}
