const orderModel = require("../models/order.model");
const orderSchema = require("../schemas/order.schema");

const orderController = () => {};

orderController.getAll = async (req, res) => {
  const params = {
    count: parseInt(req.params.count) & -1,
    page: parseInt(req.params.page) | 0,
  };
  if (params.page < 0) params.page = 0;
  const { response, error } = await orderModel.all(params);
  if (error) res.status(500).send(error);
  else if (response.n_orders == 0) res.status(204).send();
  else res.status(200).send(response);
};

orderController.getById = (req, res) => {
  const order = req.params;
  const validation = orderSchema.id.validate(order);
  if (validation)
    orderModel.find(order, (error, rows) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send(rows[0]),
    );
  else res.status(500).send({ message: validation.error.details });
};

orderController.getDetail = (req, res) => {
  const order = req.params;
  const validation = orderSchema.id.validate(order);
  if (validation)
    orderModel.find(order, (error, rows) => {
      if (error) res.status(500).send({ message: error });
      orderModel.detail(order, (error, products) => {
        if (error) res.status(500).send({ message: error });
        res.status(200).send({ ...rows[0], products });
      });
    });
  else res.status(500).send({ message: validation.error.details });
};

orderController.getByStatus = (req, res) => {
  const order = req.params;
  const validation = orderSchema.o_status.validate(order);
  if (validation)
    orderModel.findByName(order, (error, rows) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send(rows),
    );
  else res.status(500).send({ message: validation.error.details });
};

orderController.getByDate = async (req, res) => {
  const order = req.params;
  const validation = orderSchema.o_date.validate(order);
  if (validation) {
    const params = {
      o_date: order.o_date,
      count: parseInt(req.params.count) & -1,
      page: parseInt(req.params.page) | 0,
    };
    if (params.page < 0) params.page = 0;
    const { response, error } = await orderModel.findByDate(params);
    if (error) res.status(500).send(error);
    else if (response.n_orders == 0) res.status(204).send();
    else res.status(200).send(response);
  } else res.status(500).send({ message: validation.error.details });
};

orderController.add = (req, res) => {
  const order = req.body;
  const validation = orderSchema.create.validate(order);
  if (validation)
    orderModel.add(order, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: "Order added" }),
    );
  else res.status(500).send({ message: validation.error.details });
};

orderController.update = (req, res) => {
  const order = req.body.order;
  const validation = orderSchema.update.validate(order);
  if (validation)
    orderModel.update(order, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: "Order modified" }),
    );
  else res.status(500).send({ message: validation.error.details });
};

orderController.delete = (req, res) => {
  const order = { id_order: req.params.id };
  const validation = orderSchema.id.validate(order);
  if (validation)
    orderModel.delete(order, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: "Order deleted" }),
    );
  else res.status(500).send({ message: validation.error.details });
};

module.exports = orderController;
