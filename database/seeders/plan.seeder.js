const createPlan = require("./../factories/plan.factory");

const planSeeder = async (
  db,
  faker,
  maxPlans,
  maxSubscriptions,
  maxDays,
  maxMealTypes,
  maxTimes,
) => {
  let sql =
    "INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES ";
  let plan, key;
  const plans = new Map();
  for (let i = 0; i < maxPlans; i++) {
    plan = createPlan(faker, maxSubscriptions, maxDays, maxMealTypes, maxTimes);

    key = `${plan.id_subscription}-${plan.id_day}-${plan.id_meal_type}-${plan.id_time}`;
    if (plans.get(key)) continue;
    plans.set(key, true);

    sql += `(${plan.id_subscription},
             ${plan.id_day},
             ${plan.id_meal_type},
             ${plan.id_time},
             ${plan.p_quantity},
             ${plan.p_price}),`;
  }
  sql = sql.slice(0, sql.length - 1);

  await db.execute(sql, (error) => {
    if (error) console.log("Error in plan.seeder: " + error);
    else console.log("plan.seeder succesfull execution");
  });
};

module.exports = planSeeder;
