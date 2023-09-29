const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);
router.get('/:id/detail', orderController.getDetail);
router.get('/find/:o_status', orderController.getByStatus);
router.post('/add', orderController.add);
router.put('/update', orderController.update);
router.delete('/delete', orderController.delete);

module.exports = router;
