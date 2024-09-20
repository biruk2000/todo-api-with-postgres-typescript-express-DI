import { Todo } from "../models/todo.model";
export interface ITodoRepository {
  create(todo: Partial<Todo>): Promise<Todo>;
  findById(id: number, userId: number): Promise<Todo | null>;
  findAll(userId: number): Promise<Todo[]>;
  getTotalCount(userId: number): Promise<number>;
  getTodos(
    userId: number,
    limit?: number,
    offset?: number,
    filter?: any
  ): Promise<{ todos: Todo[]; count: number }>;
  update(
    id: number,
    userId: number,
    updates: Partial<Todo>
  ): Promise<[number, Todo[]]>;
  delete(id: number, userId: number): Promise<number>;
}
