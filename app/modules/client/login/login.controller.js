lsScope = "";
(function() {
    'use strict';

    angular.module('app.client.login').controller('ClientLoginCtrl', ClientLoginController);

    function ClientLoginController($scope, User, $timeout, $filter, $rootScope,InvokeAPICall, $location) {
      
            $scope.registerClient = function() {
            
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


        $scope.loginClient = function() {
            
            var param = {};
            $location.path("/client/clienthome");
            //apiName should be same as webApi php file's switch case
            /*param.apiName= "registerUserWithEmail";
            param.data = {
                "username" : $scope.username,
                "password" : $scope.password,
                "userType" : 3
            } ;
           
            var success = function(responseData) {
            	//must check status code responded by api called
            	if(responseData.status == config.statusCode.taskCompleted){
            		console.log("everything worked fine");
            		var receivedData = responseData.data.message;
                    $scope.loginerror = JSON.stringify(receivedData);
            	
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
*/
        };
        
        
        /* lsScope = $scope;
        $scope.userprofilePicSrc = window.config.defaultProfilePic;
        alert($location.path());
        $scope.msg = "client Page";
        console.log(lsScope);*/
    }
})();