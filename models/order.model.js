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
  connection.query("BEGIN TRANSACTION");
  try {
    connection.execute(
      sql = "INSERT INTO pvOrder(o_total) VALUES (:o_total)",
      values = { o_total },
      (_, rows) => {
        id_order = rows.insertId;
        console.log(id_order)

        order.foreach((product) => {
          console.log(product);
          o_total += product.p_price;
          connection.execute(
            sql = `INSERT INTO pvOrderProduct(id_product, id_order, op_quantity, op_price)
                            VALUES (:id_product, :id_order, :op_quantity, :p_price)`,
            values = { ...product, id_order },
          );
        });
        connection.execute(
          sql = "UPDATE pvOrder SET o_total=:o_total",
          values = { o_total },
        );

      });
    connection.query("COMMIT");
    return false;
  } catch {
    connection.query("ROLLBACK")
    return true;
  }
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
