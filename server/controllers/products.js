var mongoose = require('mongoose');
var Product = mongoose.model('Product');
module.exports = {

	all: function(req, res){
		Product.find({}, function(err,products){
			if(err){
				console.log('Error in All method of products.js controller');
			} else{
				res.json(products);
			}
		})
	},

	create: function(req, res){
		var product = new Product({name: req.body.name, url: req.body.url, description: req.body.description, quantity: req.body.quantity, price: req.body.price});
		Product.find({name: req.body.name}, function(err, products){
			if(err){
			} else if(products[0]){
				res.json({'name': {'message': 'Product already exists'}});
			} 
			else {
				product.save(function(err){
					if(err){
						res.json(product.errors);
					} else{
						res.json();
					}
				})
			}
		})
	},

	remove: function(req, res){
		Product.remove({_id: req.body.id}, function(err){
			if(err){
				console.log('Error in Remove method of products.js controller');
			} else{
				res.json();
			}
		})
	},

	find_by_name: function(req, res){
		Product.find({name:req.body.name},function(err,product){
			if(err){
				res.json(err.errors);
			} else{
				res.json(product);
			}
		})
	},

	one: function(req, res){
		Product.find({_id: req.body.id}, function(err, product){
			if(err){
				console.log('Error in One method of products.js controller');
			} else{
				res.json(product);
			}
		})
	},

	update: function(req, res){
		if(req.body.id == false){
			console.log('a');
			res.json({'name':{'message': 'Error Occurred, Please re-select product from products page to try again'}});
		}
		if(req.body.quantity === ""){
			console.log('b')
			res.json({'name':{'message': 'Quantity cannot be blank'}});
		} else{
			Product.findOneAndUpdate({_id: req.body.id}, {quantity: req.body.quantity}, function(err){
				if(err){
					console.log('here');
					res.json(err.errors);
				} else{
					console.log('here2');
					res.json({'name':{'message': 'Quantity succesfully updated'}});
				}
			});
		}
	}
}

