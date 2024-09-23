import { User } from "../models/user.model";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
  getUserById(userId: number): Promise<User | null>;
  updateProfilePicture(
    userId: number,
    imageUrl: string,
    publicId: string
  ): Promise<User | null>;
}
