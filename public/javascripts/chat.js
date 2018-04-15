var app = angular.module('chatapp', ['ngMaterial']);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
});
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