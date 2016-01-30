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
     factory.getProduct = function(id, callback){
        $http.post('/product', {'id': id}).success(function(output){
            callback(output);
        })
    }

    factory.updateProduct = function(data, callback){
        $http.post('/updateproduct', data).success(function(output){
            callback(output);
        })
    }
    return factory
});

myApp.controller('productsController', function ($scope, productFactory, $location, dataService){
    $scope.products = productFactory.getProducts(function(data){
            $scope.products = data;
            $scope.new_product = {};
    });
    $scope.getdata = dataService.getDataResponse();
    $scope.product = {'quantity': ""}

    $scope.addProduct = function (){
        $scope.new_product.date = new Date();
        productFactory.addProduct($scope.new_product, function(errors){
            $scope.errors = errors;
            productFactory.getProducts(function(data){
                $scope.products = data;
                $scope.new_product = {'quantity': ""};
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

    $scope.editProduct = function(id){
        productFactory.getProduct(id, function(data){
            dataService.saveDataResponse(data);
            $location.path('/product/edit');
        })
    }

    $scope.updateProduct = function(){
        if(!$scope.getdata[0]){
            $scope.product.id = false;
        } else{
            $scope.product.id = $scope.getdata[0]._id;
        }
        if($scope.product.quantity != ""){
            $scope.product.quantity += $scope.getdata[0].quantity;
            $scope.getdata[0].quantity = $scope.product.quantity;
        }
        productFactory.updateProduct($scope.product, function(msg){
            $scope.msg = msg;
            $scope.product = {};
        })
    }

})