const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/id/:id_product", productController.getById);
router.get("/name/:p_name", productController.getByName);
router.get("/name/:p_name/:limit/:page", productController.getByNamePaginated);
router.get("/", productController.getAll);
router.get("/:limit/:page", productController.getAllPaginated);

router.post("/", productController.add);
router.put("/", productController.update);
router.delete("/", productController.delete);

module.exports = router;
