const express = require("express");
const router = express.Router();

const statisticsController = require("../controllers/statistics.controller");

router.get("/users", statisticsController.getUsersAntiquity);
router.get(
  "/users/count_by_status",
  statisticsController.getUsersCountByStatus,
);
router.get("/users/:id_client", statisticsController.getUserStatistics);
router.get("/tickets", statisticsController.getUserStatistics);
router.get("/tickets/:id_user", statisticsController.getUserMeanTicket);
router.get("/sales", statisticsController.getUserMeanTicket);
router.get("/meals", statisticsController.getUserMeanTicket);
router.get("/platforms", statisticsController.getUserMeanTicket);

module.exports = router;
