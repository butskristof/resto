var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.productsGetAll = function (req, res) {
	// set default offset and count
	var offset = 0;
	var count = 100;
	var maxcount = 100;

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
				if (err) {
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
				response.status = 500;
				response.message = err;
			} else if (!doc) {
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

	Product
		.create({
			name: req.body.name,
			price: parseFloat(req.body.price),
			category: req.body.category
		}, function (err, product) {
			if (err) {
				console.log(err);
				res
					.status(400)
					.json(err);
			} else {
				res
					.status(201)
					.json(product);
			}
		});
};

module.exports.productsUpdateOne = function (req, res) {
	Product
		.findByIdAndUpdate(req.params.productid, {
			$set: {
				name: req.body.name,
				price: parseFloat(req.body.price),
				category: req.body.category
			}
		}, function (err, updatedProduct) {
			if (err) {
				res
					.status(400)
					.json(err);
			} else {
				res
					.status(201)
					.json(updatedProduct);
			}
		})
};

module.exports.productsDeleteOne = function (req, res) {
	Product
		.findById(req.params.productid, function(err, productToDelete) {
			if (err) {
				res
					.status(400)
					.json(err);
			} else if (productToDelete == null) {
				res
					.status(400) // correct?
					.json({
						"message" : "Product ID not found"
					});
			} else {
				productToDelete.remove(
					function(err, deletedProduct) {
						if (err) {
							res
								.status(400)
								.json(err);
						} else {
							res
								.status(200)
								.json(deletedProduct);
						}
					});
			}
		});
};

module.exports.productsGetName = function (req, res) {

}
