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
    // most important step: return the object so it can be used by the rest of our angular code
    return factory
});

myApp.controller('productsController', function ($scope, productFactory){
    $scope.products = productFactory.getProducts(function(data){
            $scope.products = data;
            $scope.new_product = {};
    });

    $scope.addProduct = function (){
        $scope.new_product.date = new Date();
        productFactory.addProduct($scope.new_product, function(name_exists){
            $scope.name_exists = name_exists.msg;
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