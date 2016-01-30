var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var ProductSchema = new mongoose.Schema({
	name: {type: String, required: true},
	url: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	quantity: {type: Number, required: true}
});

var Product = mongoose.model('Product', ProductSchema);
