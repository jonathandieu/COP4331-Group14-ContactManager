<?php
    // login required, old contact name also required in case of name change
    $inData = getRequestInfo();
	$login = $inData["login"];
    $oldcname = $inData["oldcname"];

    // optional
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
        // nothing required other than login
        // should update any field that has been changed

        // contact name
        $stmt = $conn->prepare("UPDATE contacts SET cname=? WHERE login=? AND cname=?");
        $stmt->bind_param("sss", $cname, $login, $oldcname);
		$stmt->execute();
        $stmt->close();

        // email
        if (strcmp($etype,"") == 0)
            $etype = "Home";
        $stmt = $conn->prepare("UPDATE emails SET address=?, type=? WHERE login=? AND cname=?");
        $stmt->bind_param("ssss", $eaddress, $etype, $login, $cname);
        $stmt->execute();
        $stmt->close();

        // phone
        if (strcmp($ptype,"") == 0)
            $ptype = "Home";
        $stmt = $conn->prepare("UPDATE phones SET number=?, type=? WHERE login=? AND cname=?");
        $stmt->bind_param("ssss", $paddress, $ptype, $login, $cname);
        $stmt->execute();
        $stmt->close();

        // locations
        if (strcmp($ltype,"") == 0)
            $ltype = "Home";
        $stmt = $conn->prepare("UPDATE loctions SET address=?, type=? WHERE login=? AND cname=?");
        $stmt->bind_param("ssss", $laddress, $ltype, $login, $cname);
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