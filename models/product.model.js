const connection = require('../config/connection');
/*
  Se hace uso de la estructura productEntity para cada una de las llamadas a estas funciones
  const { productEntity } = require('../entities/product.entity');
*/

const productModel = () => {};

productModel.all = (data, callback) =>
  connection.execute(
    "SELECT * FROM pvProduct",
    data,
    callback
  );

productModel.find = (data, callback) =>
  connection.execute(
    "SELECT * FROM pvProduct WHERE id_product = :id_product",
    data,
    callback
  );

productModel.add = (data, callback) =>
  connection.execute(
    "INSERT INTO pvProduct(p_name, p_prize, p_stock, p_unit) VALUES (:p_name, :p_price, :p_stock, :p_unit)",
    data,
    callback
  );

productModel.delete = (data, callback) =>
  connection.execute(
    "DELETE FROM pvProduct WHERE id_product = :id_product"
  );

module.exports = productModel;
