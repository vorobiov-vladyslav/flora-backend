import { HttpError } from "../helpers/index.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return next(HttpError(404, "Not found"));
  }
  next();
};
