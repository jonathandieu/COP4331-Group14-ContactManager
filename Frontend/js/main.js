const urlBase = "http://yellabook.me/LAMPAPI";
const extension = "php";

let fullName = "";
let username = "";

function handleLogin() {
	fullName = "";
	username = "";

	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	document.getElementById("errorMessage").innerHTML = "";

	const jsonPayload = JSON.stringify({
		login: login,
		password: password,
	});

	const url = urlBase + "/Login." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				error = jsonObject.error;

				if (error != "") {
					document.getElementById("errorMessage").innerHTML =
						"User/Password combination incorrect";
					return;
				}

				fullName = jsonObject.name;
				username = jsonObject.login;

				saveCookie();

				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("errorMessage").innerHTML = err.message;
	}
}

function addContact() {

	const firstName = document.getElementById("contactfName").value.trim();
	const lastName = document.getElementById("contactlName").value.trim();
	const number = parseInt(document.getElementById("phoneNumber").value.trim());
	const location = document.getElementById("location").value.trim();
	const email = document.getElementById("eaddress").value.trim();

	if (firstName === "" && lastName === "") {
		document.getElementById("addContactResult").innerHTML = "First and last name is empty";
		event.preventDefault();
		return;
	}
	
	const jsonPayload = JSON.stringify({
		cname: firstName + " " + lastName,
		login: username,
		number: number,
		etype: "",
		eaddress: email,
  		ltype: "",
		laddress: location,
	});

	console.log(jsonPayload);

	const url = urlBase + "/NewContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
			console.log(jsonObject);
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addContactResult").innerHTML = "Success";
				console.log("success");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addContactResult").innerHTML = err.message;
		console.log("error");
	}
	
}

function handleRegister() {
	fullName = "";
	username = "";

	const firstName = document.getElementById("firstName").value.trim();
	const lastName = document.getElementById("lastName").value.trim();
	const login = document.getElementById("username").value.trim().toLowerCase();
	const password = document.getElementById("password").value.trim();
	const confirmPassword = document
		.getElementById("confirmPassword")
		.value.trim();

	if (
		firstName === "" ||
		lastName === "" ||
		login === "" ||
		password === "" ||
		confirmPassword === ""
	) {
		document.getElementById("errorMessage").innerHTML =
			"One or more fields are empty";
		return;
	}

	if (password !== confirmPassword) {
		document.getElementById("errorMessage").innerHTML =
			"Passwords do not match";
		return;
	}

	const jsonPayload = JSON.stringify({
		name: firstName + " " + lastName,
		login: login,
		password: password,
	});

	const url = urlBase + "/Register." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				error = jsonObject.error;

				if (error != "") {
					document.getElementById("errorMessage").innerHTML =
						"An error has occured. Try again.";
					return;
				}

				fullName = jsonObject.name;
				username = jsonObject.login;

				saveCookie();

				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("errorMessage").innerHTML = err.message;
	}
}

function showAddForm() {
    var element = document.getElementById("addContact");
    element.classList.remove("d-none");
}

function hideAddForm() {
    var element = document.getElementById("addContact");
    element.classList.add("d-none");
}

function saveCookie() {
	let minutes = 60;
	let date = new Date();
	date.setTime(date.getTime() + minutes * 60 * 1000);
	document.cookie = "fullName=" + fullName + ";expires=" + date.toGMTString();
	document.cookie = "login=" + username + ";expires=" + date.toGMTString();
}

function readCookie() {
	fullName = "";
	username = "";
	//fullName = "John Smith";
	//username = "jsmithyboy123";

	const cookie = document.cookie;
	const splits = cookie.split(";");

	for (let i = 0; i < splits.length; i++) {
		const pair = splits[i].trim();
		const values = pair.split("=");
		if (values[0] == "fullName") {
			fullName = values[1];
		} else if (values[0] == "login") {
			username = values[1];
		}
	}

	if (fullName === "" || username == "") {
		window.location.href = "index.html";
	}

	document.getElementById("fullname").innerHTML = fullName;
}