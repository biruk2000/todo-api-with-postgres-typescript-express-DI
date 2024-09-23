import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";

export enum UrgencyLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: boolean;
  public urgency_level!: UrgencyLevel;
  public due_date!: Date;
  public userId!: number;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    urgency_level: {
      type: DataTypes.ENUM(
        UrgencyLevel.LOW,
        UrgencyLevel.MEDIUM,
        UrgencyLevel.HIGH
      ),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);

Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});
User.hasMany(Todo, { foreignKey: "userId" });

export default Todo;
