const createSocialNetwork = (faker) => {
  return {
    sn_name: faker.helpers.ArrayElement(["Instagram", "WhatsApp"]),
  };
};

module.exports = createSocialNetwork;
