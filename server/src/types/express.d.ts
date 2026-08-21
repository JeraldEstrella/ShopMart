import { UserType } from '../interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        storeId?: string;
        email: string;
        role?: string;
      };
    }
  }
}
