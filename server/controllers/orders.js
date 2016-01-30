var mongoose = require('mongoose');
var Order = mongoose.model('Order');
module.exports = {

	all: function(req, res){
		Order.find({}, function(err,orders){
			if(err){
				console.log('Error in All method of orders.js controller');
			} else{
				res.json(orders);
			}
		})
	},

	create: function(req, res){
		var order = new Order({name: req.body.name, product: req.body.product, quantity: req.body.quantity, date: req.body.date, status: req.body.status, total: req.body.total});
		order.save(function(err){
			if(err){
				res.json(err.errors);
			} else{
				res.json();
			}
		})
	},

	remove: function(req, res){
		Order.remove({_id: req.body.id}, function(err){
			if(err){
				console.log('Error in Remove method of orders.js controller');
			} else{
				res.json();
			}
		})
	},

	one: function(req, res){
		Order.find({_id: req.body.id}, function(err, order){
			if(err){
				console.log('Error in One method of customers.js controller');
			} else{
				res.json(order);
			}
		})
	},

	update: function(req, res){
		if(req.body.id == false){
			res.json({'name':{'message': 'Error Occurred, Please re-select customer from customers page to try again'}});
		}
		if(req.body.name == ""){
			res.json({'name':{'message': 'Name cannot be blank'}});
		} else{
			req.body.name = req.body.name.toUpperCase();
			Order.findOneAndUpdate({_id: req.body.id}, {name: req.body.name}, {runValidators: true}, function(err){
				if(err){
					res.json(err.errors);
				} else{
					res.json({'name':{'message': 'Name succesfully changed'}});
				}
			});
		}
	}

}
