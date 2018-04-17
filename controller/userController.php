<?php

//including dependencing files
include_once   '../config/config.php';

 class userController
{
   
    // TODO - Insert your code here
    public function __construct()
    {
        
        // TODO - Insert your code here
    }
    
    
    public function getUserDetails($data){ 
        //first line in each controller's function
        $responseData = phpConfig::$config["responseDataFormat"];
        
        $resData = array();
        $resData["received_data"] = $data;

        //last line
        $responseData["data"] = $resData;
        $responseData["status"] = phpConfig::$config["statusCode"]["taskCompleted"];       
        return $responseData;
    }
    
    
    
};

