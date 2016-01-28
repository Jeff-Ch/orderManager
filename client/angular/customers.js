myApp.factory('customerFactory',function($http){
    var customers = [];

    var factory = {};

    factory.getCustomers = function (callback){
        $http.get('/customers').success(function(output){
            callback(output);
        })
    }

    factory.addCustomer= function(info, callback){
        $http.post('/addcustomer', info).success(function(name_exists){
            callback(name_exists);
        })
    }
    
    factory.deleteCustomer= function(id, callback){
        $http.post('/deletecustomer', {'id': id}).success(function(){
            callback();
        })
    }
    // most important step: return the object so it can be used by the rest of our angular code
    return factory
});

myApp.controller('customersController', function ($scope, customerFactory){
    $scope.customers = customerFactory.getCustomers(function(data){
            $scope.customers = data;
            $scope.new_customer = {};
    });

    $scope.addCustomer = function (){
        $scope.new_customer.date = new Date();
        customerFactory.addCustomer($scope.new_customer, function(name_exists){
            $scope.name_exists = name_exists.msg;
            customerFactory.getCustomers(function(data){
                $scope.customers = data;
                $scope.new_customer = {};
            });
        })
    }

    $scope.removeCustomer = function(id){
        customerFactory.deleteCustomer(id, function(){
            customerFactory.getCustomers(function(data){
                $scope.customers = data;
                $scope.new_customer = {};
            })
        })
    }

})