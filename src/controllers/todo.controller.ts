import { Request, Response } from "express";
import { container } from "../config/di";
import { ITodoService } from "../interfaces/ITodoService";

const todoService = container.get<ITodoService>(Symbol.for("ITodoService"));

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, status, urgency_level, due_date } = req.body;
    const userId = (req as any).userId;
    const todo = await todoService.createTodo(
      userId,
      title,
      description,
      status,
      urgency_level,
      due_date
    );
    res.status(201).json(todo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const todos = await todoService.findAll(userId);
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { limit, offset, filter } = req.body;
    const userId = (req as any).userId;
    const todos = await todoService.getTodos(
      userId,
      limit && parseInt(limit),
      offset && parseInt(offset),
      filter
    );
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const todo = await todoService.getTodoById(Number(id), userId);
    res.status(200).json(todo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { updates } = req.body;
    const userId = (req as any).userId;
    const todo = await todoService.updateTodo(Number(id), userId, updates);
    res.status(200).json(todo);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const todo = await todoService.deleteTodo(Number(id), userId);
    if (todo === 0) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
