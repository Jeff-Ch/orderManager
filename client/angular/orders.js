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
        $http.post('/addorder', info).success(function(error){
            callback(error);
        })
    }

    factory.deleteOrder= function(id, callback){
        $http.post('/deleteorder', {'id': id}).success(function(){
            callback();
        })
    }

    factory.getOrder = function(id, callback){
        $http.post('/order', {'id': id}).success(function(output){
            callback(output);
        })
    }

    factory.updateOrder = function(data, callback){
        $http.post('/updateorder', data).success(function(output){
            callback(output);
        })
    }
    return factory
});



myApp.controller('ordersController', function ($scope, orderFactory, customerFactory, productFactory, dataService){
    $scope.orders = [];
    $scope.customers =[];
    orderFactory.getOrders(function (data){
        $scope.orders = data;
    })

    productFactory.getProducts(function(data){
        $scope.products = data;
    });

    customerFactory.getCustomers(function(data){
        $scope.customers = data;
    })

    $scope.getdata = dataService.getDataResponse();
    $scope.new_order = {};

    $scope.addOrder = function() {
        $scope.new_order.date = new Date();
        var new_order_price = 1;
        productFactory.find_one($scope.new_order.product, function(product){
            if(product[0]){
                new_order_price = product[0].price;
            };
            $scope.new_order.total = $scope.new_order.quantity * new_order_price;
            console.log($scope.new_order.total);
            orderFactory.addOrder($scope.new_order, function(errors){
                $scope.errors = errors;
                orderFactory.getOrders(function(data){
                    $scope.orders = data;
                    $scope.new_order = {};
                });
            })
        })
    }

    $scope.removeOrder = function(id){
        orderFactory.deleteOrder(id, function(){
            orderFactory.getOrders(function(data){
                $scope.orders = data;
                $scope.new_customer = {};
            })
        })
    }

    $scope.editOrder = function(id){
        orderFactory.getCustomer(id, function(data){
            dataService.saveDataResponse(data);
            $location.path('/order/edit');
        })
    }

    $scope.updateOrder = function(){
        if(!$scope.getdata[0]){
            $scope.order.id = false;
        } else{
            $scope.order.id = $scope.getdata[0]._id;
        }
        OrderFactory.updateOrder($scope.order, function(msg){
            $scope.msg = msg;
        })
    }


})