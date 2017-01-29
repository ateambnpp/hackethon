app.controller("ServicesCtrl", ["$scope", "$http", function ($scope, $http) {
    $http.get("/api/device/list-services")
        .then(function (data) {
            $scope.services = data.data;
        });
}]);