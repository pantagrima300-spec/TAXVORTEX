const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (email.value === "" || password.value === "") {
    error.innerText = "All fields are required!";
  } else if (password.value.length < 6) {
    error.innerText = "Password must be at least 6 characters";
  } else {
    error.style.color = "green";
    error.innerText = "Login Successful!";
  }
});
