(function() {
    'use strict';

    angular.module('app.client.clienthome').controller('ClientHomeController', ClientHomeController);

    function ClientHomeController($scope, User, $timeout, $filter, $rootScope, InvokeAPICall, $location) {

        $timeout(function() {
            $scope.changeTab("clientHome");
        });

    }
})();