// models/Habit.js
import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Habit = sequelize.define("Habit", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
  },
  microStep: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.DATE,
  },
});

export default Habit;