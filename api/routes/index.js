var express = require('express');
var router = express.Router();

var ctrlProduct = require('../controllers/product.controller');
var ctrlOrder = require('../controllers/order.controller');
var ctrlCategory = require('../controllers/category.controller');

// product routes
router
	.get('/products', ctrlProduct.productsGetAll)
	.post('/products', ctrlProduct.productsAddOne);

router
	.get('/products/:productid', ctrlProduct.productsGetOne)
	.put('/products/:productid', ctrlProduct.productsUpdateOne)
	.delete('/products/:productid', ctrlProduct.productsDeleteOne);

// order routes
router
	.get('/orders', ctrlOrder.ordersGetAll)
	.post('/orders', ctrlOrder.ordersAddOne);

router
	.get('/orders/:orderid', ctrlOrder.ordersGetOne);

// category routes
router
	.get('/categories', ctrlCategory.categoriesGetAll)
	.post('/categories', ctrlCategory.categoriesAddOne);

router
	.get('/categories/:categoryid', ctrlCategory.categoriesGetOne)
	.put('/categories/:categoryid', ctrlCategory.categoriesUpdateOne)
	.delete('/categories/:categoryid', ctrlCategory.categoriesDeleteOne);

module.exports = router;
