const createProduct = require("./../factories/product.factory");

const productSeeder = async (db, faker, maxProducts) => {
  let sql = "INSERT INTO pvProduct (p_name, p_price, p_stock, p_unit) VALUES ";
  let product;
  for (let i = 0; i < maxProducts; i++) {
    product = createProduct(faker);
    sql += `("${product.p_name}", 
             ${product.p_price},
             ${product.p_stock}, 
             "${product.p_unit}"),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in product.seeder: " + error);
    else console.log("product.seeder succesfull execution");
  });
};

module.exports = productSeeder;
