const createProduct = (faker) => {
  return {
    p_name: faker.commerce.productName(),
    p_price: faker.number.float({ min: 1, max: 1000 }),
    p_stock: faker.number.int({ min: 1, max: 100 }),
    p_unit: faker.science.unit().symbol,
  };
};

module.exports = createProduct;
