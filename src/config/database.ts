import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo", "todo_user", "password", {
  host: "127.0.0.1",
  dialect: "postgres",
});

export default sequelize;
