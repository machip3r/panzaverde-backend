const createClient = require("./../factories/client.factory");

const clientSeeder = async (db, faker, maxClients) => {
  let sql =
    "INSERT INTO pvClient (id_social_network, c_name, c_address, c_phone, c_status) VALUES ";
  let client;
  for (let i = 0; i < maxClients; i++) {
    client = createClient(faker);
    sql += `("${client.id_social_network}", 
             "${client.c_name}",
             "${client.c_address}", 
             "${client.c_phone}", 
             "${client.c_status}"),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in client.seeder: " + error);
    else console.log("client.seeder succesfull execution");
  });
};

module.exports = clientSeeder;
