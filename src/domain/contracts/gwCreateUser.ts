export interface GWCreateUser {
  create(dataCreateUser: {
    email: string;
    password: string;
  }): Promise<{ userID: string }>;
}
