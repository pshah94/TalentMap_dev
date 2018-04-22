(function() {
    'use strict';

    angular.module('app.talent.talentManageProfile').controller('TalentManageProfileController', TalentManageProfileController);

    function TalentManageProfileController($scope, User, $timeout, $filter, $rootScope, InvokeAPICall, $location) {

        $scopse.selectTab = function(tab){
            $scope.selectedTab = tab;
        }
        $timeout(function(){
            $scope.selectTab(1);
        });
        
    }
})();