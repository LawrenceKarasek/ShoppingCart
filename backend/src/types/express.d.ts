import { User } from '../modules/database/entities/user.entity'; 

declare global {
  namespace Express {
    export interface Request {
      user?: User; // Add the user property to the Request type
    }
  }
}