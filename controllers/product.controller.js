const productEntity = require('../entities/product.entity');
const productModel = require('../models/product.model');

const productController = () => {};

productController.getAll = (_, result) =>
  productModel.all([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

productController.getById

module.exports = productController;
