
(function() {
    'use strict';

    angular.module('app.client.clienthome').controller('ClientHomeController', ClientHomeController);

    function ClientHomeController($scope, User, $timeout, $filter, $rootScope,InvokeAPICall, $location) {

       // $scope.sideMenu = "app/modules/client/clientSideMenu.html"; 

       $scope.clientTab = "clientHome";
        $scope.abc = function(val){
            $scope.clientTab = val;
        }
    }
})();