const Joi = require("joi");
const orderSchema = () => {};

orderSchema.create = Joi.object({
  products: Joi.array().items(Joi.number().integer()),
});

orderSchema.update = Joi.object({
  id_order: Joi.number().integer().required(),
  o_status: Joi.string().alphanum().min(1).max(1),
  o_date: Joi.date(),
  o_total: Joi.number().min(0.0),
});

orderSchema.o_status = Joi.object({
  o_status: Joi.string().alphanum().min(1).max(1).required(),
  offset: Joi.number().integer(),
  count: Joi.number().integer(),
});

orderSchema.o_date = Joi.object({
  o_date: Joi.date().required(),
  offset: Joi.number().integer(),
  count: Joi.number().integer(),
});

orderSchema.pagination = Joi.object({
  offset: Joi.number().integer(),
  count: Joi.number().integer(),
});

orderSchema.id = Joi.number().integer().required();
orderSchema.total = Joi.number().min(0.0).required();

module.exports = orderSchema;
