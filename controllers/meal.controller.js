const mealControl = () => {};
const mealModel = require("../models/meal.model");

/* const joi = require("joi");

const songSchemaValidation = joi.object({
  idSong: joi.number().integer(),
  idAlbum: joi.number().integer(),
  sTitle: joi.string().min(5).max(30).required(),
  sLength: joi.string().min(5).max(5).required(),
}); */

mealControl.allSocialNetworks = (request, result) =>
  mealModel.allSocialNetworks([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allRoutes = (request, result) =>
  mealModel.allRoutes([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allClients = (request, result) =>
  mealModel.allClients([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allSubscriptionsByClient = (request, result) =>
  mealModel.allSubscriptionsByClient(
    [request.params.id_client],
    (error, rows) =>
      error
        ? result.status(500).send({ message: error })
        : result.status(200).send(rows)
  );

mealControl.allDays = (request, result) =>
  mealModel.allDays([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allTimes = (request, result) =>
  mealModel.allTimes([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allTimes = (request, result) =>
  mealModel.allTimes([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allMealTypes = (request, result) =>
  mealModel.allMealTypes([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allPlansBySubscription = (request, result) =>
  mealModel.allPlansBySubscription(
    [request.params.id_subscription],
    (error, rows) =>
      error
        ? result.status(500).send({ message: error })
        : result.status(200).send(rows)
  );

mealControl.allMeals = (request, result) =>
  mealModel.allMeals([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.addClient = (request, result) => {
  const body = request.body;

  if (body.id_social_network && body.c_name && body.c_address && body.c_phone)
    mealModel.addClient(
      [body.id_social_network, body.c_name, body.c_address, body.c_phone],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "New Client" })
          : result.status(500).send({ message: "Error on AddClient()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addSubscription = (request, result) => {
  const body = request.body;

  if (
    body.id_client &&
    body.id_route &&
    body.s_specification &&
    body.s_start_date &&
    body.s_final_date &&
    body.s_payment_date &&
    body.s_payment_type &&
    body.s_total
  )
    mealModel.addSubscription(
      [
        body.id_client,
        body.id_route,
        body.s_specification,
        body.s_start_date,
        body.s_final_date,
        body.s_payment_date,
        body.s_payment_type,
        body.s_total,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "New Subscription" })
          : result.status(500).send({ message: "Error on AddSubscription()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlan = (request, result) => {
  const body = request.body;

  if (
    body.id_subscription &&
    body.id_day &&
    body.id_meal_type &&
    body.id_time &&
    body.p_quantity &&
    body.p_price
  )
    mealModel.addPlan(
      [
        body.id_subscription,
        body.id_day,
        body.id_meal_type,
        body.id_time,
        body.p_quantity,
        body.p_price,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "New Plan" })
          : result.status(500).send({ message: "Error on AddPlan()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.editClient = (request, result) => {
  const body = request.body;

  if (
    body.id_client &&
    body.id_social_network &&
    body.c_name &&
    body.c_address &&
    body.c_phone
  )
    mealModel.editClient(
      [
        body.id_client,
        body.id_social_network,
        body.c_name,
        body.c_address,
        body.c_phone,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "New Client" })
          : result.status(500).send({ message: "Error on AddClient()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.editSubscription = (request, result) => {
  const body = request.body;

  if (
    body.id_subscription &&
    body.id_client &&
    body.id_route &&
    body.s_specification &&
    body.s_start_date &&
    body.s_final_date &&
    s_payment_date &&
    s_payment_type &&
    s_total
  )
    mealModel.editSubscription(
      [
        body.id_subscription,
        body.id_client,
        body.id_route,
        body.s_specification,
        body.s_start_date,
        body.s_final_date,
        s_payment_date,
        s_payment_type,
        s_total,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "New Subscription" })
          : result.status(500).send({ message: "Error on AddSubscription()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.editPlan = (request, result) => {
  const body = request.body;

  if (
    body.id_subscription &&
    body.id_day &&
    body.id_meal_type &&
    body.id_time &&
    body.p_quantity &&
    body.p_price
  )
    mealModel.editPlan(
      [
        body.id_subscription,
        body.id_day,
        body.id_meal_type,
        body.id_time,
        body.p_quantity,
        body.p_price,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "New Plan" })
          : result.status(500).send({ message: "Error on AddPlan()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.removeClient = (request, result) =>
  mealModel.removeClient([request.params.id_client], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.removeSubscription = (request, result) =>
  mealModel.removeSubscription(
    [request.params.id_subscription],
    (error, rows) =>
      error
        ? result.status(500).send({ message: error })
        : result.status(200).send(rows)
  );

mealControl.removePlan = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.id_day && body.id_meal_type && body.id_time)
    mealModel.removePlan(
      [body.id_subscription, body.id_day, body.id_meal_type, body.id_time],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
          ? result.status(202).send({ message: "Deleted Plan" })
          : result.status(500).send({ message: "Error on RemovePlan()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

module.exports = mealControl;
