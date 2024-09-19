import express from "express"; // Use ES module import syntax
import { register, login } from "../controllers/user.controller"; // Correct path without .ts

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router; // Use ES module export
