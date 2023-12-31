const connection = require("../config/connection");

const orderModel = () => {};

orderModel.all = async ({ count, page }) => {
  const db = connection.promise();
  const offset = count * page;
  const response = { orders: [], n_orders: 0, page, n_pages: 0 };
  let error = null;

  let sqlOrders = "SELECT * FROM pvOrder ORDER BY o_date DESC";
  if (count > 0)
    sqlOrders += ` LIMIT ${db.escape(offset)}, ${db.escape(count)}`;

  try {
    const orders = await db.execute(sqlOrders);
    const n_pages = await db.execute(
      "SELECT COUNT(id_order) AS n_orders FROM pvOrder",
    );
    response.orders = orders[0];
    const np = n_pages[0][0].n_orders;
    response.n_pages = Math.ceil(np / (count > 0 ? count : np));
    response.n_orders = response.orders.length;
  } catch (err) {
    error = "Error getting orders";
  }
  db.releaseConnection();
  return { response, error };
};

orderModel.find = (order, callback) => {
  connection.execute(
    (sql = "SELECT * FROM pvOrder WHERE id_order = :id_order"),
    (values = order),
    (callback = callback),
  );
};

orderModel.findByStatus = (order, callback) => {
  let sql =
    "SELECT * FROM pvOrder WHERE o_status LIKE :o_status ORDER BY o_date DESC";
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
  connection.execute(sql, (values = order), (error, orders) => {
    if (!data.hasOwnProperty("count"))
      return callback(error, {
        max_pages: 1,
        page: 1,
        records: orders.length,
        orders,
      });
    connection.execute(
      "SELECT COUNT(id_order) AS max_pages FROM pvOrder WHERE o_status LIKE :o_status LIMIT 1",
      (values = data),
      (error, rows) => {
        const max_pages = Math.round(rows[0].max_pages / data.count);
        return callback(error, {
          max_pages,
          page,
          records: orders.length,
          orders,
        });
      },
    );
  });
};

orderModel.detail = (order, callback) => {
  connection.execute(
    (sql = `SELECT pp.id_product, pp.p_name, pp.p_price, pp.p_stock, pp.p_unit,
                  pop.op_quantity, pop.op_price
                  FROM pvOrder po
                    INNER JOIN pvOrderProduct pop
                      ON po.id_order  = pop.id_order
                    INNER JOIN pvProduct pp
                      ON pop.id_product = pp.id_product
                  WHERE po.id_order = :id_order`),
    (values = order),
    (callback = callback),
  );
};

orderModel.findByDate = async ({ o_date, count, page }) => {
  const db = connection.promise();
  const offset = count * page;
  const response = { orders: [], n_orders: 0, page, n_pages: 0 };
  let error = null;

  let sqlOrders = `SELECT * FROM pvOrder WHERE DATE(o_date) = :o_date ORDER BY o_date DESC`;
  if (count > 0)
    sqlOrders += ` LIMIT ${db.escape(offset)}, ${db.escape(count)}`;

  try {
    const orders = await db.execute(sqlOrders, { o_date });
    const n_pages = await db.execute(
      "SELECT COUNT(id_order) AS n_orders FROM pvOrder WHERE DATE(o_date) = :o_date",
      { o_date },
    );
    response.orders = orders[0];
    const np = n_pages[0][0].n_orders;
    response.n_pages = Math.ceil(np / (count > 0 ? count : np));
    response.n_orders = response.orders.length;
  } catch (err) {
    error = "Error getting orders";
  }
  db.releaseConnection();
  return { response, error };
};

orderModel.add = async (order, callback) => {
  let o_total = 0,
    id_order;
  connection.query("START TRANSACTION", (error, _) => {
    if (error)
      return connection.execute("ROLLBACK", () =>
        callback("Start transaction failed"),
      );

    connection.execute(
      (sql = "INSERT INTO pvOrder(o_total) VALUES (:o_total)"),
      (values = { o_total }),
      (error, rows) => {
        if (error)
          return connection.execute("ROLLBACK", () =>
            callback("Insert in pvOrder error"),
          );

        id_order = rows.insertId;
        let opSql =
          "INSERT INTO pvOrderProduct(id_product, id_order, op_quantity, op_price) VALUES ";
        order.forEach((product) => {
          opSql +=
            "(" +
            [
              connection.escape(product.id_product),
              connection.escape(id_order),
              connection.escape(product.op_quantity),
              connection.escape(product.p_price),
            ].join(", ") +
            "),";
          o_total += product.p_price;
        });
        opSql = opSql.substring(0, opSql.length - 1);

        connection.execute((sql = opSql), (error, _) => {
          if (error)
            return connection.execute("ROLLBACK", () =>
              callback("Inserts in pvOrderProduct failed"),
            );

          connection.execute(
            (sql =
              "UPDATE pvOrder SET o_total=:o_total WHERE id_order=:id_order"),
            (values = { o_total, id_order }),
            (error, _) => {
              if (error)
                return connection.execute("ROLLBACK", () =>
                  callback("Update pvOrder error"),
                );

              return connection.execute("COMMIT", () => callback());
            },
          );
        });
      },
    );
  });
};

orderModel.update = (order, callback) =>
  connection.execute(
    (sql =
      "UPDATE pvOrder SET o_status=:o_status, o_date=:o_date, o_total=:o_total WHERE id_order=:id_order"),
    (values = order),
    (callback = callback),
  );

orderModel.delete = (order, callback) =>
  connection.execute(
    (sql = "UPDATE pvOrder SET o_status = 'i' WHERE id_order = :id_order"),
    (values = order),
    (callback = callback),
  );

module.exports = orderModel;
