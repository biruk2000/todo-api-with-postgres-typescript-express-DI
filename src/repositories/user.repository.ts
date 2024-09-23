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
    return User.create(userData);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async getUserById(userId: number): Promise<User | null> {
    return User.findByPk(userId);
  }

  async updateProfilePicture(
    userId: number,
    imageUrl: string,
    publicId: string
  ): Promise<User | null> {
    const user = await User.findByPk(userId);
    if (!user) {
      return null;
    }
    user.profilePictureUrl = imageUrl;
    user.profilePicturePublicId = publicId;
    console.log("user", user);
    await user.save();
    return user;
  }
}
