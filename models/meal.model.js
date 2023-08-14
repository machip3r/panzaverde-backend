const mealModel = () => {};
const connection = require("../config/connection");

mealModel.allSocialNetworks = (data, callback) =>
  connection.query(
    "SELECT id_social_network, sn_name FROM pvSocialNetwork",
    data,
    callback
  );

mealModel.allRoutes = (data, callback) =>
  connection.query("SELECT id_route, r_name FROM pvRoute", data, callback);

mealModel.allClients = (data, callback) =>
  connection.query(
    "SELECT c.id_client, c.c_name, c.c_address, c.c_phone, sn.sn_name, c.c_status FROM pvClient c INNER JOIN pvSocialNetwork sn ON c.id_social_network = sn.id_social_network",
    data,
    callback
  );

mealModel.allSubscriptionsByClient = (data, callback) =>
  connection.query(
    "SELECT s.id_subscription, c.c_name, DATE_FORMAT(s.s_start_date,'%d/%m/%Y') AS s_start_date, DATE_FORMAT(s.s_final_date,'%d/%m/%Y') AS s_final_date, s.s_status FROM pvSubscription s INNER JOIN pvClient c ON s.id_client = c.id_client WHERE c.id_client = ?",
    data,
    callback
  );

mealModel.allDays = (data, callback) =>
  connection.query("SELECT id_day, d_name FROM pvDay", data, callback);

mealModel.allTimes = (data, callback) =>
  connection.query("SELECT id_time, t_name FROM pvTime", data, callback);

mealModel.allMealTypes = (data, callback) =>
  connection.query(
    "SELECT id_meal_type, mt_name FROM pvMealType",
    data,
    callback
  );

mealModel.allPlansBySubscription = (data, callback) =>
  connection.query(
    "SELECT d.d_name, mt.mt_name, t.t_name, p.p_quantity FROM pvPlan p INNER JOIN pvSubscription s ON p.id_subscription = s.id_subscription INNER JOIN pvDay d ON p.id_day = d.id_day INNER JOIN pvMealType mt ON p.id_meal_type = mt.id_meal_type INNER JOIN pvTime t ON p.id_time = t.id_time WHERE s.id_subscription = ?",
    data,
    callback
  );

mealModel.allMeals = (data, callback) =>
  connection.query(
    "SELECT c.c_name, c.c_address, c.c_phone, sn.sn_name, s.s_specification, s.s_status, DATE_FORMAT(s.s_start_date,'%d/%m/%Y') AS s_start_date, DATE_FORMAT(s.s_final_date,'%d/%m/%Y') AS s_final_date, DATE_FORMAT(s.s_payment_date, '%d/%m/%Y') AS s_payment_date, s.s_payment_type, s.s_total, d.d_name, mt.mt_name, t.t_name, p.p_quantity, p.p_price FROM pvPlan p INNER JOIN pvSubscription s ON p.id_subscription = s.id_subscription INNER JOIN pvClient c ON s.id_client = c.id_client INNER JOIN pvSocialNetwork sn ON c.id_social_network = sn.id_social_network INNER JOIN pvDay d ON p.id_day = d.id_day INNER JOIN pvMealType mt ON p.id_meal_type = mt.id_meal_type INNER JOIN pvTime t ON p.id_time = t.id_time",
    data,
    callback
  );

mealModel.addClient = (data, callback) =>
  connection.query(
    "INSERT INTO pvClient (id_social_network, c_name, c_address, c_phone) VALUES (?, ?, ?, ?)",
    data,
    callback
  );
mealModel.addSubscription = (data, callback) =>
  connection.query(
    "INSERT INTO pvSubscription (id_client, id_route, s_specification, s_start_date, s_final_date, s_payment_date, s_payment_type, s_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    data,
    callback
  );
mealModel.addPlan = (data, callback) =>
  connection.query(
    "INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, ?, ?, ?, ?, ?)",
    data,
    callback
  );

mealModel.editClient = (data, callback) =>
  connection.query(
    "UPDATE pvClient SET id_social_network = ?, c_name = ?, c_address = ?, c_phone = ?, c_status = ? WHERE id_client = ?",
    data,
    callback
  );
mealModel.editSubscription = (data, callback) =>
  connection.query(
    "UPDATE pvSubscription SET id_client = ?, id_route = ?, s_specification = ?, s_status = ?, s_start_date = ?, s_final_date = ?, s_payment_date = ?, s_payment_type = ?, s_total = ? WHERE id_subscription = ?",
    data,
    callback
  );
mealModel.editPlan = (data, callback) =>
  connection.query(
    "UPDATE pvPlan SET id_day = ?, id_meal_type = ?, id_time = ?, p_quantity = ?, p_price = ? WHERE id_subscription = ? AND id_day = ? AND id_meal_type = ? AND id_time = ?",
    data,
    callback
  );

mealModel.removeClient = (data, callback) =>
  connection.query("DELETE FROM pvClient WHERE id_client = ?", data, callback);
mealModel.removeSubscription = (data, callback) =>
  connection.query(
    "DELETE FROM pvSubscription WHERE id_subscription = ?",
    data,
    callback
  );
mealModel.removePlan = (data, callback) =>
  connection.query(
    "DELETE FROM pvPlan WHERE id_subscription = ? AND body.id_day = ? body.id_meal_type = ? body.id_time = ?",
    data,
    callback
  );

module.exports = mealModel;
