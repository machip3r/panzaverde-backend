const connection = require('../config/connection');

const orderModel = () => {};

orderModel.all = (_, callback) =>
  connection.execute(
    sql = "SELECT * FROM pvOrder",
    callback = callback,
  );

orderModel.find = (order, callback) => {
  connection.execute(
    sql = "SELECT * FROM pvOrder WHERE id_order = :id_order",
    values = order,
    callback = callback,
  );
}

orderModel.findByStatus = (order, callback) => {
  order.p_name = `%${order.o_status}%`;
  connection.execute(
    sql = "SELECT * FROM pvOrder WHERE o_status LIKE :o_status",
    values = order,
    callback = callback,
  );
}

orderModel.detail = (order, callback) => {
  connection.execute(
    sql = `SELECT pp.id_product, pp.p_name, pp.p_price, pp.p_stock, pp.p_unit,
                  pop.op_quantity, pop.op_price
                  FROM pvOrder po
                    INNER JOIN pvOrderProduct pop
                      ON po.id_order  = pop.id_order
                    INNER JOIN pvProduct pp
                      ON pop.id_product = pp.id_product
                  WHERE po.id_order = :id_order`,
    values = order,
    callback = callback,
  );
}

orderModel.add = async (order, callback) => {
  let o_total = 0, id_order;
  connection.execute("START TRANSACTION", (error, _) => {
    if (error)
      return connection.execute("ROLLBACK", () => callback("Start transaction failed"));

    connection.execute(
      sql = "INSERT INTO pvOrder(o_total) VALUES (:o_total)",
      values = { o_total },
      (error, rows) => {
        if (error)
          return connection.execute("ROLLBACK", () => callback("Insert in pvOrder error"));

        id_order = rows.insertId;
        let opSql = 'INSERT INTO pvOrderProduct(id_product, id_order, op_quantity, op_price) VALUES ';
        order.forEach((product) => {
          opSql += '(' + [connection.escape(product.id_product), connection.escape(id_order),
          connection.escape(product.op_quantity), connection.escape(product.p_price)]
            .join(', ') + '),';
          o_total += product.p_price;
        });
        opSql = opSql.substring(0, opSql.length - 1);

        connection.execute(
          sql = opSql,
          (error, _) => {
            if (error)
              return connection.execute("ROLLBACK", () => callback("Inserts in pvOrderProduct failed"))

            connection.execute(
              sql = "UPDATE pvOrder SET o_total=:o_total WHERE id_order=:id_order",
              values = { o_total, id_order },
              (error, _) => {
                if (error)
                  return connection.execute("ROLLBACK", () => callback("Update pvOrder error"));

                return connection.execute("COMMIT", () => callback());
              });
          });
      });
  });
}

orderModel.update = (order, callback) =>
  connection.execute(
    sql = "UPDATE pvOrder SET o_status=:o_status, o_date=:o_date, o_total=:o_total WHERE id_order=:id_order",
    values = order,
    callback = callback,
  );

orderModel.delete = (order, callback) =>
  connection.execute(
    sql = "DELETE FROM pvOrder WHERE id_order = :id_order",
    values = order,
    callback = callback,
  );

module.exports = orderModel;
