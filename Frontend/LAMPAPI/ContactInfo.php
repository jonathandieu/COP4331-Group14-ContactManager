
<?php

$inData = getRequestInfo();
$login = $inData["login"];
$cname = $inData["cname"];



$conn = new mysqli("localhost", "Admin", "Admin", "yellabook");
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT * FROM * WHERE login=? AND cname =?");
    $stmt->bind_param("ss", $inData["login"], $inData["cname"]);
    $stmt->execute();
    $result = $stmt->get_result();
    returnWithInfo( $row['cname'], $row['login']);
    $stmt->close();

    
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"name":"","login":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $name, $login )
{
    $retValue = '{"name":"' . $name . '","login":"' . $login . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>