import { Authentication } from "../contracts/authentication";
import { GWCreateUser } from "../contracts/gwCreateUser";

export class CreateUser implements Authentication {
  constructor(private gwCreateUser: GWCreateUser) {}

  async execute(dataCreateUser: {
    email: string;
    password: string;
    userName: string;
  }): Promise<any> {
    return await this.gwCreateUser.create(dataCreateUser);
  }
}
