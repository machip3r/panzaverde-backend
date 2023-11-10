const createClient = (faker) => {
  return {
    id_social_network: faker.helpers.arrayElement([1, 2]),
    c_name: faker.person.fullName(),
    c_address: faker.location.city(),
    c_phone: faker.string.numeric(10),
    c_status: faker.helpers.arrayElement(["a", "o", "i"]),
  };
};

module.exports = createClient;
