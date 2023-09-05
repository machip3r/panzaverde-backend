const mealModel = () => { };
const connection = require("../config/connection");

mealModel.allSocialNetworks = (data, callback) =>
  connection.query(
    "SELECT id_social_network, sn_name FROM pvSocialNetwork",
    data,
    callback
  );

mealModel.allRoutes = (data, callback) =>
  connection.query("SELECT id_route, r_name, r_color FROM pvRoute", data, callback);

mealModel.allClients = (data, callback) =>
  connection.query(
    "SELECT c.id_client, sn.id_social_network, c.c_name, c.c_address, c.c_phone, sn.sn_name, c.c_status FROM pvClient c INNER JOIN pvSocialNetwork sn ON c.id_social_network = sn.id_social_network",
    data,
    callback
  );

mealModel.allSubscriptions = (data, callback) =>
  connection.query(
    "SELECT s.id_subscription, c.c_name, DATE_FORMAT(s.s_start_date,'%d/%m/%Y') AS s_start_date, DATE_FORMAT(s.s_final_date,'%d/%m/%Y') AS s_final_date, s_specification, s_payment_date, s_payment_type, s.s_status FROM pvSubscription s INNER JOIN pvClient c ON s.id_client = c.id_client",
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

/* mealModel.allMeals = (data, callback) =>
  connection.query(
    "SELECT c.c_name, c.c_address, c.c_phone, sn.sn_name, s.s_specification, s.s_status, DATE_FORMAT(s.s_start_date,'%d/%m/%Y') AS s_start_date, DATE_FORMAT(s.s_final_date,'%d/%m/%Y') AS s_final_date, DATE_FORMAT(s.s_payment_date, '%d/%m/%Y') AS s_payment_date, s.s_payment_type, s.s_total, d.d_name, mt.mt_name, t.t_name, p.p_quantity, p.p_price FROM pvPlan p INNER JOIN pvSubscription s ON p.id_subscription = s.id_subscription INNER JOIN pvClient c ON s.id_client = c.id_client INNER JOIN pvSocialNetwork sn ON c.id_social_network = sn.id_social_network INNER JOIN pvDay d ON p.id_day = d.id_day INNER JOIN pvMealType mt ON p.id_meal_type = mt.id_meal_type INNER JOIN pvTime t ON p.id_time = t.id_time",
    data,
    callback
  ); */

mealModel.allMeals = (data, callback) =>
  connection.query(
    "SELECT s.id_subscription, c.c_name, c.c_address, c.c_phone, sn.sn_name, s.s_specification, s.s_status, DATE_FORMAT(s.s_start_date,'%d/%m/%Y') AS s_start_date, DATE_FORMAT(s.s_final_date,'%d/%m/%Y') AS s_final_date, DATE_FORMAT(s.s_payment_date, '%d/%m/%Y') AS s_payment_date, s.s_payment_type, s.s_total FROM pvSubscription s INNER JOIN pvClient c ON s.id_client = c.id_client INNER JOIN pvSocialNetwork sn ON c.id_social_network = sn.id_social_network",
    data,
    callback
  );

mealModel.addClient = (data, callback) =>
  connection.query(
    "INSERT INTO pvClient (id_social_network, c_name, c_address, c_phone) VALUES (?, ?, ?, ?)",
    data,
    callback
  );

mealModel.addRoute = (data, callback) =>
  connection.query(
    "INSERT INTO pvRoute (r_name, r_color) VALUES (?, ?)",
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
    "UPDATE pvClient SET id_social_network = ?, c_name = ?, c_address = ?, c_phone = ? WHERE id_client = ?",
    data,
    callback
  );

mealModel.editRoute = (data, callback) =>
  connection.query(
    "UPDATE pvRoute SET r_name = ?, r_color = ? WHERE id_route = ?",
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
    "UPDATE pvPlan SET p_quantity = ?, p_price = ? WHERE id_subscription = ? AND id_day = ? AND id_meal_type = ? AND id_time = ?",
    data,
    callback
  );

mealModel.removeClient = (data, callback) =>
  connection.query("DELETE FROM pvClient WHERE id_client = ?", data, callback);

mealModel.removeRoute = (data, callback) =>
  connection.query("DELETE FROM pvRoute WHERE id_route = ?", data, callback);

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

mealModel.addPlanLDN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 1, 1, ?, 100.00)", data, callback);
mealModel.addPlanLDK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 2, 1, ?, 100.00)", data, callback);
mealModel.addPlanLDE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 3, 1, ?, 100.00)", data, callback);
mealModel.addPlanLDV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 4, 1, ?, 100.00)", data, callback);
mealModel.addPlanLCN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 1, 2, ?, 100.00)", data, callback);
mealModel.addPlanLCK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 2, 2, ?, 100.00)", data, callback);
mealModel.addPlanLCE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 3, 2, ?, 100.00)", data, callback);
mealModel.addPlanLCV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 4, 2, ?, 100.00)", data, callback);
mealModel.addPlanLCNN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 1, 3, ?, 100.00)", data, callback);
mealModel.addPlanLCNK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 2, 3, ?, 100.00)", data, callback);
mealModel.addPlanLCNE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 3, 3, ?, 100.00)", data, callback);
mealModel.addPlanLCNV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 1, 4, 3, ?, 100.00)", data, callback);


mealModel.addPlanMDN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 1, 1, ?, 100.00)", data, callback);
mealModel.addPlanMDK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 2, 1, ?, 100.00)", data, callback);
mealModel.addPlanMDE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 3, 1, ?, 100.00)", data, callback);
mealModel.addPlanMDV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 4, 1, ?, 100.00)", data, callback);
mealModel.addPlanMCN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 1, 2, ?, 100.00)", data, callback);
mealModel.addPlanMCK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 2, 2, ?, 100.00)", data, callback);
mealModel.addPlanMCE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 3, 2, ?, 100.00)", data, callback);
mealModel.addPlanMCV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 4, 2, ?, 100.00)", data, callback);
mealModel.addPlanMCNN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 1, 3, ?, 100.00)", data, callback);
mealModel.addPlanMCNK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 2, 3, ?, 100.00)", data, callback);
mealModel.addPlanMCNE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 3, 3, ?, 100.00)", data, callback);
mealModel.addPlanMCNV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 2, 4, 3, ?, 100.00)", data, callback);


mealModel.addPlanMiDN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 1, 1, ?, 100.00)", data, callback);
mealModel.addPlanMiDK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 2, 1, ?, 100.00)", data, callback);
mealModel.addPlanMiDE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 3, 1, ?, 100.00)", data, callback);
mealModel.addPlanMiDV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 4, 1, ?, 100.00)", data, callback);
mealModel.addPlanMiCN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 1, 2, ?, 100.00)", data, callback);
mealModel.addPlanMiCK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 2, 2, ?, 100.00)", data, callback);
mealModel.addPlanMiCE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 3, 2, ?, 100.00)", data, callback);
mealModel.addPlanMiCV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 4, 2, ?, 100.00)", data, callback);
mealModel.addPlanMiCNN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 1, 3, ?, 100.00)", data, callback);
mealModel.addPlanMiCNK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 2, 3, ?, 100.00)", data, callback);
mealModel.addPlanMiCNE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 3, 3, ?, 100.00)", data, callback);
mealModel.addPlanMiCNV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 3, 4, 3, ?, 100.00)", data, callback);


mealModel.addPlanJDN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 1, 1, ?, 100.00)", data, callback);
mealModel.addPlanJDK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 2, 1, ?, 100.00)", data, callback);
mealModel.addPlanJDE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 3, 1, ?, 100.00)", data, callback);
mealModel.addPlanJDV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 4, 1, ?, 100.00)", data, callback);
mealModel.addPlanJCN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 1, 2, ?, 100.00)", data, callback);
mealModel.addPlanJCK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 2, 2, ?, 100.00)", data, callback);
mealModel.addPlanJCE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 3, 2, ?, 100.00)", data, callback);
mealModel.addPlanJCV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 4, 2, ?, 100.00)", data, callback);
mealModel.addPlanJCNN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 1, 3, ?, 100.00)", data, callback);
mealModel.addPlanJCNK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 2, 3, ?, 100.00)", data, callback);
mealModel.addPlanJCNE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 3, 3, ?, 100.00)", data, callback);
mealModel.addPlanJCNV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 4, 4, 3, ?, 100.00)", data, callback);


mealModel.addPlanVDN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 1, 1, ?, 100.00)", data, callback);
mealModel.addPlanVDK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 2, 1, ?, 100.00)", data, callback);
mealModel.addPlanVDE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 3, 1, ?, 100.00)", data, callback);
mealModel.addPlanVDV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 4, 1, ?, 100.00)", data, callback);
mealModel.addPlanVCN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 1, 2, ?, 100.00)", data, callback);
mealModel.addPlanVCK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 2, 2, ?, 100.00)", data, callback);
mealModel.addPlanVCE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 3, 2, ?, 100.00)", data, callback);
mealModel.addPlanVCV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 4, 2, ?, 100.00)", data, callback);
mealModel.addPlanVCNN = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 1, 3, ?, 100.00)", data, callback);
mealModel.addPlanVCNK = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 2, 3, ?, 100.00)", data, callback);
mealModel.addPlanVCNE = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 3, 3, ?, 100.00)", data, callback);
mealModel.addPlanVCNV = (data, callback) => connection.query("INSERT INTO pvPlan (id_subscription, id_day, id_meal_type, id_time, p_quantity, p_price) VALUES (?, 5, 4, 3, ?, 100.00)", data, callback);

module.exports = mealModel;
