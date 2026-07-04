import { rename, unlink } from "node:fs/promises";
import path from "node:path";
import gravatar from "gravatar";
import * as bouquetsService from "../services/bouquets.service.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const photosDir = path.resolve("public", "photos");

const getAll = async (req, res) => {
  const { page, limit, category, favorite } = req.query;
  const bouquets = await bouquetsService.listBouquets({ page, limit, category, favorite });
  res.json(bouquets);
};

const getById = async (req, res) => {
  const bouquet = await bouquetsService.getBouquetById(req.params.id);
  if (!bouquet) {
    throw HttpError(404, "Not found");
  }
  res.json(bouquet);
};

const add = async (req, res) => {
  const data = { ...req.body };
  if (!data.photoURL) {
    data.photoURL = gravatar.url(data.title, { s: "250", d: "identicon", protocol: "https" });
  }
  const bouquet = await bouquetsService.createBouquet(data);
  res.status(201).json(bouquet);
};

const updateById = async (req, res) => {
  const bouquet = await bouquetsService.updateBouquet(req.params.id, req.body);
  if (!bouquet) {
    throw HttpError(404, "Not found");
  }
  res.json(bouquet);
};

const deleteById = async (req, res) => {
  const bouquet = await bouquetsService.removeBouquet(req.params.id);
  if (!bouquet) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Deleted" });
};

const updateFavorite = async (req, res) => {
  const bouquet = await bouquetsService.updateFavorite(req.params.id, req.body.favorite);
  if (!bouquet) {
    throw HttpError(404, "Not found");
  }
  res.json(bouquet);
};

const updatePhoto = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Missing or invalid image file");
  }

  const { id } = req.params;
  const existing = await bouquetsService.getBouquetById(id);
  if (!existing) {
    await unlink(req.file.path);
    throw HttpError(404, "Not found");
  }

  const { filename, path: tempPath } = req.file;
  await rename(tempPath, path.join(photosDir, filename));
  const photoURL = `${req.protocol}://${req.get("host")}/photos/${filename}`;

  await bouquetsService.updatePhoto(id, photoURL);
  res.json({ photoURL });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
  updatePhoto: ctrlWrapper(updatePhoto),
};
