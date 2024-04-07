import { User } from "@/domain/entities/user";
import { GwCreateUserCognito } from "@/infra/gateways/gwCreateUser";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

describe("GWCreateUser", () => {
  let gwCreateUserCognito: GwCreateUserCognito;
  let user: User;
  let secret: string;
  let clientId: string;
  let region: string;

  beforeEach(() => {
    gwCreateUserCognito = new GwCreateUserCognito();
    user = {
      userName: "testUser",
      password: "testPassword",
      email: "test@example.com",
    };
    secret = "testSecret";
    clientId = "testClientId";
    region = "testRegion";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should create a user successfully", async () => {
    const clientMock = {
      send: jest.fn().mockResolvedValueOnce({}),
    };
    const clientSpy = jest
      .spyOn(CognitoIdentityProviderClient.prototype, "send")
      .mockImplementationOnce(() => clientMock);

    const result = await gwCreateUserCognito.create(
      user,
      secret,
      clientId,
      region
    );

    expect(result).toEqual(user);
    expect(clientSpy).toHaveBeenCalledTimes(1);
  });
});
