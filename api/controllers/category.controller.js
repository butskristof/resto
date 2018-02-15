var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports.categoriesGetAll = function (req, res) {
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
		Category
			.find()
			.skip(offset)
			.limit(count)
			.exec(function (err, categories) {
				if (err) {
					res
						.status(500)
						.json(err);
				} else {
					res
						.json(categories);
				}
			});
	}
};

module.exports.categoriesGetOne = function (req, res) {
	var id = req.params.categoryid;

	Category
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
					"message": "Category ID not found"
				};
			}

			res
				.status(response.status)
				.json(response.message);
		});
};

module.exports.categoriesAddOne = function (req, res) {
	Category
		.create({
			name: req.body.name,
			style: req.body.style
		}, function (err, category) {
			if (err) {
				res
					.status(400)
					.json(err);
			} else {
				res
					.status(201)
					.json(category);
			}
		});
};

module.exports.categoriesUpdateOne = function (req, res) {
	Category
		.findByIdAndUpdate(req.params.categoryid, {
			$set: {
				name: req.body.name,
				style: req.body.style
			}
		}, function (err, updatedCategory) {
			if (err) {
				res
					.status(400)
					.json(err);
			} else {
				res
					.status(201)
					.json(updatedCategory);
			}
		})
};

module.exports.categoriesDeleteOne = function (req, res) {
	Category
		.findById(req.params.categoryid, function(err, categoryToDelete) {
			if (err) {
				res
					.status(400)
					.json(err);
			} else if (categoryToDelete == null) {
				res
					.status(400) // correct?
					.json({
						"message" : "Category ID not found"
					});
			} else {
				categoryToDelete.remove(
					function(err, deletedCategory) {
						if (err) {
							res
								.status(400)
								.json(err);
						} else {
							res
								.status(200)
								.json(deletedCategory);
						}
					});
			}
		});
};
