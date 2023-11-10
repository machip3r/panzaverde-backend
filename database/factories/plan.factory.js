const createPlan = (faker, maxSubscriptions, maxDay, maxMealType, maxTime) => {
  return {
    id_subscription: faker.number.int({ min: 1, max: maxSubscriptions }),
    id_day: faker.number.int({ min: 1, max: maxDay }),
    id_meal_type: faker.number.int({ min: 1, max: maxMealType }),
    id_time: faker.number.int({ min: 1, max: maxTime }),
    p_quantity: faker.number.int({ min: 1, max: 10 }),
    p_price: faker.number.int({ min: 1, max: 10000 }),
  };
};

module.exports = createPlan;
