var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports.ordersGetAll = function (req, res) {
	console.log("GET all orders");

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
		Order
			.find()
			.skip(offset)
			.limit(count)
			.exec(function (err, orders) {
				// console.log(err);
				if (err) {
					console.log("Error getting orders.");
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
				console.log("Error getting order.");
				response.status = 500;
				response.message = err;
			} else if (!doc) {
				console.log("Order ID not found.");
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
	console.log("POST new order");

	Order
		.create({

			/*
				var orderSchema = new mongoose.Schema({

					products: [{
						product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
						quantity: Number
					}],
					total_price: Number,
					created_at: {
						type: Date,
						"default": Date.now
					},
					updated_at: Date
				});
			 */
			products: [
				{
					product: "5a7ddbc45851a2a1b4c77900",
					quantity: 2
				}
			]
		}, function (err, order) {
			if (err) {
				console.log("Error creating order.")
				res
					.status(400)
					.json(err);
			} else {
				console.log("Order added.");
				res
					.status(201)
					.json(order);
			}
		});
};
