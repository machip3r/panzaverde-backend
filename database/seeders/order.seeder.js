const createOrder = require("./../factories/order.factory");

const orderSeeder = async (db, faker, maxOrders) => {
  let sql = "INSERT INTO pvOrder (o_status, o_date, o_total) VALUES ";
  let order;
  for (let i = 0; i < maxOrders; i++) {
    order = createOrder(faker);
    sql += `("${order.o_status}", 
             "${order.o_date}",
              ${order.o_total}),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in order.seeder: " + error);
    else console.log("order.seeder succesfull execution");
  });
};

module.exports = orderSeeder;
