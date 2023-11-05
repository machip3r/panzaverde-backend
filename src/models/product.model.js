const connection = require("../config/connection");

const productModel = () => {};

productModel.all = (data, callback) => {
  let sql = "SELECT * FROM pvProduct";
  let page;
  if (data.hasOwnProperty("offset") && data.hasOwnProperty("count")) {
    sql += " LIMIT :offset, :count";
    page = parseInt(data.offset);
    data.offset--;
    data.offset *= data.count;
  } else if (data.hasOwnProperty("count")) {
    sql += " LIMIT :count";
    page = 1;
  }
  connection.execute(sql, (values = data), (error, products) => {
    if (!data.hasOwnProperty("count"))
      return callback(error, {
        max_pages: 1,
        page: 1,
        records: products.length,
        products,
      });
    connection.execute(
      "SELECT COUNT(id_product) as max_pages FROM pvProduct LIMIT 1",
      (error, rows) => {
        const max_pages = Math.round(rows[0].max_pages / data.count);
        return callback(error, {
          max_pages,
          page,
          records: products.length,
          products,
        });
      },
    );
  });
};

productModel.find = (product, callback) => {
  connection.execute(
    (sql = "SELECT * FROM pvProduct WHERE id_product = :id_product LIMIT 1"),
    (values = product),
    (callback = callback),
  );
};

productModel.findByName = (data, callback) => {
  let sql = "SELECT * FROM pvProduct WHERE p_name LIKE :p_name";
  let page;
  if (data.hasOwnProperty("offset") && data.hasOwnProperty("count")) {
    sql += " LIMIT :offset, :count";
    page = parseInt(data.offset);
    data.offset--;
    data.offset *= data.count;
  } else if (data.hasOwnProperty("count")) {
    sql += " LIMIT :count";
    page = 1;
  }

  data.p_name = `%${data.p_name}%`;
  connection.execute(sql, (values = data), (error, products) => {
    if (!data.hasOwnProperty("count"))
      return callback(error, {
        max_pages: 1,
        page: 1,
        records: products.length,
        products,
      });
    connection.execute(
      "SELECT COUNT(id_product) AS max_pages FROM pvProduct WHERE p_name LIKE :p_name LIMIT 1",
      (values = data),
      (error, rows) => {
        const max_pages = Math.round(rows[0].max_pages / data.count);
        return callback(error, {
          max_pages,
          page,
          records: products.length,
          products,
        });
      },
    );
  });
};

productModel.add = (product, callback) => {
  connection.execute(
    (sql =
      "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES (:p_name, :p_price, :p_stock, :p_unit)"),
    (values = product),
    (callback = callback),
  );
};

productModel.addList = (products, callback) =>
  connection.query((sql = "START TRANSACTION"), (error, _) => {
    if (error)
      return connection.execute("ROLLBACK", () =>
        callback("Start transaction failed"),
      );

    let pSql =
      "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES ";
    products.forEach((product) => {
      pSql +=
        "(" +
        [
          connection.escape(product.p_name),
          connection.escape(product.p_price),
          connection.escape(product.p_stock),
          connection.escape(product.p_unit),
        ].join(", ") +
        "),";
    });
    pSql = pSql.substring(0, pSql.length - 1);
    connection.execute(pSql, (error, _) => {
      if (error)
        return connection.execute("ROLLBACK", () =>
          callback("Inserts in pvProduct failed"),
        );
      return connection.execute("COMMIT", () => callback());
    });
  });

productModel.update = (product, callback) =>
  connection.execute(
    (sql =
      "UPDATE pvProduct SET p_name=:p_name, p_price=:p_price, p_stock=:p_stock, p_unit=:p_unit WHERE id_product=:id_product"),
    (values = product),
    (callback = callback),
  );

productModel.delete = (product, callback) =>
  connection.execute(
    (sql = "DELETE FROM pvProduct WHERE id_product = :id_product"),
    (values = product),
    (callback = callback),
  );

module.exports = productModel;
