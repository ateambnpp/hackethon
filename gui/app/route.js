app.config(['$routeProvider','$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/devices', {
            templateUrl: 'app/partials/devices.html',
            controller: 'DevicesCtrl'
        })
        .otherwise({
            redirectTo: "/home"
        });

    $locationProvider.hashPrefix('');
}]);