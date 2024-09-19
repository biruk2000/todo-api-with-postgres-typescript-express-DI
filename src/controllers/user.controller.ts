import { Request, Response } from "express";
import { container } from "../config/di";
import { IUserService } from "../interfaces/IUserService";

const userService = container.get<IUserService>(Symbol.for("IUserService"));
export const register = async (req: Request, res: Response) => {
  try {
    console.log("req body", req.body);
    const { username, email, password } = req.body;
    const user = await userService.register(username, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
