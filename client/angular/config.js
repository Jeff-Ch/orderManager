var myApp = angular.module('myApp', ['ngRoute']);

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
    .otherwise({
      redirectTo: '/'
    });
});