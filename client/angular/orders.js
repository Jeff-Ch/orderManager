myApp.factory('orderFactory',function($http){
	var orders = [];

	var factory = {};

	factory.getOrders = function (callback){
		$http.get('/orders').success(function(output){
				orders = output;
				callback(orders);
			})	
		}

	factory.addOrder = function(info, callback) {
		console.log(info);
		$http.post('/addorder', info).success(function(){
			callback();
		})
	}
    // most important step: return the object so it can be used by the rest of our angular code
    return factory
});



myApp.controller('ordersController', function ($scope, orderFactory, customerFactory, productFactory){
    //  initialize an empty array so $scope.orders maintains a consistent data type
    $scope.orders = [];
    $scope.customers =[];
    // run the getOrders method and set $scope data in the callback
    orderFactory.getOrders(function (data){
        $scope.orders = data;
    })

    productFactory.getProducts(function(data){
        $scope.products = data;
    });

    customerFactory.getCustomers(function(data){
    	$scope.customers = data;
    })

	$scope.addOrder = function() {
		$scope.new_order.date = new Date();
		orderFactory.addOrder($scope.new_order, function(){
			orderFactory.getOrders(function(data){
				$scope.orders = data;
				$scope.new_order = {};
			});
		})
	}
    

})