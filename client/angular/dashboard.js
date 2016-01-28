myApp.controller('dashboardController', function ($scope, productFactory, orderFactory, customerFactory){
    $scope.products = productFactory.getProducts(function(data){
            $scope.products = data;
    });
    $scope.orders = orderFactory.getOrders(function(data){
            $scope.orders = data;
    });
    $scope.customers = customerFactory.getCustomers(function(data){
            $scope.customers = data;
    });

})