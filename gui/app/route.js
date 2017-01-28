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
        .when('/services', {
            templateUrl: 'app/partials/services.html',
            controller: 'ServicesCtrl'
        })
        .when('/service', {
            templateUrl: 'app/partials/service.html',
            controller: 'ServiceCtrl'
        })
        .otherwise({
            redirectTo: "/home"
        });

    $locationProvider.hashPrefix('');
}]);