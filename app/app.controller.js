/* Application Modules
 * 
 * @Contributors
 * Parth Shah
 *
 * @Version
 * 1.0
 *
 */
//var appScope = "";
var usr = "";
(function() {
    'use strict';

    $.fn.isEmpty = function() {
        return $(this).val().isEmpty();
    };

    String.prototype.isEmpty = function() {
        return this.trim() === "";
    };

    String.prototype.fill = function(char, count) {
        var charToPad = "";
        for (var index = 0; index < count; index++) {
            charToPad += char;
        }
        return this + charToPad;
    };

    // User factory
    angular.module('app').factory('User', function() {
        var user = {
            userProfile: {
                profilePic: {}
            },
            isLoggedIn: false,
        };

        var userFactory = {};

        userFactory.loginUser = function(userId) {
            user.isLoggedIn = true;
            user.userId = userId;
        };
        userFactory.logoutUser = function() {
            user = {
                userProfile: {
                    profilePic: {}
                },
                isLoggedIn: false,
            };
        };
        userFactory.isLoggedIn = function() {
            return user.isLoggedIn;
        };
        userFactory.setUserProfile = function(userProfile) {
            return user.userProfile = userProfile;
        };
        userFactory.getUserProfile = function() {
            return user.userProfile;
        };
        userFactory.setUserRoleId = function(userRoleId) {
            user.userProfile.userRoleId = userRoleId;
        };
        userFactory.getUserRoleId = function() {
            return user.userProfile.userRoleId;
        };

        userFactory.getUserProfileName = function() {
            return user.userProfile.name;
        };
        userFactory.getUserFamilyName = function() {
            return user.userProfile.familyName;
        };
        userFactory.setUserEmailId = function(emailId) {
            user.userProfile.email = emailId;
        };
        userFactory.getUserEmailId = function() {
            return user.userProfile.email;
        };
        userFactory.setUserPhoneCountryCode = function(phoneCountryCode) {
            user.userProfile.phoneCountryCode = phoneCountryCode;
        };
        userFactory.getUserPhoneCountryCode = function() {
            return user.userProfile.phoneCountryCode;
        };
        userFactory.setUserPhoneNo = function(phoneNo) {
            user.userProfile.phoneNo = phoneNo;
        };
        userFactory.getUserPhoneNo = function() {
            return user.userProfile.phoneNo;
        };
        userFactory.setUserProfilePicName = function(userImageName) {
            user.userProfile.userImage = userImageName;
        };
        userFactory.getUserProfilePicName = function() {
            return user.userProfile.userImage;
        };

        userFactory.getUserId = function() {
            return WL.Client.getUserName("UserIdentity");
        };



        return userFactory;
    });



    /************** InvokeAPICall FACTORY START *****************/

    angular.module('app').factory('InvokeAPICall', ['$q', '$http', function($q, $http) {

        var InvokeAPICall = {};
        //should be sent in any InvokeAPICall function
        var params = config.defaultParam;
        var APICallUrl = config.domain + config.apiUrl;

        //mostly we will use this post only - renaming it to makeCall
        InvokeAPICall.makeCall = function(param, successCallBack, failureCallBack) {

        	if (param.data != undefined) {
                params.data = param.data;
            }
        	if(param.apiName != undefined){
        		params.apiName = param.apiName;
        	}

        	var httpConfig = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
            $http.post(
                APICallUrl,
                params,httpConfig
            ).then(function success(response) {
                    console.log("Http post resquest success");
                    console.log(response);
                    //if webApi worked fine
                    if(response.data.status == config.statusCode.validApiName  ){
                    	//if api responded back properly and completes asked task.
                    	var responseData = response.data.responseData;
                    	if(responseData.status == config.statusCode.taskCompleted ){
                    		//sending back data received from api to webCalling function. 
                    		successCallBack(responseData);
                    	}else{
                    		failureCallBack(responseData);
                    	}
                    	
                    }else if(response.data.status == config.statusCode.invalidApiName){
                    	console.log("Passed api name is incorrect");
                    	failureCallBack(response.data);
                    }
                    
                    
                },
                function failure(response) {
                    console.log("Http post resquest fail");
                    console.log(response);
                    
                });

        };
        
        //not used for timebeing
        InvokeAPICall.get = function(param, successCallBack, failureCallBack) {
            if (param.params == undefined) {
                param.params = defaultParam.params;
            }

            var httpConfig = {};
            httpConfig.params = param.params;
            httpConfig.headers = { 'Accept': 'application/json' };

            $http.get(
                APICallUrl,
                httpConfig
            ).then(function success(response) {
                    console.log("Http get resquest success");
                    successCallBack(response.data);
                },
                function failure(response) {
                    console.log("Http get resquest fail");
                    console.log(response);
                    failureCallBack(response);
                });

        };




        return InvokeAPICall;

    }]);
    /************** InvokeAPICall FACTORY END *****************/

    /********** Required Field Start   ***********/
    //using "mandatory" directive instead of required because required + valid is used for input label transition.
    angular.module('app').directive("mandatory", function() {
        return {
            restrict: 'A', //only want it triggered for attributes
            compile: function(element) {
                //could add a check to make sure it's an input element if need be
                element.find("~ label").append("<span class='required'>*</span>");
            }
        }
    });
    /********** Required Field End   ***********/

    angular.module('app').directive('maxLengthHandler', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var max_chars = parseInt($(element).attr("maxlength"));
                var type = $(element).attr("type");

                var VALID_KEY = false;

                if (!isNaN(max_chars)) {
                    $(element).keydown(function(e) {

                        if (e.which == 8 || e.which == 46) { // 8 for backspace and 46 for delete
                            VALID_KEY = true;
                        } else {
                            if (type == "number") {
                                if (e.which == 69) { //69 for 'e' in input number (exponential)
                                    VALID_KEY = false;
                                } else if ($(this).val().replace(/[^0-9]/g, '').length >= max_chars) {
                                    VALID_KEY = false;
                                } else {
                                    VALID_KEY = true;
                                }
                            } else {
                                if ($(this).val().length >= max_chars) {
                                    VALID_KEY = false;
                                } else {
                                    VALID_KEY = true;
                                }
                            }
                        }

                        return VALID_KEY;

                    });
                    $(element).keyup(function(e) {
                        if ($(this).val().isEmpty()) {
                            $(this).val("");
                        } else if (type == "number") {
                            if (!VALID_KEY || e.which == 69 || $(this).val().replace(/[^0-9]/g, '').length >= max_chars) { //69 for 'e' in input number (exponential)
                                /* Even when you see invalid value in HTML view, when you get value of it using val method, 
                                It will return a valid value. 
                                i.e On HTML Page : 01234.  
                                val function will return 01234 (dot is ignored)*/
                                var validValue = $(this).val().substr(0, max_chars);
                                $(this).val("").val(validValue);
                            }
                        } else {
                            if ($(this).val().length >= max_chars) {
                                $(this).val($(this).val().substr(0, max_chars));
                            }
                        }
                        /* Default change was not getting fired, so manually triggering change event, 
                         * so onchange events can listen(i.e labelUp directive). */
                        $(this).trigger("change");
                    });
                }
            }
        };
    });



    angular.module('app').filter('ifNull', function() {
        return function(input, defaultValue) {

            if (angular.isUndefined(input) || input === null || (typeof input == "string" && input.toLowerCase() === "null")) {
                return defaultValue;
            }

            return input;
        };
    });

    angular.module('app').filter('currencyFormat', ['$filter', function($filter) {
        return function(input, currencyFormat) {

            input = $filter('ifNull')(input, '-');

            if (input == '-') {
                return input;
            } else {
                return currencyFormat + " " + $filter('currency')(input, '');
            }

        };
    }]);

    angular.module('app').filter('phnNoFormat', ['$filter', function($filter) {
        return function(input, countryCode) {
            console.log(input);

            if (!angular.isString(input)) {
                input = new String(input);
            }

            if (input.length < 10) {
                input = input.fill(0, 9 - input.length);
            }

            return "+" + countryCode + " " + input.substr(0, 3) + "-" + input.substr(3, 3) + "-" + input.substr(6, 4);
        };
    }]);

    angular.module('app').filter('localphnNoFormat', ['$filter', function($filter) {
        return function(input) {
            console.log(input);

            if (!angular.isString(input)) {
                input = new String(input);
            }

            if (input.length < 7) {
                input = input.fill(0, 6 - input.length);
            }

            return input.substr(0, 3) + "-" + input.substr(3);
        };
    }]);

    /******************** Only Number allow Function ******************/


    angular.module('app').directive('validNumber', function() {
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function(val) {
                    if (angular.isUndefined(val)) {
                        var val = '';
                    }

                    var clean = val.replace(/[^-0-9]/g, ''); //replace this for what to allow
                    var negativeCheck = clean.split('-');
                    var decimalCheck = clean.split('.');
                    if (!angular.isUndefined(negativeCheck[1])) {
                        negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                        clean = negativeCheck[0] + '-' + negativeCheck[1];
                        if (negativeCheck[0].length > 0) {
                            clean = negativeCheck[0];
                        }

                    }

                    if (!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] = decimalCheck[1].slice(0, 2);
                        clean = decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function(event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    });


    angular.module('app').controller('appCtrl', ['$scope', '$rootScope', 'User', '$timeout', '$filter', '$http', '$q', '$window', function($scope, $rootScope, User, $timeout, $filter, $http, $q, $window) {
        //appScope = $scope;
        usr = User;
        $scope.config = config;
        $scope.pageParams = {};
        $scope.pageTitle = "Home";

        $scope.setCurrentPageTitle = function(title) {
            $scope.pageTitle = title;
        }


        /****************************  Toast Message ***************************************/
        $scope.showToast = function(title, message, callback, options) {
            if (message == undefined) {
                message = title;
            }
            $scope.showAlert(title, message, callback);
        };
        /**************************** User Authentication Handler  ***************************************/
        $scope.$watch(User.isLoggedIn, function(value, oldValue) {
            if (!value) {
                console.log("User Is Not Logged In, Redirecting to Login Page");
                //$state.go('home', {}, { reload: true });
            }
            if (value) {
                console.log("User Is Logged In");
            }
        }, true);

        /*************************************** Authenticate User ********************************************/





        /******************************** Talent Map Application Code End ****************************************/

    }]);

})();