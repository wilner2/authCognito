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
  }): Promise<User> {
    const user = User.create({
      email: dataCreateUser.email,
      userName: dataCreateUser.userName,
      password: dataCreateUser.password,
    });

    const hasher = this.crypto.createHmac("sha256", process.env.Secret);
    const hasherUpdate = this.crypto.updateHasher(
      `${user.userName}${process.env.ClientId}`,
      hasher
    );
    const secretHash = this.crypto.digest("base64", hasherUpdate);
    await this.gwCreateUser.create(
      user,
      secretHash,
      process.env.ClientId,
      process.env.Region
    );
    return user;
  }
}
