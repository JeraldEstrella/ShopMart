import { Response, Request } from 'express';
import { APIResponse, APIError } from '../types/types';

interface UserData {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string | undefined;
  gender: string;
  dob: string;
}

export async function getCurrentUser(
  req: Request<{ userId: string }, any, UserData>,
  res: Response<APIResponse<UserData> | APIError>
) {
  try {
    const id = req.params.userId;
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function updateUserProfile(
  req: Request<{}, any, UserData>,
  res: Response<APIResponse<UserData> | APIError>
) {
  try {
    const userId = req.user?.id;
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
}
