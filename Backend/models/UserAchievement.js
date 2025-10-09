import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const UserAchievement = sequelize.define(
  "UserAchievement",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    achievement_id: { type: DataTypes.INTEGER, allowNull: false },
    achieved_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_achievements",
    timestamps: false,
  }
);

export default UserAchievement;