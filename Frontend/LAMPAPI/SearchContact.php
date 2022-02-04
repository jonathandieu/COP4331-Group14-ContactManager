<?php
	$inData = getRequestInfo();

    $opperation = $inData["field"];
	$look = $inData["look"];
	$login = $inData["login"];

	$conn = new mysqli("localhost", "Admin", "Admin", "yellabook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        switch ($opperation) 
        {
            case 0;
                $stmt = $conn->prepare("SELECT cname FROM contacts WHERE login=? AND cname=?");
                $stmt->bind_param("ss", $inData["login"], $inData["look"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
            case 1;
                $stmt = $conn->prepare("SELECT cname FROM emails WHERE login=? AND address=?");
                $stmt->bind_param("ss", $inData["login"], $inData["look"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
            case 2;
                $stmt = $conn->prepare("SELECT cname FROM phones WHERE login=? AND number =?");
                $stmt->bind_param("si", $inData["login"], $inData["look"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
            case 3;
                $stmt = $conn->prepare("SELECT cname FROM locations WHERE login=? AND address =?");
                $stmt->bind_param("ss", $inData["login"], $inData["look"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
        }
		returnWithInfo( $row['cname']);

        returnWithError("");
		
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $cname)
	{
		$retValue = '{"cname":"' . $cname . '","error":""}';
		sendResultInfoAsJson( $retValue );
    }
?>