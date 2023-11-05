const createRoute = (faker) => {
  return {
    r_name: faker.person.firstName(),
    c_status: faker.color.human(),
  };
};

module.exports = createRoute;
