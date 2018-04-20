lsScope = "";
(function() {
    'use strict';

    angular.module('app.admin.login').controller('adminLoginController', adminLoginController);

    function adminLoginController($scope, User, $timeout, $filter, $rootScope,InvokeAPICall, $location) {
      
            $scope.registerAdmin = function() {
            
            var param = {};
            //apiName should be same as webApi php file's switch case
            param.apiName= "registerUserWithEmail";
            param.data = {
                "email" : $scope.emailid,
                "userType" : 3
            } ;
           
            var success = function(responseData) {
            	//must check status code responded by api called
            	if(responseData.status == config.statusCode.taskCompleted){
            		console.log("everything worked fine");
            		var receivedData = responseData.data.message;
            		$scope.registrationMessage = JSON.stringify(receivedData);
            	
            	}
                
            }
            var failure = function(responseData) {
                if(responseData.status == config.statusCode.taskIncompleted){
                	//called api unable to complete asked task
                	console.log("Api didn't completed task");
                }else if(responseData.status == config.statusCode.invalidApiName){
                	//apiName mentioned donot exists.
                	console.log("Invalid apiname");
                	
                }
            }
            InvokeAPICall.makeCall(param, success, failure);

        };


        $scope.getAdminHome = function() {
            var param = {};
            $location.path("/admin/home"); 
        };
    }
})();