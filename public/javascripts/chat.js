var app = angular.module('chatapp', ['ngMaterial']);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
});
app.controller('chatController', function ($scope, $sce) {
    $scope.messages = [];
    $scope.trust = $sce.trustAsHtml;
    var exampleSocket = new WebSocket('ws://localhost:9000/chatSocket');
    exampleSocket.onmessage = function () {
        var jsonData = JSON.parse(event.data);
        jsonData.time = new Date()
            .toLocaleTimeString();
        $scope.messages.push(jsonData);
        $scope.$apply();
        console.log(jsonData);


        //console.log(event.data);
    };
    $scope.sendMessage = function (event) {
        exampleSocket.send($scope.usermessage);
        $scope.usermessage = "";
    };
});