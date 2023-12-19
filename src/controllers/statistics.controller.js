const statisticsModel = require("../models/statistics.model");

const statisticsController = () => {};

statisticsController.getUsersAntiquity = (req, res) => {
  const params = req.params;
  statisticsModel.getUsersAntiquity(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getUserStatistics = (req, res) => {
  const params = req.params;
  statisticsModel.getUserAntiquity(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getUsersCountByStatus = (req, res) => {
  const params = req.params;
  statisticsModel.getCountStatusUsers(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getUsersMeanTicket = (req, res) => {
  const params = req.params;
  statisticsModel.getUsersMeanTicket(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getUserMeanTicket = (req, res) => {
  const params = req.params;
  statisticsModel.getUserMeanTicket(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getSalesByRange = (req, res) => {
  const params = req.params;
  statisticsModel.getSalesByRange(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getSalesByRangeAndSubscription = (req, res) => {
  const params = req.params;
  statisticsModel.getSalesByRangeAndSubscription(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getSalesByRangeAndSocialNetwork = (req, res) => {
  const params = req.params;
  statisticsModel.getSalesByRangeAndSocialNetwork(params, (error, rows) => {
    if (error) res.status(500).send({ message: error });
    else res.status(200).send(rows);
  });
};

statisticsController.getMonthlySales = async (req, res) => {
  const year = req.params.year;
  const { error, response } = await statisticsModel.getMonthlySales({ year });
  error ? res.status(500).send(error) : res.status(200).send(response);
};

statisticsController.getDailySales = async (req, res) => {
  const date = req.params.date;
  const { error, response } = await statisticsModel.getDailySales({ date });
  error ? res.status(500).send(error) : res.status(200).send(response);
};

statisticsController.getYearlySales = async (req, res) => {
  const { error, response } = await statisticsModel.getYearlySales();
  error ? res.status(500).send(error) : res.status(200).send(response);
};

module.exports = statisticsController;
