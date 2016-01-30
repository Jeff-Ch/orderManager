var myApp = angular.module('myApp', ['ngRoute'])
.service('dataService', function () {
    var dataResponse = {};

    return {
        saveDataResponse:function (data) {
            dataResponse = data;
            console.log(data);
        },
        getDataResponse:function () {
            return dataResponse;
        }
    };
});

myApp.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'partials/dashboard.html'
})
  .when('/orders',{
    templateUrl: 'partials/orders.html'
})
  .when('/products',{
    templateUrl: 'partials/products.html'
})
  .when('/customers',{
    templateUrl: 'partials/customers.html'
})
  .when('/settings',{
    templateUrl: 'partials/settings.html'
})
  .when('/customer/edit/',{
    templateUrl: 'partials/customer_edit.html'
})
  .otherwise({
      redirectTo: '/'
  });
});