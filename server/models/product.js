var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	name: String,
	url: String,
	description: String,
	quantity: String
});

ProductSchema.path('name').required(true, 'Name cannot be blank');

var Product = mongoose.model('Product', ProductSchema);
