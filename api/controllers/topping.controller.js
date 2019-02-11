var mongoose = require('mongoose');
var Topping = mongoose.model('Topping');
var Product = mongoose.model('Product');

module.exports.toppingsGetAll = function(req,res) {
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
		Topping
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

module.exports.toppingsGetForProduct = function (req, res) {
	let id = req.params.productid;

	Product
		.findById(id)
		.select("toppings")
		.exec(function (err, toppings) {
			if (err) {
				res
					.status(500)
					.json(err);
			} else {
				res
					.json(toppings);
			}
		});
};

module.exports.toppingsAddOne = function (req, res) {
	Topping
		.create({
			name: req.body.name,
			price: parseFloat(req.body.price),
			product: req.body.product
		}, function (err, topping) {
			if (err) {
				console.log(err);
				res
					.status(400)
					.json(err);
			} else {
				Product
					.update(
						{_id: req.body.product},
						{$push : {toppings: topping}},
					)
					.exec();

				res
					.status(201)
					.json(topping);
			}
		});
};
