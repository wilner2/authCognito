import { Encrypt } from "@/domain/contracts/crypto";
import { CreateUser } from "@/infra/gateways/gwCreateUser";
import { MockProxy, mock } from "jest-mock-extended";

describe("GWCreateUser", () => {
  let sut: CreateUser;
  let encryptStub: MockProxy<Encrypt>;
  const dataCreateUser = {
    email: "any_email@example.com",
    password: "any_email",
    userName: "any_userName",
  };

  beforeAll(() => {
    encryptStub = mock<Encrypt>();
    encryptStub.createHmac.mockReturnValue("any_hash");
    encryptStub.updateHasher.mockReturnValue("any_updateHasher");
    sut = new CreateUser(encryptStub);
    process.env = { Secret: "any_secret", ClientId: "any_clientId" };
  });

  test("should call createHmac corretly", () => {
    sut.create(dataCreateUser);

    expect(encryptStub.createHmac).toHaveBeenCalledTimes(1);
    expect(encryptStub.createHmac).toHaveBeenCalledWith(
      "sha256",
      process.env.Secret
    );
  });

  test("should call updateHasher corretly", () => {
    sut.create(dataCreateUser);

    expect(encryptStub.updateHasher).toHaveBeenCalledTimes(1);
    expect(encryptStub.updateHasher).toHaveBeenCalledWith(
      `${dataCreateUser.userName}${process.env.ClientId}`
    );
  });
});
