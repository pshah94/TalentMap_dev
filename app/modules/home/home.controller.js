lsScope = "";
(function() {
    'use strict';

    angular.module('app.home').controller('HomeCtrl', HomeController);

    function HomeController($scope, User, $timeout, $filter, InvokeAPICall, $rootScope, $location) {
        lsScope = $scope;
        $scope.userprofilePicSrc = window.config.defaultProfilePic;



        $scope.makePostCall = function() {
            $scope.setCurrentPageTitle("Post called");
            var param = {};
            //apiName should be same as webApi php file's switch case
            param.apiName= "getUserDetails";
            param.data = "You made post call" 
           
            var success = function(responseData) {
            	//must check status code responded by api called
            	if(responseData.status == config.statusCode.taskCompleted){
            		console.log("everything worked fine");
            		var receivedData = responseData.data;
            		$scope.response = JSON.stringify(receivedData);
            	
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
        console.log(lsScope);
    }
})();