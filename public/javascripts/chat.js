var app = angular.module('chatapp', ['ngMaterial']);
app.controller('chatController', function ($scope) {
    $scope.messages = [
        {
            'sender': 'USER',
            'text': 'Hello'
        },
        {
            'sender': 'BOT',
            'text': 'hi ssup!'
        },
        {
            'sender': 'USER',
            'text': 'the roof'
              },
        {
            'sender': 'BOT',
            'text': 'but i see sky'
              }

         ];
});