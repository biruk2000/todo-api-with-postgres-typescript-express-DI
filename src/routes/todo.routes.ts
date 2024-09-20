import express from "express";
import {
  getTodoById,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  findAll,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/", authMiddleware, findAll);
router.get("/todos", authMiddleware, getTodos);
router.get("/:id", authMiddleware, getTodoById);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
