const connection = require("../config/connection");

const productModel = () => {};

productModel.all = async ({ count, page }) => {
  const db = connection.promise();
  const offset = count * page;
  const response = { products: [], n_products: 0, page, n_pages: 0 };
  let error = null;

  let sqlProducts = "SELECT * FROM pvProduct";
  if (count > 0)
    sqlProducts += ` LIMIT ${db.escape(offset)}, ${db.escape(count)}`;

  try {
    const products = await db.execute(sqlProducts);
    const n_pages = await db.execute(
      "SELECT COUNT(id_product) AS n_products FROM pvProduct",
    );
    response.products = products[0];
    const np = n_pages[0][0].n_products;
    response.n_pages = Math.ceil(np / (count > 0 ? count : np));
    response.n_products = response.products.length;
  } catch (err) {
    error = "Error getting products";
  }
  db.releaseConnection();
  return { response, error };
};

productModel.find = (product, callback) => {
  connection.execute(
    "SELECT * FROM pvProduct WHERE id_product = :id_product LIMIT 1",
    product,
    callback,
  );
};

productModel.findByName = async ({ p_name, count, page }) => {
  const db = connection.promise();
  const offset = count * page;
  p_name = `%${p_name}%`;
  const response = { products: [], n_products: 0, page, n_pages: 0 };
  let error = null;

  let sqlProducts = `SELECT * FROM pvProduct WHERE p_name LIKE :p_name`;
  if (count > 0)
    sqlProducts += ` LIMIT ${db.escape(offset)}, ${db.escape(count)}`;

  try {
    const products = await db.execute(sqlProducts, { p_name });
    const n_pages = await db.execute(
      "SELECT COUNT(id_product) AS n_products FROM pvProduct WHERE p_name LIKE :p_name",
      { p_name },
    );
    response.products = products[0];
    const np = n_pages[0][0].n_products;
    response.n_pages = Math.ceil(np / (count > 0 ? count : np));
    response.n_products = response.products.length;
  } catch (err) {
    error = "Error getting products";
  }
  db.releaseConnection();
  return { response, error };
};

productModel.add = (product, callback) => {
  connection.execute(
    "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES (:p_name, :p_price, :p_stock, :p_unit)",
    product,
    callback,
  );
};

productModel.addList = (products, callback) =>
  connection.query("START TRANSACTION", (error, _) => {
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
    "UPDATE pvProduct SET p_name=:p_name, p_price=:p_price, p_stock=:p_stock, p_unit=:p_unit WHERE id_product=:id_product",
    product,
    callback,
  );

productModel.delete = (product, callback) =>
  connection.execute(
    "DELETE FROM pvProduct WHERE id_product = :id_product",
    product,
    callback,
  );

module.exports = productModel;
