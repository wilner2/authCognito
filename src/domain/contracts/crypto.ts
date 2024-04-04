import { BinaryToTextEncoding, Hmac } from "crypto";

export interface Encrypt {
  createHmac(algorithm: string, key: string): Hmac;
  updateHasher(data: string, hmac: Hmac): Hmac;
  digest(encode: BinaryToTextEncoding, hmac: Hmac): string;
}
