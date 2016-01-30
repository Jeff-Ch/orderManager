myApp.factory('customerFactory',function($http){
    var customers = [];

    var factory = {};

    factory.getCustomers = function (callback){
        $http.get('/customers').success(function(output){
            console.log(output);
            callback(output);
        })
    }

    factory.addCustomer= function(info, callback){
        $http.post('/addcustomer', info).success(function(output){
            callback(output);
        })
    }
    
    factory.deleteCustomer= function(id, callback){
        $http.post('/deletecustomer', {'id': id}).success(function(){
            callback();
        })
    }

    factory.getCustomer = function(id, callback){
        $http.post('/customer', {'id': id}).success(function(output){
            callback(output);
        })
    }

    factory.updateCustomer = function(data, callback){
        $http.post('/updatecustomer', data).success(function(output){
            callback(output);
        })
    }
    return factory
});

myApp.controller('customersController', function ($scope, customerFactory, $location, dataService){
    $scope.customers = customerFactory.getCustomers(function(data){
        $scope.customers = data;
        $scope.new_customer = {};
    });
    $scope.getdata = dataService.getDataResponse();
    $scope.customer = {'name': ""};


    $scope.addCustomer = function (){
        $scope.new_customer.date = new Date();
        customerFactory.addCustomer($scope.new_customer, function(name_exists){
            $scope.name_exists = name_exists;
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

    $scope.editCustomer = function(id){
        customerFactory.getCustomer(id, function(data){
            dataService.saveDataResponse(data);
            $location.path('/customer/edit');
        })
    }

    $scope.updateCustomer = function(){
        if(!$scope.getdata[0]){
            $scope.customer.id = false;
        } else{
            $scope.customer.id = $scope.getdata[0]._id;
        }
        customerFactory.updateCustomer($scope.customer, function(msg){
            $scope.msg = msg;
        })
    }

})