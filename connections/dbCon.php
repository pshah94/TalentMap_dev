<?php
include_once  '../config/config.php';

class dbCon {
    
    public static function getDbCon (){
        
        //$con = mysqli_connect($config['dbCon']['host'],$config['dbCon']['user'],$config['dbCon']['password'],$config['dbCon']['database']);
        $con = mysqli_connect("localhost","root","toor","talentMapDev") or die("error in connectiong");
         if(mysqli_connect_errno()){
             echo "Error";
             return false;
         }else{
              return $con;
         }
       }
}

 
//$cn->getDbCon();
//$conn = dbCon::getDbCon();   // get instance of db for each query
