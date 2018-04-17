<?php
include_once   '../config/config.php';
include_once   '../connections/dbCon.php';
include_once    '../resources/jwt_helper.php';

class loginController
{

    // TODO - Insert your code here
    public function __construct()
    {
        
        // TODO - Insert your code here
    }
    
    public function checkUserAlive($data){
        $responseData = phpConfig::$config["responseDataFormat"];
        $resData = array();
        $token = $data['token'];
        try {
            $token = JWT::decode($token,  phpConfig::$config['jwt_key']);
            
            if (isset($token->id))
            {
                
                return true;
            }
        } catch (Exception $e) {
            return false;
        }
        
        
    }
    
    public function loginUser($data){
        
        $responseData = phpConfig::$config["responseDataFormat"];
        $resData = array();
        
        $param = array();
        $param["email"] = $data["email"];
        $param["user_type"] = $data["user_type"];
        $param["password"] = $data["password"];
        
        $conn = dbCon::getDbCon();
        $sql = "select count(*) as 'row_count' from user_details where email = ? and user_type = ? and password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sis",$param["email"],$param["user_type"],$param["password"]);
        $stmt->execute();
        $stmt->bind_result($rowCount);
        //when only one row
        $stmt->fetch();
        
        $resData = array();
        if($rowCount == 1){
            $token = array();
            $token['id'] = $param["email"];
            $token['user_type'] = $param["user_type"];
            $token['password'] = $param["password"];
             
            $resData['token'] = JWT::encode($token,  phpConfig::$config['jwt_key']);
            $resData["loginStatus"] = phpConfig::$config["statusCode"]["validCredentials"];
            $resData["loginMessage"] = "Go";
            
        }else{
            $resData["loginStatus"] = phpConfig::$config["statusCode"]["invalidCredentials"];
            $resData["loginMessage"] = "Invalid username or password";
        }
        
        $stmt->close();
               
        
        //last line
        $responseData["data"] = $resData;
        
        return $responseData;
        
    }
    
}

