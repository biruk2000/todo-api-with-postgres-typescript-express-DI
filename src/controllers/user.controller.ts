import { Request, Response } from "express";
import { container } from "../config/di";
import { IUserService } from "../interfaces/IUserService";
import cloudinary from "../config/cloudinary";

const userService = container.get<IUserService>(Symbol.for("IUserService"));
export const register = async (req: Request, res: Response) => {
  try {
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

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!req.file) {
      res.status(400).json({ message: "Profile picture is required" });
    }
    const currentUser = await userService.getUserById(userId);
    const oldProfilePictureId = currentUser?.profilePicturePublicId;
    // upload file to cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "profile-pictures",
        resource_type: "image",
        // public_id: `${userId}`,
      },
      async (error: any, result: any) => {
        if (error || !result) {
          return res
            .status(500)
            .json({ message: "Failed to upload profile picture", error });
        }

        // delete old profile picture from cloudinary
        if (oldProfilePictureId) {
          await cloudinary.uploader.destroy(oldProfilePictureId);
        }

        console.log("result", result.public_id);
        // update profile picture in the database
        const updatedUser = await userService.updateProfilePicture(
          userId,
          result.secure_url,
          result.public_id
        );
        res.status(200).json({
          user: updatedUser,
          message: "Profile picture updated successfully",
        });
      }
    );
    // pip the buffer to cloudinary uploader
    if (req.file?.buffer) {
      const { Readable } = require("stream");
      const readableStream = new Readable();
      readableStream.push(req.file.buffer);
      readableStream.push(null);
      readableStream.pipe(result);
    } else {
      res.status(400).json({ message: "Invalid file data" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
