import { Encrypt } from "@/domain/contracts/crypto";
import { CreateUser } from "@/infra/gateways/gwCreateUser";
import { MockProxy, mock } from "jest-mock-extended";

describe("GWCreateUser", () => {
  let sut: CreateUser;
  let encryptStub: MockProxy<Encrypt>;
  const dataCreateUser = {
    email: "any_email@example.com",
    password: "any_email",
  };

  beforeAll(() => {
    encryptStub = mock<Encrypt>();
    encryptStub.createHmac.mockReturnValue("any_hash");
    sut = new CreateUser(encryptStub);
    process.env = { Secret: "any_secret" };
  });
  test("should call createHmac", () => {
    sut.create(dataCreateUser);

    expect(encryptStub.createHmac).toHaveBeenCalledTimes(1);
    expect(encryptStub.createHmac).toHaveBeenCalledWith(
      "256",
      process.env.Secret
    );
  });
});
