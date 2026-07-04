import { Sequelize } from "sequelize";

const useSSL = process.env.DB_SSL === "true";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: useSSL ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  logging: false,
});

export const connectDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Database connection successful");
};
