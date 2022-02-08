
<?php

$inData = getRequestInfo();


$conn = new mysqli("localhost", "Admin", "Admin", "yellabook");
if( $conn->connect_error )
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT cname,address FROM emails WHERE login=? AND cname =?");
    $stmt->bind_param("ss", $inData["login"], $inData["cname"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
        returnWithInfo( $row['cname'], $row['address']);
    }
    else
    {
        returnWithError("No Records Found");
    }

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
    $retValue = '{"cname":"","address":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $cname, $address )
{
    $retValue = '{"cname":"' . $cname . '","address":"' . $address . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
