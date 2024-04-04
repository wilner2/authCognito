import { User } from "../entities/user";

export interface GWCreateUser {
  create(user: User, secret: string): Promise<{ userID: string }>;
}
