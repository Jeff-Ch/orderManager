var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: String,
	product: String,
	quantity: Number,
	date: Date
});

CustomerSchema.path('name').required(true, 'Name cannot be blank');

var Customer = mongoose.model('Customer', CustomerSchema);
