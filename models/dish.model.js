var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
	name: {type: String, required: true},
	price: Double,
	created_at: Date,
	updated_at: Date
});

dishSchemah.pre('save', function (next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at) {
		this.created_at = currentDate;
	}

	next();
});

var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;