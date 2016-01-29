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
				res.json({'msg': 'Product already exists'});
			} 
			else {
				product.save(function(err){
					if(err){
						res.render('products', {errors: product.errors});
					} else{
						res.json();
					}
				})
			}
		})
	}
}

