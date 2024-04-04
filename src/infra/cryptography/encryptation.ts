import { Encrypt } from "@/domain/contracts/crypto";
import { BinaryToTextEncoding, createHmac, Hmac } from "crypto";

export class Encryptation implements Encrypt {
  createHmac(algorithm: string, key: string): Hmac {
    return createHmac(algorithm, key);
  }
  updateHasher(data: string, hmac: Hmac): Hmac {
    return hmac.update(data);
  }
  digest(encode: BinaryToTextEncoding, hmac: Hmac): string {
    return hmac.digest(encode).toLocaleString();
  }
}
