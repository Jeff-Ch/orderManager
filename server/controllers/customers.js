var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
module.exports = {

	all: function(req, res){
		Customer.find({}, function(err,customers){
			if(err){
				console.log('Error in All method of customers.js controller');
			} else{
				res.json(customers);
			}
		})
	},

	create: function(req, res){
		if(req.body.name == undefined){
			res.json({'name':{'message': 'Name cannot be blank'}});
		}
		var name_entered = req.body.name.toUpperCase();
		var customer = new Customer({name: name_entered, date: req.body.date});
		Customer.find({name: name_entered}, function(err, customers){
			if(err){
			} else if(customers[0]){
				res.json({'name':{'message': 'Name already exists'}});
			} 
			else {
				customer.save(function(err){
					if(err){
						res.json(customer.errors);
					} else{
						res.json();
					}
				})
			}
		})
	},

	remove: function(req, res){
		Customer.remove({_id: req.body.id}, function(err){
			if(err){
				console.log('Error in Remove method of customers.js controller');
			} else{
				res.json();
			}
		})
	}


}

