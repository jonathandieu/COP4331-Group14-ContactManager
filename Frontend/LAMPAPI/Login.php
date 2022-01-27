
<?php

	$inData = getRequestInfo();

	$id = 50;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli("localhost", "Admin", "Admin", "yellabook"); // Instantiate mysqli object named $conn

	// If the connect_error field exists, we pass it into returnWithError() to be turned into JSON
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT login,first_name,lastName FROM Users WHERE login=? AND password =?"); // Call the prepare() method
		$stmt->bind_param("ss", $inData["login"], $inData["password"]); // "ss" means that $inData is bound as a string
		$stmt->execute(); // Executes the SQL statement
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['login'] );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}'; // Returns only the error with everything else empty
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $login )
	{
		$retValue = '{"login":' . $login . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}'; // Returns info with no error.
		sendResultInfoAsJson( $retValue );
	}

?>
