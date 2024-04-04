import { Authentication } from "../contracts/authentication";
import { GWCreateUser } from "../contracts/gwCreateUser";

export class CreateUser implements Authentication {
  constructor(private gwCreateUser: GWCreateUser) {}

  async execute(dataCreateUser: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.gwCreateUser.create(dataCreateUser);
    return user;
  }
}
