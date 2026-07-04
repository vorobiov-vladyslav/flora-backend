import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Bouquet = sequelize.define("bouquet", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  photoURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image2x: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
