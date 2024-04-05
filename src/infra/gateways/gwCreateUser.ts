import { GWCreateUser } from "@/domain/contracts/gwCreateUser";
import { User } from "@/domain/entities/user";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export class GwCreateUserCognito implements GWCreateUser {
  async create(
    user: User,
    secret: string,
    ClientId: string,
    region: string
  ): Promise<User> {
    const input = {
      ClientId: ClientId,
      SecretHash: secret,
      Username: user.userName,
      Password: user.password,
      UserAttributes: [
        {
          Name: "email",
          Value: user.email,
        },
      ],
      ValidationData: [],
    };
    const client = new CognitoIdentityProviderClient({ region });
    const command = new SignUpCommand(input);
    await client.send(command);
    return user;
  }
}
