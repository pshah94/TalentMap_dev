lsScope = "";
(function() {
    'use strict';

    angular.module('app.admin.manageClient').controller('manageClientController', manageClientController);

    function manageClientController($scope, User, $timeout, $filter, FileUtils, $rootScope, $location) {
        lsScope = $scope;
        $scope.userprofilePicSrc = window.config.defaultProfilePic;

        $scope.goToManageClient = function() {
            $location.path("/Admin/manageClient.html");
        }
        console.log(lsScope);
    }
})();