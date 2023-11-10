const faker = require("@faker-js/faker").fakerES_MX;
const db = require("./../src/config/connection");

const socialNetwork = require("./seeders/socialNetwork.seeder");
const client = require("./seeders/client.seeder");
const route = require("./seeders/route.seeder");
const subscription = require("./seeders/subscription.seeder");
const plan = require("./seeders/plan.seeder");
const product = require("./seeders/products.seeder");
const order = require("./seeders/order.seeder");
const orderProduct = require("./seeders/orderProduct.seeder");

const maxClients = 400,
  maxRoutes = 15,
  maxSubscriptions = 200,
  maxPlans = 150,
  maxDays = 5,
  maxMealTypes = 4,
  maxTime = 3,
  maxProducts = 50,
  maxOrders = 50,
  maxOrdersProducts = 100;

db.getConnection(async (err, connection) => {
  if (err) throw err;

  await socialNetwork(connection);
  await client(connection, faker, maxClients);
  await route(connection, faker, maxRoutes);
  await subscription(connection, faker, maxClients, maxRoutes);
  await plan(
    connection,
    faker,
    maxPlans,
    maxSubscriptions,
    maxDays,
    maxMealTypes,
    maxTime,
  );
  await product(connection, faker, maxProducts);
  await order(connection, faker, maxOrders);
  await orderProduct(
    connection,
    faker,
    maxOrdersProducts,
    maxOrders,
    maxProducts,
  );

  const endConnection = async () => connection.release();

  await endConnection();
  db.end();
});
