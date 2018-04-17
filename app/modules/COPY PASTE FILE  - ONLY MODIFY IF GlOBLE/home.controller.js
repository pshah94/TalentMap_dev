lsScope = "";
(function() {
    'use strict';

    angular.module('app.home').controller('HomeCtrl', HomeController);

    function HomeController($scope, User, $timeout, $filter, FileUtils, $rootScope, $location) {
        lsScope = $scope;
        $scope.userprofilePicSrc = window.config.defaultProfilePic;

        $scope.goToClient = function() {
            $location.path("/client/login");
        }
        console.log(lsScope);
    }
})();