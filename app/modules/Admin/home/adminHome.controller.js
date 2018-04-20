lsScope = "";
(function() {
    'use strict';

    angular.module('app.admin.home').controller('adminHomeController', adminHomeController);

    function adminHomeController($scope, User, $timeout, $filter, $rootScope, $location) {
        // lsScope = $scope;

        // $scope.userprofilePicSrc = window.config.defaultProfilePic;
        $scope.sideMenu = "app/modules/Admin/adminSideMenu.html";
        
        $scope.goToManageClient = function() {
            alert("hi");
            $location.path("/Admin/manageClient");
        }
        console.log(lsScope);
    }
})();