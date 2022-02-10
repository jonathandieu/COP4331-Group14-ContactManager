<?php
    $inData = getRequestInfo();
    $conn = new mysqli("localhost", "Admin", "Admin", "yellabook");

    if( $conn->connect_error )
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmtEmail = $conn->prepare("SELECT cname,address,type FROM emails WHERE login=? AND cname =?");
        $stmtEmail->bind_param("ss", $inData["login"], $inData["cname"]);
        $stmtEmail->execute();
        $resultEmail = $stmtEmail->get_result();

        $stmtLocation = $conn->prepare("SELECT address,type FROM locations WHERE login=? AND cname =?");
        $stmtLocation->bind_param("ss", $inData["login"], $inData["cname"]);
        $stmtLocation->execute();
        $resultLocation = $stmtLocation->get_result();

        $stmtPhone = $conn->prepare("SELECT number,type FROM phones WHERE login=? AND cname =?");
        $stmtPhone->bind_param("ss", $inData["login"], $inData["cname"]);
        $stmtPhone->execute();
        $resultPhone = $stmtPhone->get_result();

        $rowEmail = $resultEmail->fetch_assoc();
        $rowLocation = $resultLocation->fetch_assoc();
        $rowPhone = $resultPhone->fetch_assoc();

        if( $rowEmail || $rowLocation || $rowPhone )
        {
            returnWithInfo( $rowEmail['cname'], $rowEmail['address'], $rowEmail['type'], $rowLocation['address'], $rowLocation['type'], $rowPhone['number'], $rowPhone['type']);
        }
        else
        {
            returnWithError("No Records Found");
        }

        $stmtEmail->close();
        $stmtLocation->close();
        $stmtPhone->close();
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
        $retValue = '{"cname":"","number":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }

    function returnWithInfo( $cname, $email, $etype, $location, $ltype, $phone, $ptype)
    {
        $retValue = '{"cname":"' . $cname . '","eaddress":"' . $email . '","etype":"' . $etype . '","laddress":"' . $location . '","ltype":"' . $ltype . '","number":"' . $phone . '","ptype":"' . $ptype . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>
