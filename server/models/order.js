var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var OrderSchema = new mongoose.Schema({
	name: {type: String, required: true},
	quantity: {type: String, required: true},
	product: {type: String, required: true},
	status: {type: String, required: true},
	total: Number,
	date: Date
});


var Order = mongoose.model('Order', OrderSchema);
