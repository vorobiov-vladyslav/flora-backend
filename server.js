import "dotenv/config";
import app from "./app.js";
import "./models/index.js";
import { connectDB } from "./db/sequelize.js";
import { seedIfEmpty } from "./seed/seedIfEmpty.js";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    await seedIfEmpty();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

start();
