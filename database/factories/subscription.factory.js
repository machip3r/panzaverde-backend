const createSubscription = (faker, maxClients, maxRoutes) => {
  return {
    id_client: faker.number.int({ min: 1, max: maxClients }),
    id_route: faker.number.int({ min: 1, max: maxRoutes }),
    s_specification: faker.lorem.sentence({ min: 5, max: 20 }),
    s_status: faker.helpers.arrayElement(["a", "o", "i"]),
    s_start_date: faker.date
      .between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2022-12-31T00:00:00.000Z",
      })
      .toISOString()
      .slice(0, 10),
    s_final_date: faker.date
      .between({
        from: "2023-01-01T00:00:00.000Z",
        to: "2023-12-31T00:00:00.000Z",
      })
      .toISOString()
      .slice(0, 10),
    s_payment_date: faker.date
      .between({
        from: "2023-01-01T00:00:00.000Z",
        to: "2023-12-31T00:00:00.000Z",
      })
      .toISOString()
      .slice(0, 10),
    s_payment_type: faker.helpers.arrayElement([
      "Tarjeta de crédito",
      "Tarjeta de débito",
      "Efectivo",
      "Transferencia",
    ]),
    s_total: faker.number.int({ min: 1, max: 10000 }),
  };
};

module.exports = createSubscription;
