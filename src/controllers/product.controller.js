const productModel = require("../models/product.model");
const productSchema = require("../schemas/product.schema");

const productController = () => {};

productController.getAll = async (req, res) => {
  const params = {
    count: parseInt(req.params.count) & -1,
    page: parseInt(req.params.page) | 0,
  };
  if (params.page < 0) params.page = 0;
  const { response, error } = await productModel.all(params);
  if (error) res.status(500).send(error);
  else if (response.n_products == 0) res.status(204).send();
  else res.status(200).send(response);
};

productController.getById = (req, res) => {
  const product = req.params;
  const validation = productSchema.id.validate(product);
  if (validation)
    productModel.find(product, (error, rows) => {
      if (error) res.status(500).send({ message: error });
      else if (rows.length == 0) res.status(202).send({ message: "No data" });
      else res.status(200).send(rows[0]);
    });
  else res.status(500).send({ message: validation.error.details });
};

productController.getByName = async (req, res) => {
  const product = req.params;
  const validation = productSchema.p_name.validate(product);
  if (validation) {
    const params = {
      p_name: product.p_name,
      count: parseInt(req.params.count) & -1,
      page: parseInt(req.params.page) | 0,
    };
    if (params.page < 0) params.page = 0;
    const { response, error } = await productModel.findByName(params);
    if (error) res.status(500).send(error);
    else if (response.n_products == 0) res.status(204).send();
    else res.status(200).send(response);
  } else res.status(500).send({ message: validation.error.details });
};

productController.add = (req, res) => {
  if (!req.body.product) {
    const products = req.body;
    const validation = productSchema.addList.validate(products);
    if (validation) {
      return productModel.addList(products, (error, _) =>
        error
          ? res.status(500).send({ message: error })
          : res.status(200).send({ message: "Products added" }),
      );
    }
  }

  const product = req.body.product;
  const validation = productSchema.create.validate(product);
  if (validation)
    productModel.add(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: "Product added" }),
    );
  else res.status(500).send({ message: validation.error.details });
};

productController.update = (req, res) => {
  const product = req.body.product;
  const validation = productSchema.update.validate(product);
  if (validation)
    productModel.update(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: "Product modified" }),
    );
  else res.status(500).send({ message: validation.error.details });
};

productController.delete = (req, res) => {
  const product = req.body;
  console.log(product);
  const validation = productSchema.id.validate(product);
  if (validation)
    productModel.delete(product, (error, _) =>
      error
        ? res.status(500).send({ message: error })
        : res.status(200).send({ message: "Product deleted" }),
    );
  else res.status(500).send({ message: validation.error.details });
};

module.exports = productController;
