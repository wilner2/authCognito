import { Encrypt } from "@/domain/contracts/crypto";
import { GWCreateUser } from "@/domain/contracts/gwCreateUser";

export class CreateUser implements GWCreateUser {
  constructor(private crypto: Encrypt) {}
  async create(dataCreateUser: {
    email: string;
    password: string;
    userName: string;
  }): Promise<{ userID: string }> {}
}
