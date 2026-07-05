import Joi from "joi";

export const feedbackCreateSchema = Joi.object({
  text: Joi.string().required().messages({
    "any.required": "missing required field 'text'",
    "string.empty": "field 'text' cannot be empty",
  }),
  author: Joi.string().required().messages({
    "any.required": "missing required field 'author'",
    "string.empty": "field 'author' cannot be empty",
  }),
});

export const feedbackUpdateSchema = Joi.object({
  text: Joi.string(),
  author: Joi.string(),
}).min(1);
