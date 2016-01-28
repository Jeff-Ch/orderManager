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
		var order = new Order({name: req.body.name, product: req.body.product, quantity: req.body.quantity, date: req.body.date});
		order.save(function(err){
			if(err){
				console.log('Error in Create method of orders.js controller');
			} else{
				res.json();
			}
		})
	}

}
