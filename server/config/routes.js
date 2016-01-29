var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var customers = require('../controllers/customers.js');
var Order = mongoose.model('Order');
var orders = require('../controllers/orders.js');
var Product = mongoose.model('Product');
var products = require('../controllers/products.js');


module.exports = function(app){

	app.get('/orders', function(req, res){
		orders.all(req, res);
	});

	app.post('/addorder', function(req, res){
		orders.create(req, res);
	})

	app.post('/deleteorder', function(req, res){
		orders.remove(req,res);
	})

	app.get('/customers', function(req, res){
		customers.all(req, res);
	});

	app.post('/addcustomer', function(req, res){
		customers.create(req, res);
	})
	
	app.post('/deletecustomer', function(req, res){
		customers.remove(req, res);
	})
	

	app.get('/products', function(req, res){
		products.all(req, res);
	});

	app.post('/addproduct', function(req, res){
		products.create(req, res);
	})
}