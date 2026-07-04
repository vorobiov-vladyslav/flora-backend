import { readFile } from "node:fs/promises";
import { Bouquet } from "../models/index.js";

export const seedIfEmpty = async () => {
  const count = await Bouquet.count();
  if (count > 0) {
    return;
  }
  const raw = await readFile(new URL("./bouquets.seed.json", import.meta.url));
  const bouquets = JSON.parse(raw);
  await Bouquet.bulkCreate(bouquets);
  console.log(`Seeded ${bouquets.length} initial bouquets`);
};
