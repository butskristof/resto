var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports.ordersGetAll = function (req, res) {
	// set default offset and count
	var offset = 0;
	var count = 100;
	var maxcount = 1000;


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
		Order
			.find()
			.skip(offset)
			.limit(count)
			.exec(function (err, orders) {
				if (err) {
					res
						.status(500)
						.json(err);
				} else {
					res
						.json(orders);
				}
			});
	}
};

module.exports.ordersGetOne = function (req, res) {
	var id = req.params.orderid;

	Order
		.findById(id)
		.exec(function (err, doc) {
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
					"message": "Order ID not found"
				};
			}

			res
				.status(response.status)
				.json(response.message);
		});
};

module.exports.ordersAddOne = function (req, res) {
	Order
		.create({
			products: req.body.orderlines,
			total_price: req.body.totalprice,
			leiding: req.body.leiding,
			helper: req.body.helper
		}, function (err, order) {
			if (err) {
				res
					.status(400)
					.json(err);
			} else {
				res
					.status(201)
					.json(order);
			}
		});
};
