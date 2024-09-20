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
  findAll(userId: number): Promise<Todo[]>;
  getTodos(
    userId: number,
    limit?: number,
    offset?: number,
    filter?: any
  ): Promise<{ todos: Todo[]; filteredCount: number; count: number }>;
  updateTodo(
    id: number,
    userId: number,
    updates: Partial<Todo>
  ): Promise<Todo | null>;
  deleteTodo(id: number, userId: number): Promise<number>;
}
