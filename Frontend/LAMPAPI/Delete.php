<?php
	$inData = getRequestInfo();

    $opperation = $inData["field"];
	$cname = $inData["cname"];
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
                $stmt = $conn->prepare("DELETE FROM contacts WHERE login=? AND cname =?");
                $stmt->bind_param("ss", $inData["login"], $inData["cname"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
            case 1;
                $stmt = $conn->prepare("DELETE FROM emails WHERE login=? AND cname =?");
                $stmt->bind_param("ss", $inData["login"], $inData["cname"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
            case 2;
                $stmt = $conn->prepare("DELETE FROM phones WHERE login=? AND cname =?");
                $stmt->bind_param("ss", $inData["login"], $inData["cname"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
            case 3;
                $stmt = $conn->prepare("DELETE FROM locations WHERE login=? AND cname =?");
                $stmt->bind_param("ss", $inData["login"], $inData["cname"]);
                $stmt->execute();
                $result = $stmt->get_result();
                $stmt->close();
                break;
        }

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

?>