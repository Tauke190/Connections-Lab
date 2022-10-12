
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    
    let url = '/login?username='+username+'&password='+password;

    console.log("Login request sent");

     //Request random pizza object
     fetch(url)
     .then(response => response.json())
     .then(data => {
        console.log(data);
        if(data["logged"] == "true")
        {
            alert("Welcome to the metaverse")
        }
     });
})