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
		event.preventDefault();
		return;
	}
	if (lastName === "") {
		form.classList.add("was-validated");
		document.getElementById("invalidlName").innerHTML = "This field is required";
		event.preventDefault();
		return;
	}
	if (login.length < 5) {
		form.classList.add("was-validated");
		document.getElementById("invalidUser").innerHTML = "Username must be at least 5 characters";
		event.preventDefault();
		return;
	}
	
	if (login.match(/\W/)) {
		form.classList.add("was-validated");
		document.getElementById("invalidUser").innerHTML = "Username cannot contain symbols such as %, &, @, etc.";
		event.preventDefault();
		return;
	}
	
	
	if (password.length < 8) {
		form.classList.add("was-validated");
		document.getElementById("invalidPass").innerHTML = "Password must be at least 8 characters";
		event.preventDefault();
		return;
	}

	if (password !== confirmPassword) {
		form.classList.add("was-validated");
		document.getElementById("invalidMatch").innerHTML = "Password must match";
		event.preventDefault();
		return;
	}
}

function addContact() {

	const firstName = document.getElementById("contactfName").value.trim();
	const lastName = document.getElementById("contactlName").value.trim();
	const number = parseInt(document.getElementById("phoneNumber").value.trim());
	const numberType = document.getElementById("ptype").value.trim();
	const location = document.getElementById("location").value.trim();
	const locationType = document.getElementById("ltype").value.trim();
	const email = document.getElementById("eaddress").value.trim();
	const emailType = document.getElementById("etype").value.trim();
	const contactForm = document.getElementById("addContactForm");

	if (firstName === "" && lastName === "") {
		contactForm.classList.add("was-validated");
		event.preventDefault();
		return;
	}
	
	const jsonPayload = JSON.stringify({
		cname: firstName + " " + lastName,
		login: username,
		number: number,
		ptype: numberType,
		etype: emailType,
		eaddress: email,
  		ltype: locationType,
		laddress: location,
	});

	const url = urlBase + "/NewContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
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

function getContacts(field, look) {
	const jsonPayload = JSON.stringify({
		login: username,
		field: field,
		look: look,
	});

	const url = urlBase + "/SearchContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				console.log(jsonObject);
				error = jsonObject.error;

				if (error != "") {
					document.getElementById("contactList").innerHTML = `<tr>
						<td class="py-3 fs-1 btn btn-alt btn-outline-dark w-100 rounded-0">${error}</td>
					</tr>
					`;
					return;
				}
				console.log(jsonObject.results);
				document.getElementById("contactList").innerHTML = jsonObject.results.map(function (contact) {
					return `<tr>
						<td class="py-3 fs-1 btn btn-alt btn-outline-dark w-100 rounded-0">${contact}</td>
					</tr>
					`;
				});
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("contactList").innerHTML = err.message;
	}
}