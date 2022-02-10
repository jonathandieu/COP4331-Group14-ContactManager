const urlBase = "http://yellabook.me/LAMPAPI";
const extension = "php";

let fullName = "";
let username = "";

function handleLogin() {
	fullName = "";
	username = "";

	let login = document.getElementById("loginUsername").value;
	let password = document.getElementById("loginPassword").value;

	const loginInput = document.getElementById("loginUsername");
	const passInput = document.getElementById("loginPassword");

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

				if (error != "" || (login === "" && password === "")) {
					document.getElementById("errorMessage").innerHTML =
						"User/Password combination incorrect";
					loginInput.classList.add("is-invalid");
					passInput.classList.add("is-invalid");
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

	let flag = 0;

	if (firstName === "") {
		form.classList.add("was-validated");
		document.getElementById("invalidfName").innerHTML = "This field is required";
		flag = 1;
	}
	if (lastName === "") {
		form.classList.add("was-validated");
		document.getElementById("invalidlName").innerHTML = "This field is required";
		flag = 1;
	}
	if (login.length < 5) {
		form.classList.add("was-validated");
		document.getElementById("invalidUser").innerHTML = "Username must be at least 5 characters";
		flag = 1;
	}

	if (login.match(/\W/)) {
		form.classList.add("was-validated");
		document.getElementById("invalidUser").innerHTML = "Username cannot contain symbols such as %, &, @, etc.";
		flag = 1;
	}

	if (password.length < 8) {
		form.classList.add("was-validated");
		document.getElementById("invalidPass").innerHTML = "Password must be at least 8 characters";
		flag = 1;
	}

	if (password !== confirmPassword) {
		form.classList.add("was-validated");
		document.getElementById("invalidMatch").innerHTML = "Password must match";
		flag = 1;
	}
	return flag;
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

	console.log(jsonPayload);

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
				window.location.reload();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addContactResult").innerHTML = err.message;
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

	const result = validateForm(form, validSymbols, firstName, lastName, login, password, confirmPassword);
	if (result == 1) {
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
	document.getElementById("editContact").classList.add("d-none");
	document.getElementById("contactInfo").classList.add("d-none");
}

function hideAddForm() {
    var element = document.getElementById("addContact");
    element.classList.add("d-none");
}

function showEditForm() {
    var element = document.getElementById("editContact");
    element.classList.remove("d-none");
	document.getElementById("addContact").classList.add("d-none");
	document.getElementById("contactInfo").classList.add("d-none");

	document.getElementById("contactNameEdit").value = document.getElementById("contactName").innerHTML;
	document.getElementById("phoneNumberEdit").value = document.getElementById("contactPhone").innerHTML;
	document.getElementById("ptypeEdit").value = document.getElementById("contactPhoneType").innerHTML;
	document.getElementById("eaddressEdit").value = document.getElementById("contactEmail").innerHTML;
	document.getElementById("etypeEdit").value = document.getElementById("contactEmailType").innerHTML;
	document.getElementById("locationEdit").value = document.getElementById("contactAddress").innerHTML;
	document.getElementById("ltypeEdit").value = document.getElementById("contactAddressType").innerHTML;
}

function hideEditForm() {
    var element = document.getElementById("editContact");
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

function deleteCookie() {
	// Set the value of expires to a date that's already passed.
	document.cookie = "fullName= ;expires= Thu, 01 Jan 1969 00:00:00 GMT";
	document.cookie = "login= ;expires= Thu, 01 Jan 1969 00:00:00 GMT";

}

function setMessage(formElement, message) {
	const messageElement = formElement.querySelector(".message");

	messageElement.textContent = message;
}

function handleLogout() {
	deleteCookie();
	window.location.href = "index.html";
}
function getContacts(field, look) {
	const jsonPayload = JSON.stringify({
		login: username,
		field: field,
		look: "%" + look + "%",
	});


	const url = urlBase + "/SearchContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				error = jsonObject.error;

				if (error != "") {
					document.getElementById("contactList").innerHTML = `<span class="py-3 fs-1 btn btn-alt btn-outline-dark w-100 rounded-0">${error}</span>`;
					return;
				}
				document.getElementById("contactList").innerHTML = jsonObject.results.map(function (contact) {
					return `<span class="py-3 fs-1 btn btn-alt btn-outline-dark w-100 rounded-0" onclick="getContact(this.innerHTML);">${contact}</span>`;
				}).join('');
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("contactList").innerHTML = err.message;
	}
}

function getContact(contact) {
	const jsonPayload = JSON.stringify({
		login: username,
		cname: contact
	});

	const url = urlBase + "/GetContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				error = jsonObject.error;

				if (error != "") {
					return;
				}

				document.getElementById("contactInfo").classList.remove("d-none");
				document.getElementById("addContact").classList.add("d-none");
				document.getElementById("editContact").classList.add("d-none");

				document.getElementById("contactName").innerHTML = jsonObject.cname;

				if (jsonObject.number === undefined || jsonObject.number === null || jsonObject.number.trim() === "") {
					document.getElementById("contactPhone").classList.add("d-none");
					document.getElementById("contactPhoneLabel").classList.add("d-none");
				} else {
					document.getElementById("contactPhone").innerHTML = jsonObject.number;
					document.getElementById("contactPhone").classList.remove("d-none");
					document.getElementById("contactPhoneLabel").classList.remove("d-none");
				}

				if (jsonObject.ptype === undefined || jsonObject.ptype === null || jsonObject.ptype.trim() === "") {
					document.getElementById("contactPhoneType").classList.add("d-none");
					document.getElementById("contactPhoneTypeLabel").classList.add("d-none");
				} else {
					document.getElementById("contactPhoneType").innerHTML = jsonObject.ptype;
					document.getElementById("contactPhoneType").classList.remove("d-none");
					document.getElementById("contactPhoneTypeLabel").classList.remove("d-none");
				}

				if (jsonObject.eaddress === undefined || jsonObject.eaddress === null || jsonObject.eaddress.trim() === "") {
					document.getElementById("contactEmail").classList.add("invisible");
					document.getElementById("contactEmailLabel").classList.add("invisible");
				} else {
					document.getElementById("contactEmail").innerHTML = jsonObject.eaddress;
					document.getElementById("contactEmail").classList.remove("invisible");
					document.getElementById("contactEmailLabel").classList.remove("invisible");
				}

				if (jsonObject.etype === undefined || jsonObject.etype === null || jsonObject.etype.trim() === "") {
					document.getElementById("contactEmailType").classList.add("invisible");
					document.getElementById("contactEmailTypeLabel").classList.add("invisible");
				} else {
					document.getElementById("contactEmailType").innerHTML = jsonObject.etype;
					document.getElementById("contactEmailType").classList.remove("invisible");
					document.getElementById("contactEmailTypeLabel").classList.remove("invisible");
				}

				if (jsonObject.laddress === undefined || jsonObject.laddress === null || jsonObject.laddress.trim() === "") {
					document.getElementById("contactAddress").classList.add("invisible");
					document.getElementById("contactAddressLabel").classList.add("invisible");
				} else {
					document.getElementById("contactAddress").innerHTML = jsonObject.laddress;
					document.getElementById("contactAddress").classList.remove("invisible");
					document.getElementById("contactAddressLabel").classList.remove("invisible");
				}

				if (jsonObject.ltype === undefined || jsonObject.ltype === null || jsonObject.ltype.trim() === "") {
					document.getElementById("contactAddressType").classList.add("invisible");
					document.getElementById("contactAddressTypeLabel").classList.add("invisible");
				} else {
					document.getElementById("contactAddressType").innerHTML = jsonObject.ltype;
					document.getElementById("contactAddressType").classList.remove("invisible");
					document.getElementById("contactAddressTypeLabel").classList.remove("invisible");
				}
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		// Error Handling
	}
}

function deleteContact() {

	if (window.confirm("Are you sure you want to delete this contact?")) {
		const name = document.getElementById("contactName").innerHTML.trim();

		const jsonPayload = JSON.stringify({
			field: 0,
			cname: name,
			login: username,
		});

		const url = urlBase + "/Delete." + extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		try {
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					let jsonObject = JSON.parse(xhr.responseText);
					error = jsonObject.error;

					if (error != "") {
						document.getElementById("deleteResult").innerHTML =
							"An error has occured. Try again.";
						return;
					}
				}

				document.getElementById("contactInfo").classList.add("d-none");
				window.location.reload();
			};
			xhr.send(jsonPayload);
		} catch (err) {
			document.getElementById("deleteResult").innerHTML = err.message;
		}
	}
}

function updateContact() {

	const oldname = document.getElementById("contactName").innerHTML.trim();

	const newName = document.getElementById("contactNameEdit").value.trim();
	const ptype = document.getElementById("ptypeEdit").value.trim();
	const eaddress = document.getElementById("eaddressEdit").value.trim();
	const etype = document.getElementById("etypeEdit").value.trim();
	const number = document.getElementById("phoneNumberEdit").value.trim();
	const ltype = document.getElementById("ltypeEdit").value.trim();
	const location = document.getElementById("locationEdit").value.trim();

	const jsonPayload = JSON.stringify({
		login: username,
		oldcname: oldname,
		cname: newName,
		etype: etype,
		eaddress: eaddress,
		ptype: ptype,
		number: number,
		ltype: ltype,
		laddress: location,
	});

	const url = urlBase + "/UpdateContact." + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				error = jsonObject.error;

				if (error != "") {
					document.getElementById("editContactResult").innerHTML =
						"An error has occured. Try again.";
					return;
				}
			}

			window.location.reload();
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("editContactResult").innerHTML = err.message;
	}
}
