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
		var customer = new Customer({name: req.body.name, date: req.body.date});
		Customer.find({name: req.body.name}, function(err, customers){
			if(err){
			} else if(customers[0]){
				res.json({'msg': 'Name already exists'});
			} 
			else {
				customer.save(function(err){
					if(err){
						console.log('Error in Create method of customers.js controller');
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

