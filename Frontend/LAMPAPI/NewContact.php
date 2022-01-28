<?php
	$inData = getRequestInfo();

	$login = $inData["login"];
	$cname = $inData["cname"];

    $etype = $inData["type"];
    $eadress = $inData["adress"];

    $ptype = $inData["type"];
    $paddress = $inData["address"];

    $ltype = $inData["type"];
    $ladress = $inData["adress"];

	$conn = new mysqli("localhost", "Admin", "Admin", "yellabook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into contacts (login,name) VALUES(?,?)");
		$stmt->bind_param("ss", $login, $name);
		$stmt->execute();
		$stmt->close();

        // Big Brain Shit

		
		$conn->close();
		returnWithError("");
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