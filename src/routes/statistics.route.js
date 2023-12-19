const express = require("express");
const router = express.Router();

const statisticsController = require("../controllers/statistics.controller");

router.get("/users", statisticsController.getUsersAntiquity);
router.get(
  "/clients/status-accounts",
  statisticsController.getUsersCountByStatus,
);
router.get("/users/:id_client", statisticsController.getUserStatistics);
router.get("/tickets", statisticsController.getUsersMeanTicket);
router.get("/tickets/:id_client", statisticsController.getUserMeanTicket);
router.get("/status/clients", statisticsController.getUsersCountByStatus);
router.get("/sales/yearly", statisticsController.getYearlySales);
router.get("/sales/monthly/:year", statisticsController.getMonthlySales);
router.get("/sales/daily/:date", statisticsController.getDailySales);
router.get(
  "/sales/:start_date/:end_date",
  statisticsController.getSalesByRange,
);
router.get(
  "/sales/subscription/:start_date/:end_date",
  statisticsController.getSalesByRangeAndSubscription,
);
router.get(
  "/sales/socialNetwork/:start_date/:end_date",
  statisticsController.getSalesByRangeAndSocialNetwork,
);

module.exports = router;
