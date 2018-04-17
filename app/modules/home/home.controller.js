lsScope = "";
(function() {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    function HomeController($scope, User, $timeout, $filter, InvokeAPICall, $rootScope, $location) {

$scope.gotoClientLogin = function(){
    $location.path("/client/login");
};

$scope.gotoAdminLogin = function(){
    $location.path("/admin/login");
};


      
        
        console.log(lsScope);
        $timeout (function(){
            $scope.setCurrentPageTitle("Talent Map - Home Page");
        });
        
    }
})();