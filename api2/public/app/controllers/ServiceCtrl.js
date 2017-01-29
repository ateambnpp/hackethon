app.controller("ServiceCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.service = {actions: []};
    $scope.devices = [];
    $scope.edges = [];

    $http.get("/api/device/service")
        .then(function (data) {
            console.log(JSON.stringify(data.data));
            $scope.data = data.data;

            console.log(JSON.stringify(data.data, null, 4));
        }, function (error) {
            console.log(error);
        });

    $scope.removeLink = function (id) {
        console.log(id.address);
    };

}]);
