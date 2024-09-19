import { Todo, UrgencyLevel } from "../models/todo.model";

export interface ITodoService {
  createTodo(
    userId: number,
    title: string,
    description: string,
    status: boolean,
    urgency_level: UrgencyLevel,
    dueDate: Date
  ): Promise<Todo>;
  getTodoById(id: number, userId: number): Promise<Todo | null>;
  getTodos(userId: number): Promise<Todo[]>;
  updateTodo(
    id: number,
    userId: number,
    updates: Partial<Todo>
  ): Promise<Todo | null>;
  deleteTodo(id: number, userId: number): Promise<number>;
}
