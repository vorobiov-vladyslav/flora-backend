import Joi from "joi";

const categories = ["roses", "mixed", "seasonal", "premium"];

export const bouquetCreateSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "missing required field 'title'",
    "string.empty": "field 'title' cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "missing required field 'description'",
    "string.empty": "field 'description' cannot be empty",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "missing required field 'price'",
    "number.base": "field 'price' must be a number",
  }),
  category: Joi.string().valid(...categories),
  favorite: Joi.boolean(),
  photoURL: Joi.string(),
  image2x: Joi.string(),
  alt: Joi.string(),
});

export const bouquetUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(0),
  category: Joi.string().valid(...categories),
  favorite: Joi.boolean(),
  photoURL: Joi.string(),
  image2x: Joi.string(),
  alt: Joi.string(),
}).min(1);

export const bouquetFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing required field 'favorite'",
  }),
});
