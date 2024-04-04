import { Authentication } from "../contracts/authentication";
import { Encrypt } from "../contracts/crypto";
import { GWCreateUser } from "../contracts/gwCreateUser";
import { User } from "../entities/user";

export class CreateUser implements Authentication {
  constructor(private gwCreateUser: GWCreateUser, private crypto: Encrypt) {}

  async execute(dataCreateUser: {
    email: string;
    password: string;
    userName: string;
  }): Promise<any> {
    const user = User.create({
      email: dataCreateUser.email,
      userName: dataCreateUser.userName,
      password: dataCreateUser.password,
    });

    this.crypto.createHmac("sha256", process.env.Secret);
    this.crypto.updateHasher(`${user.userName}${process.env.ClientId}`);
    this.crypto.digest("base64");
    return user;
  }
}
