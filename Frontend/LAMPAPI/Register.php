<?php
	$inData = getRequestInfo();

    $Login = $inData["Login"];
    $Password = $inData["Password"];
	$Firstname = $inData["Firstname"];
	$Lastname = $inData["Lastname"];

	$conn = new mysqli("localhost", "Admin", "Admin", "ContactManager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Users (Firstname, Lastname, Login, Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $Firstname, $Lastname, $Login, $Password);
		$stmt->execute();
		$stmt->close();
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