import { User } from "../entities/user";

export interface GWCreateUser {
  create(
    user: User,
    secret: string,
    ClientId: string,
    region: string
  ): Promise<User>;
}
