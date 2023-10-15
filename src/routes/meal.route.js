const express = require("express");
const router = express.Router();
const mealControl = require("../controllers/meal.controller");

/*
    FOOD
    - Update and Delete on Client
    - Update and Delete on Subscription
    - Create, Update and Delete on Plan

    - Create, Read, Update and Delete on Route
*/

router.get("/socialNetwork", mealControl.allSocialNetworks);
router.get("/route", mealControl.allRoutes);
router.get("/client", mealControl.allClients);
router.get("/subscription", mealControl.allSubscriptions);
router.get("/subscription/:id_client", mealControl.allSubscriptionsByClient);
router.get("/day", mealControl.allDays);
router.get("/time", mealControl.allTimes);
router.get("/mealType", mealControl.allMealTypes);
router.get("/plan/:id_subscription", mealControl.allPlansBySubscription);
router.get("/", mealControl.allMeals);

router.post("/client/addClient", mealControl.addClient);
router.post("/route/addRoute", mealControl.addRoute);
router.post("/subscription/addSubscription", mealControl.addSubscription);
router.post("/plan/addPlan", mealControl.addPlan);

router.post("/plan/addPlanLDN", mealControl.addPlanLDN);
router.post("/plan/addPlanLDK", mealControl.addPlanLDK);
router.post("/plan/addPlanLDE", mealControl.addPlanLDE);
router.post("/plan/addPlanLDV", mealControl.addPlanLDV);

router.post("/plan/addPlanLCN", mealControl.addPlanLCN);
router.post("/plan/addPlanLCK", mealControl.addPlanLCK);
router.post("/plan/addPlanLCE", mealControl.addPlanLCE);
router.post("/plan/addPlanLCV", mealControl.addPlanLCV);

router.post("/plan/addPlanLCNN", mealControl.addPlanLCNN);
router.post("/plan/addPlanLCNK", mealControl.addPlanLCNK);
router.post("/plan/addPlanLCNE", mealControl.addPlanLCNE);
router.post("/plan/addPlanLCNV", mealControl.addPlanLCNV);


router.post("/plan/addPlanMDN", mealControl.addPlanMDN);
router.post("/plan/addPlanMDK", mealControl.addPlanMDK);
router.post("/plan/addPlanMDE", mealControl.addPlanMDE);
router.post("/plan/addPlanMDV", mealControl.addPlanMDV);

router.post("/plan/addPlanMCN", mealControl.addPlanMCN);
router.post("/plan/addPlanMCK", mealControl.addPlanMCK);
router.post("/plan/addPlanMCE", mealControl.addPlanMCE);
router.post("/plan/addPlanMCV", mealControl.addPlanMCV);

router.post("/plan/addPlanMCNN", mealControl.addPlanMCNN);
router.post("/plan/addPlanMCNK", mealControl.addPlanMCNK);
router.post("/plan/addPlanMCNE", mealControl.addPlanMCNE);
router.post("/plan/addPlanMCNV", mealControl.addPlanMCNV);


router.post("/plan/addPlanMiDN", mealControl.addPlanMiDN);
router.post("/plan/addPlanMiDK", mealControl.addPlanMiDK);
router.post("/plan/addPlanMiDE", mealControl.addPlanMiDE);
router.post("/plan/addPlanMiDV", mealControl.addPlanMiDV);

router.post("/plan/addPlanMiCN", mealControl.addPlanMiCN);
router.post("/plan/addPlanMiCK", mealControl.addPlanMiCK);
router.post("/plan/addPlanMiCE", mealControl.addPlanMiCE);
router.post("/plan/addPlanMiCV", mealControl.addPlanMiCV);

router.post("/plan/addPlanMiCNN", mealControl.addPlanMiCNN);
router.post("/plan/addPlanMiCNK", mealControl.addPlanMiCNK);
router.post("/plan/addPlanMiCNE", mealControl.addPlanMiCNE);
router.post("/plan/addPlanMiCNV", mealControl.addPlanMiCNV);


router.post("/plan/addPlanJDN", mealControl.addPlanJDN);
router.post("/plan/addPlanJDK", mealControl.addPlanJDK);
router.post("/plan/addPlanJDE", mealControl.addPlanJDE);
router.post("/plan/addPlanJDV", mealControl.addPlanJDV);

router.post("/plan/addPlanJCN", mealControl.addPlanJCN);
router.post("/plan/addPlanJCK", mealControl.addPlanJCK);
router.post("/plan/addPlanJCE", mealControl.addPlanJCE);
router.post("/plan/addPlanJCV", mealControl.addPlanJCV);

router.post("/plan/addPlanJCNN", mealControl.addPlanJCNN);
router.post("/plan/addPlanJCNK", mealControl.addPlanJCNK);
router.post("/plan/addPlanJCNE", mealControl.addPlanJCNE);
router.post("/plan/addPlanJCNV", mealControl.addPlanJCNV);


router.post("/plan/addPlanVDN", mealControl.addPlanVDN);
router.post("/plan/addPlanVDK", mealControl.addPlanVDK);
router.post("/plan/addPlanVDE", mealControl.addPlanVDE);
router.post("/plan/addPlanVDV", mealControl.addPlanVDV);

router.post("/plan/addPlanVCN", mealControl.addPlanVCN);
router.post("/plan/addPlanVCK", mealControl.addPlanVCK);
router.post("/plan/addPlanVCE", mealControl.addPlanVCE);
router.post("/plan/addPlanVCV", mealControl.addPlanVCV);

router.post("/plan/addPlanVCNN", mealControl.addPlanVCNN);
router.post("/plan/addPlanVCNK", mealControl.addPlanVCNK);
router.post("/plan/addPlanVCNE", mealControl.addPlanVCNE);
router.post("/plan/addPlanVCNV", mealControl.addPlanVCNV);

router.put("/client/editClient", mealControl.editClient);
router.put("/client/editRoute", mealControl.editClient);
router.put("/subscription/editSubscription", mealControl.editSubscription);
router.put("/plan/editPlan", mealControl.editPlan);

router.delete("/client/removeClient/:id_client", mealControl.removeClient);
router.delete("/route/removeRoute/:id_route", mealControl.removeRoute);
router.delete(
  "/subscription/removeSubscription/:id_subscription",
  mealControl.removeSubscription
);
router.delete("/plan/removePlan", mealControl.removePlan);

module.exports = router;
