const urlBase = 'http://yellabook.me/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function handleLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    document.getElementById("errorMessage").innerHTML = "";

    const jsonPayload = JSON.stringify({
        Login: login,
        Password: password
    });

	const url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("errorMessage").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("errorMessage").innerHTML = err.message;
	}    
}

function saveCookie() {
	let minutes = 60;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();    
}

function setMessage(formElement, message) {
    const messageElement = formElement.querySelector(".message");

    messageElement.textContent = message;
}