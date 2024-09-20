import { injectable, inject } from "inversify";
import { ITodoService } from "../interfaces/ITodoService";
import { Todo, UrgencyLevel } from "../models/todo.model";
import { ITodoRepository } from "../interfaces/ITodoRepository";

@injectable()
export class TodoService implements ITodoService {
  private todoRepository: ITodoRepository;
  constructor(
    @inject(Symbol.for("ITodoRepository")) todoRepository: ITodoRepository
  ) {
    this.todoRepository = todoRepository;
  }

  async createTodo(
    userId: number,
    title: string,
    description: string,
    status: boolean,
    urgency_level: UrgencyLevel,
    dueDate: Date
  ): Promise<Todo> {
    return await this.todoRepository.create({
      userId,
      title,
      description,
      status,
      urgency_level,
      due_date: dueDate,
    });
  }

  async getTodoById(id: number, userId: number): Promise<Todo | null> {
    return await this.todoRepository.findById(id, userId);
  }

  async findAll(userId: number): Promise<Todo[]> {
    return await this.todoRepository.findAll(userId);
  }

  async getTodos(
    userId: number,
    limit?: number,
    offset?: number,
    filter?: any
  ): Promise<{ todos: Todo[]; filteredCount: number; count: number }> {
    const totalTodos = await this.todoRepository.getTotalCount(userId);
    const filteredTodos = await this.todoRepository.getTodos(
      userId,
      limit,
      offset,
      filter
    );
    return {
      todos: filteredTodos.todos,
      filteredCount: filteredTodos.count,
      count: totalTodos,
    };
  }

  async updateTodo(
    id: number,
    userId: number,
    updates: Partial<Todo>
  ): Promise<Todo | null> {
    const [updatedCount, updatedTodos] = await this.todoRepository.update(
      id,
      userId,
      updates
    );

    if (updatedCount === 0) {
      return null;
    }

    return updatedTodos[0];
  }

  async deleteTodo(id: number, userId: number): Promise<number> {
    return await this.todoRepository.delete(id, userId);
  }
}
