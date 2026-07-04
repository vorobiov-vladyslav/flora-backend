import { Bouquet } from "../models/index.js";

export const listBouquets = ({ page, limit, category, favorite } = {}) => {
  const where = {};
  if (category && category !== "all") {
    where.category = category;
  }
  if (favorite !== undefined) {
    where.favorite = favorite === "true" || favorite === true;
  }

  const options = { where, order: [["createdAt", "ASC"]] };
  const parsedLimit = Number(limit);
  const parsedPage = Number(page);
  if (parsedLimit > 0 && parsedPage > 0) {
    options.limit = parsedLimit;
    options.offset = (parsedPage - 1) * parsedLimit;
  }

  return Bouquet.findAll(options);
};

export const getBouquetById = (id) => Bouquet.findByPk(id);

export const createBouquet = (data) => Bouquet.create(data);

export const updateBouquet = async (id, data) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    return null;
  }
  return bouquet.update(data);
};

export const removeBouquet = async (id) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    return null;
  }
  await bouquet.destroy();
  return bouquet;
};

export const updateFavorite = async (id, favorite) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    return null;
  }
  return bouquet.update({ favorite });
};

export const updatePhoto = async (id, photoURL) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) {
    return null;
  }
  return bouquet.update({ photoURL });
};
