export interface GWCreateUser {
  create(data: {
    email: string;
    password: string;
  }): Promise<{ userID: string }>;
}
