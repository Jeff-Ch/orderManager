var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var OrderSchema = new mongoose.Schema({
	name: String,
	quantity: String,
	product: String,
	date: Date
});

OrderSchema.path('name').required(true, 'Name cannot be blank');

var Order = mongoose.model('Order', OrderSchema);
