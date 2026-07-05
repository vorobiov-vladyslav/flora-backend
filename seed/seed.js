import "dotenv/config";
import { readFile } from "node:fs/promises";
import { sequelize, connectDB } from "../db/sequelize.js";
import { Bouquet, Feedback } from "../models/index.js";

const loadJson = async (file) => JSON.parse(await readFile(new URL(file, import.meta.url)));

const seed = async () => {
  try {
    await connectDB();
    const bouquets = await loadJson("./bouquets.seed.json");
    const feedbacks = await loadJson("./feedbacks.seed.json");

    await Bouquet.sync({ force: true });
    await Bouquet.bulkCreate(bouquets);
    await Feedback.sync({ force: true });
    await Feedback.bulkCreate(feedbacks);

    console.log(`Seeded ${bouquets.length} bouquets and ${feedbacks.length} feedbacks`);
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
