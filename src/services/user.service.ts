import { injectable, inject } from "inversify";
import { IUserService } from "../interfaces/IUserService";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(
    @inject(Symbol.for("IUserRepository")) userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    } as User);
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { token, user };
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateProfilePicture(
    userId: number,
    imageUrl: string,
    publicId: string
  ): Promise<User> {
    // console.log("userId", userId, "imageUrl", imageUrl);
    const updatedUser = await this.userRepository.updateProfilePicture(
      userId,
      imageUrl,
      publicId
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  }
}
