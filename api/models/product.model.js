var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	price: Number,
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	toppings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topping' }],
	created_at: {
		type: Date,
		"default": Date.now
	},
	updated_at: Date
});

productSchema.pre('save', function (next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at) {
		this.created_at = currentDate;
	}

	next();
});

mongoose.model('Product', productSchema);
