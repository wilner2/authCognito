import { Encrypt } from "@/domain/contracts/crypto";
import { GWCreateUser } from "@/domain/contracts/gwCreateUser";

export class CreateUser implements GWCreateUser {
  constructor(private crypto: Encrypt) {}
  async create(dataCreateUser: {
    email: string;
    password: string;
    userName: string;
  }): Promise<{ userID: string }> {
    this.crypto.createHmac("sha256", process.env.Secret);
    this.crypto.updateHasher(
      `${dataCreateUser.userName}${process.env.ClientId}`
    );

    return;
  }
}
