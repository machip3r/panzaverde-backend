const connection = require("../config/connection");

const statisticsModel = () => {};

statisticsModel.getUsersAntiquity = (data, callback) => {
  let sql = `SELECT ps.id_client, ps.s_start_date FROM pvSubscription ps
    INNER JOIN (SELECT pc.id_client FROM pvClient pc WHERE pc.c_status="a") sq
    ON sq.id_client = ps.id_client
    GROUP BY ps.id_client
    HAVING MIN(ps.s_start_date)`;
  connection.execute(sql, data, callback);
};

statisticsModel.getUserAntiquity = (data, callback) => {
  let sql = `SELECT s_start_date FROM pvSubscription 
    WHERE id_client = :id_client 
    ORDER BY s_start_date ASC LIMIT 1`;
  connection.execute(sql, data, callback);
};

statisticsModel.getCountStatusUsers = (data, callback) => {
  let sql = `SELECT c_status, COUNT(id_client) c_clients FROM pvClient 
    GROUP BY c_status`;
  connection.execute(sql, data, callback);
};

statisticsModel.getUserMeanTicket = (data, callback) => {
  let sql = `SELECT pp.p_price FROM pvPlan pp 
      INNER JOIN pvSubscription ps 
      ON (ps.id_client = :id_client and pp.id_subscription = ps.id_subscription)`;
  connection.execute(sql, data, callback);
};

module.exports = statisticsModel;
