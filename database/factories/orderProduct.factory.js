const createOrderProduct = (faker, maxOrders, maxProducts) => {
  return {
    id_order: faker.number.int({ min: 1, max: maxOrders }),
    id_product: faker.number.int({ min: 1, max: maxProducts }),
    op_quantity: faker.number.int({ min: 1, max: 10 }),
    op_total: faker.commerce.price({ min: 1, max: 10000, dec: 2 }),
  };
};

module.exports = createOrderProduct;
