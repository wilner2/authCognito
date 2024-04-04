import { MockProxy, mock } from "jest-mock-extended";
import { CreateUser } from "@/domain/useCases/createUser";
import { GWCreateUser } from "../contracts/gwCreateUser";
import { Encrypt } from "../contracts/crypto";

describe("CreateUser Service", () => {
  let sut: CreateUser;
  let gwCreateUserStub: MockProxy<GWCreateUser>;
  let encryptStub: MockProxy<Encrypt>;
  const dataCreateUser = {
    email: "any_email@example.com",
    password: "any_password",
    userName: "any_userName",
  };

  beforeAll(() => {
    gwCreateUserStub = mock<GWCreateUser>();
    gwCreateUserStub.create.mockResolvedValue({
      userID: "any_userID",
    });
    encryptStub = mock<Encrypt>();
    encryptStub.digest.mockReturnValue("any_secretHash");
    process.env = { Secret: "any_secret", ClientId: "any_clientId" };
  });
  beforeEach(() => {
    sut = new CreateUser(gwCreateUserStub, encryptStub);
  });

  test("should return user created", async () => {
    const user = await sut.execute(dataCreateUser);
    expect(user).toEqual(dataCreateUser);
  });

  test("should call createHmac function corretly", () => {
    sut.execute(dataCreateUser);

    expect(encryptStub.createHmac).toHaveBeenCalledTimes(1);
    expect(encryptStub.createHmac).toHaveBeenCalledWith(
      "sha256",
      process.env.Secret
    );
  });

  test("should call updateHasher function corretly", () => {
    sut.execute(dataCreateUser);

    expect(encryptStub.updateHasher).toHaveBeenCalledTimes(1);
  });

  test("should call digest function corretly", () => {
    sut.execute(dataCreateUser);

    expect(encryptStub.digest).toHaveBeenCalledTimes(1);
  });

  test("should create user on GWCreateUser with corretly params", () => {
    sut.execute(dataCreateUser);

    expect(gwCreateUserStub.create).toHaveBeenCalledTimes(1);
    expect(gwCreateUserStub.create).toHaveBeenCalledWith(
      dataCreateUser,
      "any_secretHash"
    );
  });

  test("should return a user created", async () => {
    const result = await sut.execute(dataCreateUser);

    expect(result).toEqual(dataCreateUser);
  });
});
