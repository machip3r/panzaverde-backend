const connection = require('../config/connection');

const productModel = () => {};

productModel.all = (_, callback) =>
  connection.execute(
    sql = "SELECT * FROM pvProduct",
    callback = callback,
  );

productModel.find = (product, callback) => {
  connection.execute(
    sql = "SELECT * FROM pvProduct WHERE id_product = :id_product",
    values = product,
    callback = callback,
  );
}

productModel.findByName = (product, callback) => {
  product.p_name = `%${product.p_name}%`;
  connection.execute(
    sql = "SELECT * FROM pvProduct WHERE p_name LIKE :p_name",
    values = product,
    callback = callback,
  );
}

productModel.add = (product, callback) =>
  connection.execute(
    sql = "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES (:p_name, :p_price, :p_stock, :p_unit)",
    values = product,
    callback = callback,
  );

productModel.update = (product, callback) =>
  connection.execute(
    sql = "UPDATE pvProduct SET p_name=:p_name, p_price=:p_price, p_stock=:p_stock, p_unit=:p_unit WHERE id_product=:id_product",
    values = product,
    callback = callback,
  );

productModel.delete = (product, callback) =>
  connection.execute(
    sql = "DELETE FROM pvProduct WHERE id_product = :id_product",
    values = product,
    callback = callback,
  );

module.exports = productModel;
