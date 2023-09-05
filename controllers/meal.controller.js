const mealControl = () => { };
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

mealControl.allSubscriptions = (request, result) =>
  mealModel.allSubscriptions([], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.allSubscriptionsByClient = (request, result) =>
  mealModel.allSubscriptionsByClient(
    [ request.params.id_client ],
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
    [ request.params.id_subscription ],
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
      [ body.id_social_network, body.c_name, body.c_address, body.c_phone ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "New Client" })
            : result.status(500).send({ message: "Error on AddClient()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addRoute = (request, result) => {
  const body = request.body;

  if (body.r_name && body.r_color)
    mealModel.addRoute(
      [ body.r_name, body.r_color ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "New Route" })
            : result.status(500).send({ message: "Error on AddRoute()" })
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
    body.s_final_date
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
    body.p_quantity
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
        body.id_social_network,
        body.c_name,
        body.c_address,
        body.c_phone,
        body.id_client,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "Updated Client" })
            : result.status(500).send({ message: "Error on EditClient()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.editRoute = (request, result) => {
  const body = request.body;

  if (
    body.id_route &&
    body.r_name &&
    body.r_color
  )
    mealModel.editRoute(
      [
        body.r_name,
        body.r_color,
        body.id_route,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "Updated Client" })
            : result.status(500).send({ message: "Error on EditClient()" })
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
    body.s_final_date
  )
    mealModel.editSubscription(
      [
        body.id_client,
        body.id_route,
        body.s_specification,
        body.s_start_date,
        body.s_final_date,
        s_payment_date,
        s_payment_type,
        s_total,
        body.id_subscription,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "Updated Subscription" })
            : result.status(500).send({ message: "Error on EditSubscription()" })
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
    body.p_quantity
  )
    mealModel.editPlan(
      [
        body.p_quantity,
        body.p_price,
        body.id_subscription,
        body.id_day,
        body.id_meal_type,
        body.id_time,
      ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "Updated Plan" })
            : result.status(500).send({ message: "Error on EditPlan()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.removeClient = (request, result) =>
  mealModel.removeClient([ request.params.id_client ], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.removeRoute = (request, result) =>
  mealModel.removeRoute([ request.params.id_route ], (error, rows) =>
    error
      ? result.status(500).send({ message: error })
      : result.status(200).send(rows)
  );

mealControl.removeSubscription = (request, result) =>
  mealModel.removeSubscription(
    [ request.params.id_subscription ],
    (error, rows) =>
      error
        ? result.status(500).send({ message: error })
        : result.status(200).send(rows)
  );

mealControl.removePlan = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.id_day && body.id_meal_type && body.id_time)
    mealModel.removePlan(
      [ body.id_subscription, body.id_day, body.id_meal_type, body.id_time ],
      (error, rows) =>
        error
          ? result.status(500).send({ message: error })
          : rows.affectedRows > 0
            ? result.status(202).send({ message: "Deleted Plan" })
            : result.status(500).send({ message: "Error on RemovePlan()" })
    );
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLDN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLDN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLDK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLDK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLDE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLDE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLDV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLDV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCNN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCNN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCNK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCNK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCNE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCNE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanLCNV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanLCNV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};


mealControl.addPlanMDN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMDN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMDK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMDK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMDE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMDE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMDV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMDV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCNN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCNN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCNK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCNK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCNE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCNE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMCNV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMCNV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};


mealControl.addPlanMiDN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiDN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiDK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiDK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiDE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiDE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiDV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiDV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCNN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCNN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCNK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCNK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCNE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCNE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanMiCNV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanMiCNV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};


mealControl.addPlanJDN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJDN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJDK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJDK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJDE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJDE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJDV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJDV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCNN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCNN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCNK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCNK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCNE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCNE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanJCNV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanJCNV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};


mealControl.addPlanVDN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVDN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVDK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVDK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVDE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVDE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVDV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVDV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCNN = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCNN([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCNK = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCNK([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCNE = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCNE([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

mealControl.addPlanVCNV = (request, result) => {
  const body = request.body;

  if (body.id_subscription && body.p_quantity)
    mealModel.addPlanVCNV([ body.id_subscription, body.p_quantity ], (error, rows) => error ? result.status(500).send({ message: error }) : rows.affectedRows > 0 ? result.status(202).send({ message: "Added Plan" }) : result.status(500).send({ message: "Error on AddPlan()" }));
  else result.status(401).send({ message: "Empty Values" });
};

module.exports = mealControl;
