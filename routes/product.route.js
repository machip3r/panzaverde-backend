const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.get('/name/:p_name', productController.getByName);
router.post('/add', productController.add);
router.put('/update', productController.update);
router.delete('/delete', productController.delete);

module.exports = router;
