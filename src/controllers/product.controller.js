const productModel = require("../models/product.model");
const productSchema = require("../schemas/product.schema");

const productController = () => {};

productController.getAll = async (_, res) => {
  const { error, response } = await productModel.getAll();
  if (error) res.status(500).send(error);
  else if (response.total_products === 0)
    res.status(200).send({ msg: `No products available` });
  else res.status(200).send(response);
};

productController.getAllPaginated = async (req, res) => {
  const params = req.params;
  const limit = +params.limit || 0;
  const page = +params.page ?? -1;

  const { error } = productSchema.pagination.validate({ limit, page });

  if (!error) {
    const { error, response } = await productModel.getAllPaginated({
      limit,
      page,
    });
    if (error) res.status(500).send(error);
    else if (response.total_products === 0)
      res.status(200).send({
        msg: `No products available for limit: ${limit} and page: ${page}`,
      });
    else res.status(200).send(response);
  } else
    res.status(202).send({
      msg: `Either limit: ${limit} or page: ${page} are not valid`,
      error,
    });
};

productController.getById = async (req, res) => {
  const id_product = +req.params.id_product ?? -1;
  const { error } = productSchema.id.validate(id_product);
  if (!error) {
    const { error, response } = await productModel.findById({ id_product });
    if (error) res.status(500).send({ message: error });
    else if (!response)
      res.status(200).send({ msg: `ID ${id_product} not found` });
    else res.status(200).send(response);
  } else
    res.status(500).send({ msg: `${id_product} is not a valid ID`, error });
};

productController.getByName = async (req, res) => {
  const p_name = req.params.p_name;
  const { error } = productSchema.p_name.validate(p_name);
  if (!error) {
    const { error, response } = await productModel.findByName({ p_name });
    if (error) res.status(500).send(error);
    else if (response.total_products === 0)
      res.status(202).send({ msg: `Name ${p_name} not found` });
    else res.status(200).send(response);
  } else res.status(500).send({ msg: `${p_name} is not a valid name.`, error });
};

productController.getByNamePaginated = async (req, res) => {
  const params = req.params;
  const p_name = params.p_name;
  const limit = +params.limit || 0;
  const page = +params.page ?? -1;
  const { error } = productSchema.namePagination.validate({
    p_name,
    limit,
    page,
  });

  if (!error) {
    const { error, response } = await productModel.findByNamePaginated({
      p_name,
      limit,
      page,
    });
    if (error) res.status(500).send(error);
    else if (response.total_products === 0)
      res.status(200).send({
        msg: `No products available for p_name: ${p_name}, limit: ${limit} and page: ${page}`,
      });
    else res.status(200).send(response);
  } else
    res.status(202).send({
      msg: `Either p_name: ${p_name}, limit: ${limit} or page: ${page} are not valid`,
      error,
    });
};

productController.add = async (req, res) => {
  const body = req.body.products ?? req.body;
  const { error } = Array.isArray(body)
    ? productSchema.addList.validate(body)
    : productSchema.add.validate(body);

  if (!error) {
    const { error, response } = Array.isArray(body)
      ? await productModel.addList(body)
      : await productModel.add(body);
    error
      ? res.status(500).send(error)
      : res.status(200).send({
          msg: `${Array.isArray(body) ? "Products" : "Product"} added`,
          response,
        });
  } else res.status(202).send({ msg: "JSON format is incorrect" });
};

productController.update = async (req, res) => {
  const product = req.body;
  const { error } = productSchema.update.validate(product);
  if (!error) {
    const { error, response } = await productModel.update(product);
    error
      ? res.status(500).send(error)
      : res
          .status(200)
          .send({ msg: `Product ${product.id_product} modified`, response });
  } else res.status(202).send({ msg: "JSON format is incorrect", error });
};

productController.delete = async (req, res) => {
  const id_product = req.body.id_product;
  const { error } = productSchema.id.validate(id_product);
  if (!error) {
    const { error, response } = await productModel.delete({ id_product });
    error
      ? res.status(500).send(error)
      : res
          .status(200)
          .send({ msg: `Product ${id_product} deleted`, response });
  } else res.status(202).send({ msg: "JSON format is incorrect", error });
};

module.exports = productController;
