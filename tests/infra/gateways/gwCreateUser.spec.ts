import { GwCreateUserCognito } from "@/infra/gateways/gwCreateUser";

describe("GWCreateUser", () => {
  const dataCreateUser = {
    email: "any_email@example.com",
    password: "any_password",
    userName: "any_userName",
  };

  test("should return created user", () => {
    const sut = new GwCreateUserCognito();
    const result = sut.create(dataCreateUser, "any_secret");

    expect(result).resolves.toEqual(dataCreateUser);
  });
});
