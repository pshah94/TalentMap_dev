<?php
include_once   '../config/config.php';
include_once   '../connections/dbCon.php';

class clientController
{

    // TODO - Insert your code here
    public function __construct()
    {
        
        // TODO - Insert your code here
    }
    public function getClientProfileDetails ($data){
        
        $responseData = phpConfig::$config["responseDataFormat"];
        $resData = array();
        
        $param =array();
        $param["user_id"] = $data["user_id"]; 
        $conn = dbCon::getDbCon();
        $sql = "SELECT first_name, last_name, email, user_type, phone_number, address, city, state, postal
             FROM user_details as ud where ud.id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i",$param["user_id"]);
        $stmt->execute();
        $res = $stmt->get_result();
        $records = array();
        while($row = $res->fetch_assoc()){
            array_push( $records,$row);
        }
        
        $stmt->close();
        $resData["records"] = $records;
        
        //last line
        $responseData["data"] = $resData;
        
        return $responseData;
    }


public function updateClientProfileDetails ($data){
    
    $responseData = phpConfig::$config["responseDataFormat"];
    $resData = array();
    
    $param =array();
    $param["user_id"] = $data["user_id"];
    $param["first_name"] = $data["first_name"];
    $param["last_name"] = $data["last_name"];
    
    //update don't work with bind param ;(
    $conn = dbCon::getDbCon();
    $sql = "update user_details set `first_name` = '".$data["first_name"]."', `last_name` = '".$data["last_name"]."', `phone_number` = '".$data["phone_number"]."', `address` = '".$data["address"]."', `city` = '".$data["city"]."', `state` = '".$data["state"]."',  `postal` = '".$data["postal"]."'   where `id` = '".$data["user_id"]."'";
   
    if($stmt = mysqli_query($conn, $sql)){
            $resData["recordsUpdated"] = mysqli_affected_rows($conn);
            $resData["updateStatus"] = 200;
            $resData["message"] = "details updated";
      }else{
        $resData["sqli_Execute_error"] = mysqli_error($conn);
        $resData["message"] = "data not updated";
        $responseData["status"] = phpConfig::$config["statusCode"]["taskIncompleted"];
    }

    $responseData["data"] = $resData;
    
    return $responseData;
}

public function getClientProjectList ($data){
    
    $responseData = phpConfig::$config["responseDataFormat"];
    $resData = array();
    
    $param =array();
    $param["user_id"] = $data["user_id"];
    
    $conn = dbCon::getDbCon();
    $sql = "SELECT `cpi`.`id` as 'project_id',
    `cpi`.`client_id`,
    `cpi`.`project_sponsor_name`,
    `cpi`.`title`,
    `cpi`.`email`,
    `cpi`.`telephone_direct`,
    `cpi`.`available_few_hours`,
    `cpi`.`feedback_given`,
    `cpi`.`project_title`,
    `cpi`.`project_description`,
    `cpi`.`attachments_provided`,
    `cpi`.`problems_opportunity`,
    `cpi`.`research_required`,
    `cpi`.`analysis_required`,
    `cpi`.`estimated_effort_hours`,
    `cpi`.`report_format`,
    `cpi`.`other_deliverables`,
    `cpi`.`skill_needed_1`,
    `cpi`.`skill_needed_2`,
    `cpi`.`skill_needed_3`,
    `cpi`.`required_training`,
    `cpi`.`training_details`,
    `cpi`.`international_component`,
    `cpi`.`international_component_details`,
    `cpi`.`coop_opportunity`,
    `cpi`.`coop_opportunity_details`,
    `cpi`.`year_submitted`,
    `cpi`.`month`,
    `cpi`.`day`,
    `cpi`.`project_status` as 'project_status_id',
    `ps`.`status` as 'project_status',
    `cpi`.`sponsor_id`,
    `s`.`organization_name` as 'sponsor_name'
FROM `talentmapdev`.`client_project_idea` as `cpi`, `sponsor` as `s`, `project_status` as `ps` where `s`.`id` = `cpi`.`sponsor_id` and `cpi`.`project_status`=`ps`.`id` and `cpi`.`client_id` = ?;
";
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param("i",$param["user_id"]);
    $stmt->execute();
    $res = $stmt->get_result();
    $records = array();
    while($row = $res->fetch_assoc()){
        array_push( $records,$row);
    }
    
    $stmt->close();
    $resData["records"] = $records;
    
    //last line
    $responseData["data"] = $resData;
    
    return $responseData;
}

public function addClientProject(){
    $responseData = phpConfig::$config["responseDataFormat"];
    $resData = array();
    
    $param =array();
    $param["user_id"] = $data["user_id"];
    
    $conn = dbCon::getDbCon();
    $sql = 'insert into client_project_idea  (
    client_id,
    project_sponsor_name,
    title,
    email,
    telephone_direct,
    available_few_hours,
    feedback_given,
    project_title,
    project_description,
    attachments_provided,
    problems_opportunity,
    research_required,
    analysis_required,
    estimated_effort_hours,
    report_format,
    other_deliverables,
    skill_needed_1,
    skill_needed_2,
    skill_needed_3,
    required_training,
    training_details,
    international_component,
    international_component_details,
    coop_opportunity,
    coop_opportunity_details,
    year_submitted,
    month,
    day ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';  //28 columns
        
 $stmt = $conn->prepare($sql);
 $stmt->bind_param("issss
                    iissi
                    sssis
                    ssssi
                    sssss
                    sss",
                    $param["user_id"]);
    $stmt->execute();
    $res = $stmt->get_result();
    $records = array();
    while($row = $res->fetch_assoc()){
        array_push( $records,$row);
    }
    
    $stmt->close();
    $resData["records"] = $records;
    
    //last line
    $responseData["data"] = $resData;
    
    return $responseData;
}

//end of file
}


