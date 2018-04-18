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
            //apiName should be same as webApi php file's switch case
            param.apiName= "loginUser";
            param.data = {
                "email" : $scope.username,
                "password" : $scope.password,
                "user_type" : 3
            } ;
           
            var success = function(responseData) {
            	//must check status code responded by api called
            	if(responseData.status == config.statusCode.taskCompleted){
            		console.log("everything worked fine");
                    var receivedData = responseData.data;
                    if(receivedData.loginStatus == 200){
                        User.loginUser(receivedData);
                        $location.path("/client/clienthome");
                    }else{
                        $scope.loginerror = receivedData.loginMessage;
                    }
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
        
        $timeout(function(){
            $scope.username = "parth_shah9478@yahoo.com";
            $scope.password = "abc1234";
        })
    }
})();