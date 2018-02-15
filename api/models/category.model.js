var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	style: String,
	created_at: {
		type: Date,
		"default": Date.now
	},
	updated_at: Date
});

categorySchema.pre('save', function (next) {
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at) {
		this.created_at = currentDate;
	}

	next();
});

mongoose.model('Category', categorySchema);
