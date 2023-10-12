const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get('/id/:id_product', productController.getById);
router.get('/name/:p_name', productController.getByName);
router.get('/name/:p_name/:count', productController.getByName);
router.get('/name/:p_name/:offset/:count', productController.getByName);
router.get('/', productController.getAll);
router.get('/:count', productController.getAll);
router.get('/:offset/:count', productController.getAll);
router.post('/', productController.add);
router.put('/', productController.update);
router.delete('/', productController.delete);

module.exports = router;
