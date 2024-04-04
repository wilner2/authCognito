import { MockProxy, mock } from "jest-mock-extended";
import { CreateUser } from "@/domain/services/createUser";
import { GWCreateUser } from "../contracts/gwCreateUser";

describe("CreateUser Service", () => {
  let sut: CreateUser;
  let gwCreateUserStub: MockProxy<GWCreateUser>;

  beforeAll(() => {
    gwCreateUserStub = mock<GWCreateUser>();
    gwCreateUserStub.create.mockResolvedValue({
      userID: "any_userID",
    });
  });
  beforeEach(() => {
    sut = new CreateUser(gwCreateUserStub);
  });

  test("should return user created", async () => {
    const user = await sut.execute({
      email: "test@example.com",
      password: "any_password",
    });
    expect(user).toEqual({ userID: "any_userID" });
  });
});
