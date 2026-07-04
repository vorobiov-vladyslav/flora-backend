import Joi from "joi";

export const orderCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required field 'name'",
    "string.empty": "field 'name' cannot be empty",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required field 'phone'",
    "string.empty": "field 'phone' cannot be empty",
  }),
  address: Joi.string().allow(""),
  message: Joi.string().allow(""),
  product: Joi.string().allow("", null),
  quantity: Joi.number().integer().min(1),
  agree: Joi.boolean(),
});
