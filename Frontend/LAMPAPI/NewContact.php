<?php
	$inData = getRequestInfo();
	$login = $inData["login"];
	$cname = $inData["cname"];

    $etype = $inData["etype"];
    $eaddress = $inData["eaddress"];

    $ptype = $inData["ptype"];
    $paddress = $inData["number"];

    $ltype = $inData["ltype"];
    $laddress = $inData["laddress"];

	$conn = new mysqli("localhost", "Admin", "Admin", "yellabook");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into contacts (login,cname) VALUES(?,?)");
		$stmt->bind_param("ss", $login, $cname);
		$stmt->execute();
        $stmt->close();


		// Emails
		//length
        if (strlen($eaddress) > 0)
        {
			if (strcmp($etype,"") == 0)
				$etype = "Home";
            $stmt = $conn->prepare("INSERT into emails (login,cname,type,address) VALUES(?,?,?,?)");
            $stmt->bind_param("ssss", $login, $cname, $etype, $eaddress);
	    	$stmt->execute();
	    	$stmt->close();
			$ret = $eaddress;
        }

    	// Phones
        if (($paddress) > 0)
        {
			if (strcmp($ptype,"") == 0)
				$ptype = "Home";
            $stmt = $conn->prepare("INSERT into phones (login,cname,type,number) VALUES(?,?,?,?)");
            $stmt->bind_param("ssss", $login, $cname, $ptype, $paddress);
	        $stmt->execute();
	        $stmt->close();
        }

        // Locations
        if (strlen($laddress) > 0)
        {
			if (strlen($ltype) == 0)
				$ltype = "Home";
            $stmt = $conn->prepare("INSERT into locations (login,cname,type,address) VALUES(?,?,?,?)");
            $stmt->bind_param("ssss", $login, $cname, $ltype, $laddress);
	    	$stmt->execute();
	    	$stmt->close();
        }

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