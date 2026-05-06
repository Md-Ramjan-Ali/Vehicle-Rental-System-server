import { UserRole } from "../modules/users/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
        role: UserRole;
      };
    }
  }
}
