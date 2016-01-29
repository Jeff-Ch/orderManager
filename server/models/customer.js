var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
	validate({
    validator: 'isLength',
    arguments: [3, ],
    message: 'Name should be greater {ARGS[0]} characters'
  }),
  validate({
    validator: 'isAlpha',
    passIfEmpty: true,
    message: 'Name should contain alphabetic characters only'
  })
];

var CustomerSchema = new mongoose.Schema({
	name: {type: String, required: true, validate: nameValidator},
	date: Date
});

var Customer = mongoose.model('Customer', CustomerSchema);
