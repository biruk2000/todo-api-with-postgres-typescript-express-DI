export interface IUserService {
  register(username: string, email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
}
