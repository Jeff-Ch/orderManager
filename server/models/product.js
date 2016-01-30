var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var urlValidator = [
	validate({
    validator: 'isURL',
    message: 'Invalid URL'
  })
];

var nameValidator = [
	validate({
    validator: 'isLength',
    arguments: [3, ],
    message: 'Name should be greater {ARGS[0]} characters'
  }),
  validate({
    validator: 'isAscii',
    passIfEmpty: true,
    message: 'Name should contain alphabetic characters only'
  })
];

var priceValidator = [
	validate({
    validator: 'isFloat',
    message: 'Price is not an integer'
  })
];

var quantityValidator = [
	validate({
    validator: 'isInt',
    message: 'Quantity is not an integer'
  })
];

var ProductSchema = new mongoose.Schema({
	name: {type: String, required: true, validate: nameValidator},
	url: {type: String, required: true, validate: urlValidator},
	description: {type: String, required: true},
	price: {type: Number, required: true, validate: priceValidator},
	quantity: {type: Number, required: true, validate: quantityValidator}
});

var Product = mongoose.model('Product', ProductSchema);
