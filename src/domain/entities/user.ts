export class User {
  constructor(
    readonly email: string,
    readonly userName: string,
    readonly password?: string
  ) {}

  static create(dataUser: {
    email: string;
    userName: string;
    password: string;
  }) {
    return new User(dataUser.email, dataUser.userName, dataUser.password);
  }
}
