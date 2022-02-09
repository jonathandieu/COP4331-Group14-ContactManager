<?php
    $inData = getRequestInfo();
    $conn = new mysqli("localhost", "Admin", "Admin", "yellabook");

    if( $conn->connect_error )
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmtEmail = $conn->prepare("SELECT cname,address FROM emails WHERE login=? AND cname =?");
        $stmtEmail->bind_param("ss", $inData["login"], $inData["cname"]);
        $stmtEmail->execute();
        $resultEmail = $stmtEmail->get_result();

        $stmtLocation = $conn->prepare("SELECT cname,address FROM locations WHERE login=? AND cname =?");
        $stmtLocation->bind_param("ss", $inData["login"], $inData["cname"]);
        $stmtLocation->execute();
        $resultLocation = $stmt->get_result();

        $stmtPhone = $conn->prepare("SELECT cname,number FROM phones WHERE login=? AND cname =?");
        $stmtPhone->bind_param("ss", $inData["login"], $inData["cname"]);
        $stmtPhone->execute();
        $resultPhone = $stmt->get_result();


        if( $rowEmail = $resultEmail->fetch_assoc() && $rowLocation = $resultLocation->fetch_assoc() && $rowPhone = $resultPhone->fetch_assoc()  )
        {
            returnWithInfo( $rowEmail['cname'], $rowEmail['address'], $rowLocation['address'], $rowPhone['address']);
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

    function returnWithInfo( $cname, $email, $location, $phone)
    {
        $retValue = '{"cname":"' . $cname . '","eaddress":"' . $email . '","laddress":"' . $location . '","paddress":"' . $phone . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>