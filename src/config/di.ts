import { Container } from "inversify";
import { UserService } from "../services/user.service";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { TodoRepository } from "../repositories/todo.repository";
import { ITodoService } from "../interfaces/ITodoService";
import { TodoService } from "../services/todo.service";

const container = new Container();
// container.bind<IUserService>(UserService).toSelf();
// container.bind<IUserRepository>(UserRepository).toSelf();

container
  .bind<IUserRepository>(Symbol.for("IUserRepository"))
  .to(UserRepository);
container.bind<IUserService>(Symbol.for("IUserService")).to(UserService);

container
  .bind<ITodoRepository>(Symbol.for("ITodoRepository"))
  .to(TodoRepository);

container.bind<ITodoService>(Symbol.for("ITodoService")).to(TodoService);

export { container };
