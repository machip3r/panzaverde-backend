const express = require("express");
const router = express.Router();

const mealControl = require("../controllers/meal.controller");

router.get("/socialNetwork", mealControl.allSocialNetworks);

module.exports = router;
