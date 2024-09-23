import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public profilePictureUrl!: string | null;
  public profilePicturePublicId!: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicturePublicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "User",
    sequelize: sequelize,
  }
);

export default User;
