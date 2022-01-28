function setMessage(formElement, message) {
    const messageElement = formElement.querySelector(".message");

    messageElement.textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {

    /* Submitting log in form */
    login.addEventListener("submit", e => {
        e.preventDefault();
        /* Fetch log in stuff here */

        /* If log in failed */
        setMessage(login, "Incorrect username or password.")
    });

});

function showAddForm() {
    var element = document.getElementById("addContact");
    element.classList.remove("d-none");
}

function hideAddForm() {
    var element = document.getElementById("addContact");
    element.classList.add("d-none");
}