const Joi = require('joi');
const orderSchema = () => {};

orderSchema.create = Joi.object({
  products: Joi.array().items(Joi.number().integer()),
});

orderSchema.update = Joi.object({
  id_order: Joi.number()
    .integer()
    .required(),
  o_status: Joi.string()
    .alphanum()
    .min(1)
    .max(1),
  o_date: Joi.date(),
  o_total: Joi.number()
    .min(0.0),
});

orderSchema.id = Joi.number().integer().required();
orderSchema.status = Joi.string().alphanum().min(1).max(1).required();
orderSchema.date = Joi.date().required();
orderSchema.total = Joi.number().min(0.0).required();

module.exports = orderSchema;
