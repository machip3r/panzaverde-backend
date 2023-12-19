const connection = require("../config/connection");

const statisticsModel = () => {};

statisticsModel.getUsersAntiquity = (data, callback) => {
  let sql = `SELECT ps.id_client, 
                MIN(ps.s_start_date) AS s_start_date
              FROM pvSubscription ps
                INNER JOIN pvClient AS pc
                  ON (pc.c_status = "a" AND 
                      pc.id_client = ps.id_client)
                GROUP BY ps.id_client`;
  connection.execute(sql, data, callback);
};

statisticsModel.getUserAntiquity = (data, callback) => {
  let sql = `SELECT id_client, s_start_date
              FROM pvSubscription
                WHERE id_client = :id_client
                ORDER BY s_start_date ASC LIMIT 1`;
  connection.execute(sql, data, callback);
};

statisticsModel.getCountStatusUsers = (data, callback) => {
  let sql = `SELECT c_status, COUNT(id_client) c_clients 
              FROM pvClient 
                GROUP BY c_status`;
  connection.execute(sql, data, callback);
};

statisticsModel.getUsersMeanTicket = (data, callback) => {
  let sql = `SELECT ps.id_client, AVG(pp.p_price) mean_ticket
              FROM pvPlan AS pp 
                INNER JOIN pvSubscription AS ps
                  ON pp.id_subscription = ps.id_subscription
                GROUP BY ps.id_client`;
  connection.execute(sql, data, callback);
};

statisticsModel.getUserMeanTicket = (data, callback) => {
  let sql = `SELECT ps.id_client, AVG(pp.p_price) mean_ticket
              FROM pvPlan AS pp 
                INNER JOIN pvSubscription AS ps 
                  ON (ps.id_client = :id_client AND 
                      pp.id_subscription = ps.id_subscription)`;
  connection.execute(sql, data, callback);
};

statisticsModel.getYearlySales = async () => {
  let response = [];
  let error = null;
  const sql = `SELECT YEAR(po.o_date) AS o_year, IFNULL(SUM(po.o_total), 0) AS o_total
                FROM pvOrder po
                GROUP BY o_year
                ORDER BY o_year`;
  try {
    response = (await connection.promise().execute(sql))[0];
  } catch (err) {
    error = { msg: "Error getting yearly sales", error: err };
  }
  return { error, response };
};

statisticsModel.getMonthlySales = async ({ year }) => {
  let response = [];
  let error = null;
  const sql = `SELECT MONTH(po.o_date) AS o_month, IFNULL(SUM(po.o_total), 0) AS o_total
                FROM pvOrder po
                  WHERE YEAR(po.o_date)=:year
                GROUP BY o_month
                ORDER BY o_month`;
  try {
    response = (await connection.promise().execute(sql, { year }))[0];
  } catch (err) {
    error = { msg: "Error getting monthly sales", error: err };
  }
  return { error, response };
};

statisticsModel.getDailySales = async ({ date }) => {
  let response = [];
  let error = null;
  const sql = `SELECT WEEKOFYEAR(:date) as week_of_year, pd.id_day, pd.d_name, IFNULL(SUM(po.o_total),0) AS o_total
                FROM pvDay AS pd
                  LEFT JOIN pvOrder AS po
                    ON (YEARWEEK(po.o_date) = YEARWEEK(:date)
                    AND DAYOFWEEK(po.o_date) = pd.id_day+1)
                  GROUP BY pd.id_day
                  ORDER BY pd.id_day`;
  try {
    response = (await connection.promise().execute(sql, { date }))[0];
  } catch (err) {
    error = { msg: "Error in getting daily sales", error: err };
  }
  return { error, response };
};

statisticsModel.getSalesByRange = (data, callback) => {
  let sql = `SELECT op.id_order, op.op_price, po.o_date
                FROM pvOrderProduct op
                  INNER JOIN pvOrder po
                    ON (op.id_order = po.id_order AND
                        po.o_date BETWEEN :start_date AND :end_date)
                ORDER BY po.o_date`;
  connection.execute(sql, data, callback);
};

statisticsModel.getSalesByRangeAndSubscription = (data, callback) => {
  let sql = `SELECT id_subscription, s_total, s_start_date, s_final_date
                FROM pvSubscription
                  WHERE s_start_date BETWEEN :start_date AND :end_date
                ORDER BY id_subscription, s_start_date`;
  connection.execute(sql, data, callback);
};

statisticsModel.getSalesByRangeAndSocialNetwork = (data, callback) => {
  let sql = `SELECT psn.sn_name, SUM(ps.s_total) AS s_total
                FROM pvSubscription AS ps
                  INNER JOIN pvClient AS pc
                    ON ps.id_client = pc.id_client
                  INNER JOIN pvSocialNetwork AS psn
                    ON pc.id_social_network = psn.id_social_network
                  WHERE ps.s_start_date >= :start_date
                GROUP BY psn.id_social_network`;
  connection.execute(sql, data, callback);
};

module.exports = statisticsModel;
