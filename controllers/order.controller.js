const orderModel = require('../models/order.model');
const orderSchema = require('../schemas/order.schema');

const orderController = () => {};

orderController.getAll = (_, res) => {
  orderModel.all(_, (error, rows) =>
    error
      ? res.status(500).send({ message: error })
      : res.status(200).send(rows)
  );
}

orderController.getById = (req, res) => {
  const order = { id_order: req.params.id };
  const validation = orderSchema.id.validate(order);
  if (validation)
    orderModel.find(order, (error, rows) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send(rows)
    );
  else res.status(500).send({ message: validation.error.details });
}

orderController.getDetail = (req, res) => {
  const order = { id_order: req.params.id }
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
}

orderController.getByStatus = (req, res) => {
  const order = { o_status: req.params.o_status };
  const validation = orderSchema.name.validate(order);
  if (validation)
    orderModel.findByName(order, (error, rows) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send(rows)
    );
  else res.status(500).send({ message: validation.error.details });
}

orderController.add = (req, res) => {
  const order = req.body;
  const validation = orderSchema.create.validate(order);
  if (validation) {
    const error = orderModel.add(order);
    (error)
      ? res.status(500).send({ message: error })
      : res.status(200).send({ message: 'Order added' });
  }
  else res.status(500).send({ message: validation.error.details });
}

orderController.update = (req, res) => {
  const order = req.body.order;
  const validation = orderSchema.update.validate(order);
  if (validation)
    orderModel.update(order, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Order modified' })
    );
  else res.status(500).send({ message: validation.error.details });
}

orderController.delete = (req, res) => {
  const order = { id_order: req.params.id };
  const validation = orderSchema.id.validate(order);
  if (validation)
    orderModel.delete(order, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Order deleted' })
    );
  else res.status(500).send({ message: validation.error.details });
}

module.exports = orderController;
