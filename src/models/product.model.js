const connection = require("../config/connection");

const productModel = () => {};

productModel.getAll = async () => {
  const response = { products: [], total_products: 0 };
  let error = null;
  let sqlProducts = "SELECT * FROM pvProduct";

  try {
    const products = await connection.promise().execute(sqlProducts);
    response.products = products[0];
    response.total_products = response.products.length;
  } catch (e) {
    error = { msg: "Error getting products", error: e };
  }
  return { error, response };
};

productModel.getAllPaginated = async ({ limit, page }) => {
  const db = connection.promise();
  const offset = limit * page;
  const response = { products: [], total_products: 0, page, total_pages: 0 };
  let error = null;

  let sqlProducts = `SELECT * FROM pvProduct
                      LIMIT ${db.escape(offset)}, ${db.escape(limit)}`;
  try {
    const products = await db.execute(sqlProducts);
    const total_products = await db.execute(
      "SELECT COUNT(id_product) AS total_products FROM pvProduct",
    );
    response.products = products[0];
    const tp = total_products[0][0].total_products;
    response.total_pages = Math.ceil(tp / limit);
    response.total_products = response.products.length;
  } catch (e) {
    error = { msg: "Error getting products", error: e };
  }
  db.releaseConnection();
  return { error, response };
};

productModel.findById = async ({ id_product }) => {
  let response = null;
  let error = null;
  try {
    const product = await connection
      .promise()
      .execute("SELECT * FROM pvProduct WHERE id_product = :id_product", {
        id_product,
      });
    response = product[0][0];
  } catch (e) {
    error = { msg: `Error getting product ${id_product}` };
  }
  return { error, response };
};

productModel.findByName = async ({ p_name }) => {
  p_name = `%${p_name}%`;
  const response = { products: [], total_products: 0 };
  let error = null;
  let sqlProducts = `SELECT * FROM pvProduct WHERE p_name LIKE :p_name`;

  try {
    const products = await connection
      .promise()
      .execute(sqlProducts, { p_name });
    response.products = products[0];
    response.total_products = response.products.length;
  } catch (e) {
    error = { msg: "Error getting products", error: e };
  }
  return { response, error };
};

productModel.findByNamePaginated = async ({ p_name, limit, page }) => {
  const db = connection.promise();
  const offset = limit * page;
  p_name = `%${p_name}%`;
  const response = { products: [], total_products: 0, page, total_pages: 0 };
  let error = null;

  let sqlProducts = `SELECT * FROM pvProduct WHERE p_name LIKE :p_name
                      LIMIT ${db.escape(offset)}, ${db.escape(limit)}`;

  try {
    const products = await db.execute(sqlProducts, { p_name });
    const total_products = await db.execute(
      "SELECT COUNT(id_product) AS total_products FROM pvProduct WHERE p_name LIKE :p_name",
      { p_name },
    );
    response.products = products[0];
    const tp = total_products[0][0].total_products;
    response.total_pages = Math.ceil(tp / limit);
    response.total_products = response.products.length;
  } catch (e) {
    error = { msg: "Error getting products", error: e };
  }
  db.releaseConnection();
  return { error, response };
};

productModel.add = async (product) => {
  const response = { msg: "" };
  const error = null;
  try {
    const rowsInserted = connection
      .promise()
      .execute(
        "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES (:p_name, :p_price, :p_stock, :p_unit)",
        product,
      );
    response.msg = rowsInserted;
  } catch (e) {
    error = { msg: "Error adding product", error: e };
  }
  return { error, response };
};

productModel.addList = async (products) => {
  const db = connection.promise();
  const response = { msg: "" };
  const error = null;
  let inTransaction = false;

  try {
    await db.execute("START TRANSACTION");
    inTransaction = true;

    let sql = "INSERT INTO pvProduct(p_name, p_price, p_stock, p_unit) VALUES";
    products.forEach((product) => {
      sql += ` (${connection.escape(product.p_name)},
                ${connection.escape(product.p_price)},
                ${connection.escape(product.p_stock)},
                ${connection.escape(product.p_unit)}),`;
    });
    sql = sql.substring(0, sql.length - 1);
    const rowsInserted = await db.execute(sql);
    response.msg = rowsInserted;
    await db.execute("COMMIT");
  } catch (e) {
    inTransaction && (await db.execute("ROLLBACK"));
    error = { msg: "Error adding products", error: e };
  }

  db.releaseConnection();
  return { error, response };
};

productModel.update = async (product) => {
  const response = { affectedRows: "" };
  const error = null;
  let sql = "UPDATE pvProduct SET";
  sql += `${product.p_name ? " p_name=:p_name," : ""}`;
  sql += `${product.p_price ? " p_price=:p_price," : ""}`;
  sql += `${product.p_stock ? " p_stock=:p_stock," : ""}`;
  sql += `${product.p_unit ? " p_unit=:p_unit," : ""}`;

  sql = sql.substring(0, sql.length - 1);
  sql += " WHERE id_product=:id_product";

  try {
    const rowsUpdated = await connection.promise().execute(sql, product);
    response.affectedRows = rowsUpdated[0].affectedRows;
  } catch (e) {
    error = { msg: `Error updating product ${product.id_product}` };
  }
  return { error, response };
};

productModel.delete = async ({ id_product }) => {
  const response = { msg: "" };
  const error = null;
  const sql = "DELETE FROM pvProduct WHERE id_product = :id_product";

  try {
    const rowsAffected = await connection
      .promise()
      .execute(sql, { id_product });
    response.msg = rowsAffected[0];
  } catch (e) {
    error = { msg: `Error deleting product ${id_product}` };
  }
  return { error, response };
};

module.exports = productModel;
