const productModel = require('../models/product.model');
const productSchema = require('../schemas/product.schema');

const productController = () => {};

productController.getAll = (_, res) => {
  productModel.all(_, (error, rows) =>
    error
      ? res.status(500).send({ message: error })
      : res.status(200).send(rows)
  );
}

productController.getById = (req, res) => {
  const product = { id_product: req.params.id };
  const validation = productSchema.id.validate(product);
  if (validation)
    productModel.find(product, (error, rows) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send(rows[0])
    );
  else res.status(500).send({ message: validation.error.details });
}

productController.getByName = (req, res) => {
  const product = { p_name: req.params.p_name };
  const validation = productSchema.name.validate(product);
  if (validation)
    productModel.findByName(product, (error, rows) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send(rows)
    );
  else res.status(500).send({ message: validation.error.details });
}

productController.add = (req, res) => {
  if (!req.body.product) {
    const products = req.body;
    const validation = productSchema.addList.validate(products);
    if (validation) {
      return productModel.addList(products, (error, _) =>
        error
          ? res.status(500).send({ message: error })
          : res.status(200).send({ message: 'Products added' })
      );
    }
  }

  const product = req.body.product;
  const validation = productSchema.create.validate(product);
  if (validation)
    productModel.add(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Product added' })
    );
  else res.status(500).send({ message: validation.error.details });
}

productController.update = (req, res) => {
  const product = req.body.product;
  const validation = productSchema.update.validate(product);
  if (validation)
    productModel.update(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Product modified' })
    );
  else res.status(500).send({ message: validation.error.details });
}

productController.delete = (req, res) => {
  const product = { id_product: req.params.id };
  const validation = productSchema.id.validate(product);
  if (validation)
    productModel.delete(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: 'Product deleted' })
    );
  else res.status(500).send({ message: validation.error.details });
}

module.exports = productController;
