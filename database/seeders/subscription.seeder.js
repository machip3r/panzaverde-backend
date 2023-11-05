const createSubscription = require("./../factories/subscription.factory");

const subscriptionSeeder = async (db, faker, maxClients, maxRoutes) => {
  let sql = "";
  sql = `INSERT INTO pvSubscription (id_client, id_route, 
                s_specification, s_status, s_start_date, 
                s_final_date, s_payment_date, s_payment_type, 
                s_total) VALUES `;

  let subscription;
  for (let i = 0; i < maxClients; i++) {
    subscription = createSubscription(faker, maxClients, maxRoutes);
    sql += `("${subscription.id_client}",
             "${subscription.id_route}",
             "${subscription.s_specification}", 
             "${subscription.s_status}", 
             "${subscription.s_start_date}", 
             "${subscription.s_final_date}", 
             "${subscription.s_payment_date}", 
             "${subscription.s_payment_type}", 
             ${subscription.s_total}),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in subscription.seeder: " + error);
    else console.log("subscription.seeder succesfull execution");
  });
};

module.exports = subscriptionSeeder;
