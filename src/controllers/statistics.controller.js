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

module.exports = statisticsController;
