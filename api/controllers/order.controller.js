var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var printing = require('../../printing/printer');

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
				createTicket(req);
				res
					.status(201)
					.json(order);
			}
		});
};

const ticketIntro = ["Tafel:", " ", " ", "============================", " ", "Bestelde gerechten:"];
const ticketMiddle = [" ", "============================", " "];
const ticketOutro = [" ", " ", " ", " ", "© 2019 KLJ Wiekevorst"];

function createTicket(order) {
	// add exception for soup
	let ticket = ticketIntro.slice();
	let containsSoup = false;
	let soupticket = ticketIntro.slice();

	order.body.orderlines.forEach(ol => {
		if (ol.fullname.toLowerCase().includes("soep")) {
			containsSoup = true;
			soupticket.push(`${ol.quantity}x ${ol.fullname}`);
		} else {
			ticket.push(`${ol.quantity}x ${ol.fullname}`);
		}
	});

	let total;
	if (order.body.leiding || order.body.helper) {
		total = 0.0;
	} else {
		total = order.body.totalprice;
	}

	ticket.push(...ticketMiddle.slice());
	soupticket.push(...ticketMiddle.slice());

	ticket.push(`Totaal: ${total.toFixed(2)} EUR`); // align total left

	ticket.push(...ticketOutro.slice());
	soupticket.push(...ticketOutro.slice());

	printing.printText(ticket);
	if (containsSoup) {
		printing.printText(soupticket);
	}

	// ticket.forEach(line => console.log(line));
}