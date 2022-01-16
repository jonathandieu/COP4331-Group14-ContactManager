function setMessage(formElement, message) {
    const messageElement = formElement.querySelector(".message");

    messageElement.textContent = message;
}

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#titleContainer");
    const loginForm = document.querySelector("#loginContainer");
    const container = document.querySelector("#container");
    const registerForm = document.querySelector("#registerContainer")

    /* If the user clicks on the sign up button */
    document.querySelector("#register-link").addEventListener("click", e => {
        e.preventDefault();
        title.classList.add("hidden");
        loginForm.classList.add("hidden");
        container.classList.add("change-width");
        registerForm.classList.remove("hidden");
    })

    /* If the user wants to go back to the log in page */
    document.querySelector("#login-link").addEventListener("click", e => {
        e.preventDefault();
        title.classList.remove("hidden");
        loginForm.classList.remove("hidden");
        container.classList.remove("change-width");
        registerForm.classList.add("hidden");
    })

    /* Submitting log in form */
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        /* Fetch log in stuff here */

        /* If log in failed */
        setMessage(loginForm, "Incorrect username or password.")
    });

});