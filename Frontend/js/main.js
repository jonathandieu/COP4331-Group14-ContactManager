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
					login.classList.add("is-invalid");
					password.classList.add("is-invalid");
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

function validateForm (form, validSymbols, firstName, lastName, login, password, confirmPassword) {
	if (firstName === "") {
		form.classList.add("was-validated");
		document.getElementById("invalidfName").innerHTML = "This field is required";
	}
	if (lastName === "") {
		form.classList.add("was-validated");
		document.getElementById("invalidlName").innerHTML = "This field is required";
	}
	if (login.length < 5) {
		form.classList.add("was-validated");
		document.getElementById("invalidUser").innerHTML = "Username must be at least 5 characters";
	}
	
	if (login.match(/\W/)) {
		form.classList.add("was-validated");
		document.getElementById("invalidUser").innerHTML = "Username cannot contain symbols such as %, &, @, etc.";
	}
	
	
	if (password.length < 8) {
		form.classList.add("was-validated");
		document.getElementById("invalidPass").innerHTML = "Password must be at least 8 characters";
	}

	if (password !== confirmPassword) {
		form.classList.add("was-validated");
		document.getElementById("invalidMatch").innerHTML = "Password must match";
	}
}

function handleRegister() {
	fullName = "";
	username = "";
	var i = 0;

	const form = document.getElementById("registerForm");
	const validSymbols = /^[A-Za-z0=9]+/;
	const firstName = document.getElementById("firstName").value.trim();
	const lastName = document.getElementById("lastName").value.trim();
	const login = document.getElementById("username").value.trim().toLowerCase();
	const password = document.getElementById("password").value.trim();
	const confirmPassword = document
		.getElementById("confirmPassword")
		.value.trim();

	validateForm(form, validSymbols, firstName, lastName, login, password, confirmPassword);

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
}

function setMessage(formElement, message) {
	const messageElement = formElement.querySelector(".message");

	messageElement.textContent = message;
}
