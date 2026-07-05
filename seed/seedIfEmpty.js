import { readFile } from "node:fs/promises";
import { Bouquet, Feedback } from "../models/index.js";

const seedModel = async (model, file, label) => {
  const count = await model.count();
  if (count > 0) {
    return;
  }
  const raw = await readFile(new URL(file, import.meta.url));
  const records = JSON.parse(raw);
  await model.bulkCreate(records);
  console.log(`Seeded ${records.length} ${label}`);
};

export const seedIfEmpty = async () => {
  await seedModel(Bouquet, "./bouquets.seed.json", "bouquets");
  await seedModel(Feedback, "./feedbacks.seed.json", "feedbacks");
};
