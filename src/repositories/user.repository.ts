import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/user.model";

@injectable()
export class UserRepository implements IUserRepository {
  async create(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    console.log("user", userData);

    return User.create(userData);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }
}
