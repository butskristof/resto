var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.productsGetAll = function (req, res) {
	console.log("GET all products");

	// set default offset and count
	var offset = 0;
	var count = 10;
	var maxcount = 50;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}
	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400) // bad req
			.json({
				"message": "If supplied in query string, count and offset should be integers."
			});
		return;
	} else if (count > maxcount) {
		res
			.status(400)
			.json({
				"message": "Requested count is higher than the tolerated maximum of " + maxcount
			});
		return;
	} else {
		Product
			.find()
			.skip(offset)
			.limit(count)
			.exec(function (err, products) {
				console.log(err);
				if (err) {
					console.log("Error getting products.");
					res
						.status(500)
						.json(err);
				} else {
					res
						.json(products);
				}
			});
	}
};

module.exports.productsGetOne = function (req, res) {
	var id = req.params.productid;

	Product
		.findById(id)
		.exec(function(err, doc) {
			// set default
			var response = {
				status: 200,
				message: doc
			};

			if (err) {
				console.log("Error getting product.");
				response.status = 500;
				response.message = err;
			} else if (!doc) {
				console.log("Product ID not found.");
				response.status = 404;
				response.message = {
					"message": "Product ID not found"
				};
			}

			res
				.status(response.status)
				.json(response.message);
		});
};

module.exports.productsAddOne = function (req, res) {
	console.log("POST new product");

	Product
		.create({
			name: req.body.name,
			price: parseFloat(req.body.price)
			// category: req.body.category
		}, function (err, product) {
			if (err) {
				console.log("Error creating product.")
				res
					.status(400)
					.json(err);
			} else {
				console.log("Product added.");
				res
					.status(201)
					.json(product);
			}
		});
};

