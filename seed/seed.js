import "dotenv/config";
import { readFile } from "node:fs/promises";
import { sequelize, connectDB } from "../db/sequelize.js";
import { Bouquet } from "../models/index.js";

const seed = async () => {
  try {
    await connectDB();
    const raw = await readFile(new URL("./bouquets.seed.json", import.meta.url));
    const bouquets = JSON.parse(raw);

    await Bouquet.sync({ force: true });
    await Bouquet.bulkCreate(bouquets);

    console.log(`Seeded ${bouquets.length} bouquets`);
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
