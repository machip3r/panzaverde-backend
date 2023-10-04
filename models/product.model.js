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

productModel.add = (product, callback) => {
  connection.execute(
    sql = "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES (:p_name, :p_price, :p_stock, :p_unit)",
    values = product,
    callback = callback,
  );
}

productModel.addList = (products, callback) =>
  connection.execute(
    sql = "START TRANSACTION",
    (error, _) => {
      if (error)
        return connection.execute("ROLLBACK", () => callback("Start transaction failed"));

      let pSql = 'INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES ';
      products.forEach((product) => {
        pSql += '(' + [connection.escape(product.p_name), connection.escape(product.p_price),
        connection.escape(product.p_stock), connection.escape(product.p_unit)]
          .join(', ') + '),';
      });
      pSql = pSql.substring(0, pSql.length - 1);
      connection.execute(pSql, (error, _) => {
        if (error)
          return connection.execute("ROLLBACK", () => callback("Inserts in pvProduct failed"));
        return connection.execute("COMMIT", () => callback());
      });
    }
  )

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
