const createOrderProduct = require("./../factories/orderProduct.factory");

const orderProductSeeder = async (
  db,
  faker,
  maxInserts,
  maxOrders,
  maxProducts,
) => {
  let sql =
    "INSERT INTO pvOrderProduct (id_product, id_order, op_quantity, op_price) VALUES ";
  let orderProduct;
  for (let i = 0; i < maxInserts; i++) {
    orderProduct = createOrderProduct(faker, maxOrders, maxProducts);
    sql += `(${orderProduct.id_product}, 
             ${orderProduct.id_order},
             ${orderProduct.op_quantity}, 
             ${orderProduct.op_total}),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in orderProduct.seeder: " + error);
    else console.log("orderProduct.seeder succesfull execution");
  });
};

module.exports = orderProductSeeder;
