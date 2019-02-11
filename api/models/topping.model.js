var mongoose = require('mongoose');

var toppingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: Number,
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
	created_at: {
		type: Date,
		"default": Date.now
	},
	updated_at: Date
});

toppingSchema.pre('save', function (next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at) {
		this.created_at = currentDate;
	}

	next();
});

mongoose.model("Topping", toppingSchema);
