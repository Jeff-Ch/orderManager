var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var ProductSchema = new mongoose.Schema({
	name: String,
	url: String,
	description: String,
	price: Number,
	quantity: String
});

ProductSchema.path('name').required(true, 'Name cannot be blank');
ProductSchema.path('url').required(true, 'Image(URL) cannot be blank');
ProductSchema.path('description').required(true, 'Description cannot be blank');
ProductSchema.path('quantity').required(true, 'Initial Quantity cannot be blank');
ProductSchema.path('price').required(true, 'Price cannot be blank');

var Product = mongoose.model('Product', ProductSchema);
