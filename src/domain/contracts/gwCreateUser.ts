import { User } from "../entities/user";

export interface GWCreateUser {
  create(user: User): Promise<{ userID: string }>;
}
