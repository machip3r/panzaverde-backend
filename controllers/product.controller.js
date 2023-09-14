const productModel = require('../models/product.model');

const productController = () => {};

productController.getAll = (_, res) => {
  productModel.all({}, (error, rows) =>
    error
      ? res.status(500).send({ message: error, si: 'da' })
      : res.status(200).send(rows)
  );
}

productController.getById = (req, res) => {
  productModel.find({ id_product: req.params.id }, (error, rows) =>
    error
      ? res.status(500).send({ message: error })
      : res.status(200).send(rows)
  );
}

productController.getByName = (req, res) => {
  productModel.findByName({ p_name: req.params.p_name }, (error, rows) =>
    error
      ? res.status(500).send({ message: error })
      : res.status(200).send(rows)
  );
}

productController.add = (req, res) => {
  product = req.body.product;
  if (product)
    productModel.add(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Product added' })
    );
  else res.status(500).send({ message: 'Empty Values' });
}

productController.update = (req, res) => {
  product = req.body.product;
  if (product)
    productModel.update(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Product modified' })
    );
  else res.status(500).send({ message: 'Empty Values' });

}

productController.delete = (req, res) => {
  product = req.body.product;
  if (product)
    productModel.delete(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Product deleted' })
    );
  else res.status(500).send({ message: 'Empty Values' });

}

module.exports = productController;
