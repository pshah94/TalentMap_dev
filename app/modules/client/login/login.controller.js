lsScope = "";
(function() {
    'use strict';

    angular.module('app.client.login').controller('ClientLoginCtrl', ClientLoginController);

    function ClientLoginController($scope, User, $timeout, $filter, $rootScope, $location) {
        lsScope = $scope;
        $scope.userprofilePicSrc = window.config.defaultProfilePic;
        alert($location.path());
        $scope.msg = "client Page";
        console.log(lsScope);
    }
})();