var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({

	products: [{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
		quantity: Number
	}],
	leiding: {
		type: Boolean,
		"default": false
	},
	helper: {
		type: Boolean,
		"default": false
	},
	total_price: Number,
	created_at: {
		type: Date,
		"default": Date.now
	},
	updated_at: Date
});

orderSchema.pre('save', function (next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at) {
		this.created_at = currentDate;
	}

	next();
});

mongoose.model('Order', orderSchema);
