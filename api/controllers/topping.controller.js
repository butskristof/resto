var mongoose = require('mongoose');
var Topping = mongoose.model('Topping');
var Product = mongoose.model('Product');

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
