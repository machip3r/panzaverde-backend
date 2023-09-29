const Joi = require('joi');
const productSchema = () => {};

productSchema.create = Joi.object({
  p_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  p_price: Joi.number()
    .min(0.0)
    .required(),
  p_stock: Joi.number()
    .integer()
    .min(0)
    .required(),
  p_unit: Joi.number()
    .min(0)
    .required(),
});

productSchema.update = Joi.object({
  id_product: Joi.number()
    .integer()
    .required(),
  p_name: Joi.string()
    .alphanum()
    .min(3),
  p_price: Joi.number()
    .min(0.0),
  p_stock: Joi.number()
    .integer()
    .min(0),
  p_unit: Joi.number()
    .min(0),
});

productSchema.id = Joi.number().integer().required();
productSchema.name = Joi.string().alphanum().min(3).required();
productSchema.price = Joi.number().min(0.0).required();
productSchema.stock = Joi.number().min(0).required();
productSchema.unit = Joi.number().min(0).required();

module.exports = productSchema;
