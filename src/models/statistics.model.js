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
