const createRoute = require("./../factories/route.factory");

const clientSeeder = async (db, faker, maxRoutes) => {
  let sql = "INSERT INTO pvRoute (r_name, r_color) VALUES ";
  let route;
  for (let i = 0; i < maxRoutes; i++) {
    route = createRoute(faker);
    sql += `("${route.r_name}", 
             "${route.r_color}"),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in route.seeder: " + error);
    else console.log("route.seeder succesfull execution");
  });
};

module.exports = clientSeeder;
