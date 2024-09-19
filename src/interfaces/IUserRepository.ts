import { User } from "../models/user.model";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
}
