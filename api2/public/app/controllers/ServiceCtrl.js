app.controller("ServiceCtrl", ["$scope", "$http", function ($scope, $http) {
    //$http.get("/api/success/")


    $scope.service = {
        name: "Panic Service",
        actions: [
            "TEXT_PRODUCER",
            "BOOL_PRODUCER",
            "BOOL_CONSUMER"
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
