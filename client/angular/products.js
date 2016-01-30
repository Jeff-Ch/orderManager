myApp.factory('productFactory',function($http){
    var products = [];

    var factory = {};

    factory.getProducts = function (callback){
        $http.get('/products').success(function(output){
            callback(output);
        })
    }

    factory.addProduct= function(info, callback){
        $http.post('/addproduct', info).success(function(name_exists){
            callback(name_exists);
        })
    }
    
    factory.deleteProduct= function(id, callback){
        $http.post('/deleteproduct', {'id': id}).success(function(){
            callback();
        })
    }

    factory.find_one = function(name, callback){
        $http.post('/oneproduct', {'name': name}).success(function(output){
            callback(output);
        })
    }
    return factory
});

myApp.controller('productsController', function ($scope, productFactory, dataService){
    $scope.products = productFactory.getProducts(function(data){
            $scope.products = data;
            $scope.new_product = {};
    });

    $scope.addProduct = function (){
        $scope.new_product.date = new Date();
        productFactory.addProduct($scope.new_product, function(errors){
            $scope.errors = errors;
            productFactory.getProducts(function(data){
                $scope.products = data;
                $scope.new_product = {};
            });
        })
    }

    $scope.removeProduct = function(id){
        productFactory.deleteProduct(id, function(){
            productFactory.getProducts(function(data){
                $scope.products = data;
                $scope.new_product = {};
            })
        })
    }

})