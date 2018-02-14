var express = require('express');
var router = express.Router();

var ctrlProduct = require('../controllers/product.controller');
var ctrlOrder = require('../controllers/order.controller');

// product routes
router
	.get('/products', ctrlProduct.productsGetAll)
	.post('/products', ctrlProduct.productsAddOne);

router
	.get('/products/:productid', ctrlProduct.productsGetOne)
	.put('/products/:productid', ctrlProduct.productsUpdateOne);

// order routes
router
	.get('/orders', ctrlOrder.ordersGetAll)
	.post('/orders', ctrlOrder.ordersAddOne);

router
	.get('/orders/:orderid', ctrlOrder.ordersGetOne);

module.exports = router;
