import { injectable } from "inversify";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { Todo } from "../models/todo.model";
import { convertFilterOperators } from "../utils/filterConverter";
@injectable()
export class TodoRepository implements ITodoRepository {
  async create(todo: Partial<Todo>): Promise<Todo> {
    return await Todo.create(todo);
  }

  async findById(id: number, userId: number): Promise<Todo | null> {
    return await Todo.findOne({ where: { id, userId } });
  }

  async findAll(userId: number): Promise<Todo[]> {
    return await Todo.findAll({ where: { userId } });
  }

  async getTotalCount(userId: number): Promise<number> {
    return await Todo.count({ where: { userId } });
  }

  async getTodos(
    userId: number,
    limit?: number,
    offset?: number,
    filter?: any
  ): Promise<{ todos: Todo[]; count: number }> {
    const todos = await Todo.findAndCountAll({
      where: { userId, ...(filter && convertFilterOperators(filter)) },
      limit,
      offset,
      order: [["due_date", "ASC"]],
    });
    return { todos: todos.rows, count: todos.count };
  }

  async update(
    id: number,
    userId: number,
    updates: Partial<Todo>
  ): Promise<[number, Todo[]]> {
    return await Todo.update(updates, {
      where: { id, userId },
      returning: true,
    });
  }

  async delete(id: number, userId: number): Promise<number> {
    return await Todo.destroy({ where: { id, userId } });
  }
}
