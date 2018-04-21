
(function() {
    "use strict";

    angular.module("app").config(function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/modules/home/home.html'
        }).when('/admin/login', {
            controller: 'adminLoginController',
            templateUrl: 'app/modules/Admin/login/adminLogin.html'
        }).when('/talent/talenthome', {
            controller: 'TalentHomeController',
            templateUrl: 'app/modules/Talent/Talent_Dashboard/talenthome.html'
        }).when('/talent/login', {
            controller: 'TalentLoginController',
            templateUrl: 'app/modules/Talent/Talent_Login/talentlogin.html'
        }).when('/admin/home', {
            controller: 'adminHomeController', 
            templateUrl: 'app/modules/Admin/home/home.html'
        }).when('/admin/manageClient', {
            controller: 'manageClientController',
            templateUrl: 'app/modules/Admin/manageClient/manageClient.html'
        }).when('/client/login', {
            controller: 'ClientLoginCtrl',
            templateUrl: 'app/modules/client/login/login.html'
        }).when('/client/clienthome', {
            controller: 'ClientHomeController',
            templateUrl: 'app/modules/client/client_dashboard/clienthome.html'
        }).otherwise({
            redirectTo: '/'
        });

        //$locationProvider.html5Mode(true);
    });

})();