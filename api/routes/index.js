var express = require('express');
var router = express.Router();

var ctrlProduct = require('../controllers/product.controller');

// product routes
router
	.get('/products', ctrlProduct.productsGetAll)
	.post('/products', ctrlProduct.productsAddOne);

router
	.get('/products/:productid', ctrlProduct.productsGetOne);

module.exports = router;
