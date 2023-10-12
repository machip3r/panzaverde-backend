const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get('/id/:id_order', orderController.getById);
router.get('/id/:id_order/detail', orderController.getDetail);
router.get('/date/:o_date', orderController.getByDate);
router.get('/date/:o_date/:count', orderController.getByDate);
router.get('/date/:o_date/:offset/:count', orderController.getByDate);
router.get('/', orderController.getAll);
router.get('/:count', orderController.getAll);
router.get('/:offset/:count', orderController.getAll);
router.post('/', orderController.add);
router.put('/', orderController.update);
router.delete('/', orderController.delete);

module.exports = router;
