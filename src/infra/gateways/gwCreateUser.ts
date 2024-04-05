import { GWCreateUser } from "@/domain/contracts/gwCreateUser";
import { User } from "@/domain/entities/user";

export class GwCreateUserCognito implements GWCreateUser {
  async create(user: User, secret: string): Promise<User> {
    console.log(secret);

    return Promise.resolve(user).then((user) => user);
  }
}
