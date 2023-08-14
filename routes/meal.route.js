const express = require("express");
const router = express.Router();
const mealControl = require("../controllers/meal.controller");

/*
    FOOD
    - Read Social Networks
    - Create, Read, Update and Delete on Client
    - Create, Read, Update and Delete on Subscription
    - Read on Day
    - Read on Time
    - Read on Meal Type
    - Create, Read, Update and Delete on Plan
*/

router.get("/socialNetwork", mealControl.allSocialNetworks);
router.get("/route", mealControl.allRoutes);
router.get("/client", mealControl.allClients);
router.get("/subscription/:id_client", mealControl.allSubscriptionsByClient);
router.get("/day", mealControl.allDays);
router.get("/time", mealControl.allTimes);
router.get("/mealType", mealControl.allMealTypes);
router.get("/plan/:id_subscription", mealControl.allPlansBySubscription);
router.get("/", mealControl.allMeals);

router.post("/client/addClient", mealControl.addClient);
router.post("/subscription/addSubscription", mealControl.addSubscription);
router.post("/plan/addPlan", mealControl.addPlan);

router.put("/client/editClient", mealControl.editClient);
router.put("/subscription/editSubscription", mealControl.editSubscription);
router.put("/plan/editPlan", mealControl.editPlan);

router.delete("/client/removeClient/:id_client", mealControl.removeClient);
router.delete(
  "/subscription/removeSubscription/:id_subscription",
  mealControl.removeSubscription
);
router.delete("/plan/removePlan", mealControl.removePlan);

module.exports = router;
