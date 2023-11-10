const createOrder = (faker) => {
  return {
    o_status: faker.helpers.arrayElement(["a", "o", "i"]),
    o_date: faker.date
      .between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2023-12-31T00:00:00.000Z",
      })
      .toISOString()
      .slice(0, 10),
    o_total: faker.commerce.price({ min: 1, max: 10000, dec: 2 }),
  };
};

module.exports = createOrder;
