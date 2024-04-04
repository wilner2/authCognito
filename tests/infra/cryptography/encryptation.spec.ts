import { BinaryToTextEncoding, Hmac, createHmac } from "crypto";
import { Encryptation } from "@/infra/cryptography/encryptation";

describe("Encrypt", () => {
  let sut: Encryptation;
  beforeEach(() => {
    sut = new Encryptation();
  });
  test("should return an instance of Hmac", () => {
    const algorithm = "sha256";
    const key = "secret";

    const result = sut.createHmac(algorithm, key);

    expect(result).toBeInstanceOf(Hmac);
  });
  test("should update hmac", () => {
    const hmac: Hmac = createHmac("sha256", "secret");
    console.log(hmac);

    const result = sut.updateHasher("any_algorithm", hmac);

    expect(result).toBe(hmac);
  });

  test("should return the digest of the Hmac encoded as a string", () => {
    const encode: BinaryToTextEncoding = "hex";
    const hmac: Hmac = createHmac("sha256", "secret");

    const result = sut.digest(encode, hmac);

    expect(typeof result).toBe("string");
  });
});
