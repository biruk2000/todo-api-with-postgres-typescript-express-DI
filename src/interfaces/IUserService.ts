import { User } from "../models/user.model";
export interface IUserService {
  register(username: string, email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  getUserById(userId: number): Promise<User | null>;
  updateProfilePicture(
    userId: number,
    imageUrl: string,
    publicId: string
  ): Promise<User>;
}
