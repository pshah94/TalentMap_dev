/* Application Router
 * 
 * @Contributors
 * Parth Shah 
 *
 * @Version
 * 1.0
 *
 */

(function() {
    "use strict";

    angular.module("app").config(function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'app/modules/home/home.html'
        }).when('/client/login', {
            controller: 'ClientLoginCtrl',
            templateUrl: 'app/modules/client/login/login.html'
        }).otherwise({
            redirectTo: '/'
        });

        //$locationProvider.html5Mode(true);
    });

})();