const Joi = require("joi");
const productSchema = () => {};

productSchema.add = Joi.object({
  p_name: Joi.string().min(3).max(30).required(),
  p_price: Joi.number().min(0.0).required(),
  p_stock: Joi.number().integer().min(0).required(),
  p_unit: Joi.string().required(),
});

productSchema.update = Joi.object({
  id_product: Joi.number().integer().min(1).required(),
  p_name: Joi.string().min(3).max(30),
  p_price: Joi.number().min(0.0),
  p_stock: Joi.number().integer().min(0),
  p_unit: Joi.string().alphanum(),
});

productSchema.pagination = Joi.object({
  limit: Joi.number().min(1).integer().required(),
  page: Joi.number().min(0).integer().required(),
});

productSchema.namePagination = Joi.object({
  p_name: Joi.string().alphanum().min(3).max(30).required(),
  limit: Joi.number().min(1).integer().required(),
  page: Joi.number().min(0).integer().required(),
});

productSchema.p_name = Joi.string().alphanum().min(3).max(30);
productSchema.addList = Joi.array().items(productSchema.add);
productSchema.id = Joi.number().integer().min(0);
productSchema.price = Joi.number().min(0.0).required();
productSchema.stock = Joi.number().min(0).required();
productSchema.unit = Joi.number().min(0).required();

module.exports = productSchema;
