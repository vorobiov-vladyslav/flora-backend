import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Feedback = sequelize.define("feedback", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
