<?php
	$inData = getRequestInfo();

    $opperation = $inData["field"];
	$cname = $inData["cname"];
	$login = $inData["login"];
    $identifier - $inData["identifier"];

	$conn = new mysqli("localhost", "Admin", "Admin", "yellabook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM contacts WHERE login=? AND cname =?");
		$stmt->bind_param("ss", $inData["login"], $inData["cname"]);
		$stmt->execute();
		$result = $stmt->get_result();
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