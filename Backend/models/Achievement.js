import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Achievement = sequelize.define("Achievement", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
}, {
  tableName: "achievements",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default Achievement;