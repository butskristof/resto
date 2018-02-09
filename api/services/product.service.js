var mongoose = require('mongoose');
var Product = require('../models/product.model');

// getDishes
// set options
//		page, limit
// try
// 		Dish.paginate(query, options)

// createDish
// create new object
// try save

exports.createProduct = function (product) {
	var newProduct = new Product({
		name: product.name,
		price: product.price,
		category: product.category
	});

	try {
		var savedProduct = newProduct.save();
		return savedProduct;
	} catch (e) {
		throw Error('Error while trying to create new product.');
	}
};

// updateDish
// get id
// try Dish.findById
// if !oldDish
// update object
// try save object

// deleteDish
// try Dish.remove({_id: id})
