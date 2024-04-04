export interface Authentication {
  execute(dataCreateUser: { email: string; password: string }): Promise<any>;
}
