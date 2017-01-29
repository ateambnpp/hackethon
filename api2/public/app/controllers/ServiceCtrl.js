app.controller("ServiceCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.service = {
        name: "Panic Service",
        actions: [
            "TEXT_PRODUCE",
            "TEXT_RECEIVE",
            "BOOL_PRODUCE",
            "BOOL_RECEIVE"
            ]
    };

    $scope.devices = [
        {
            name: "Panic Button",
            owner: "OWNDERID",
            id: "ABA2a32234acedfe3323232323",
            actions: [
                "BOOL_OUT","BOOL_IN"
            ]
        },
        {
            name: "Alarm",
            id: "CDEEDEDEFACDE2a32234acedfe3323232323",
            actions: [
                "BOOL_IN",
            ]
        },
        {
            name: "SMS Service",
            actions: [
                "TEXT_RECEIVE",
            ]
        },
        {
            name: "Slack",
            actions: [
                "TEXT_RECEIVE",
            ]
        }
    ];


}]);
