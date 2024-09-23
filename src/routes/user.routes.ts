import express from "express"; // Use ES module import syntax
import {
  register,
  login,
  uploadProfilePicture,
} from "../controllers/user.controller"; // Correct path without .ts
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("profilePicture"),
  uploadProfilePicture
);

export default router; // Use ES module export
