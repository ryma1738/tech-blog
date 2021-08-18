async function login() {
    const username = $('#usernameLogin').val();
    const password = $('#passwordLogin').val();

    if (username && password) {
        const data = await fetch('/api/user/login',  {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password
              }),
              headers: { 'Content-Type': 'application/json' }
        });
        if (!data.ok) {
            alert("User Note Found!")
        } else { 
            window.location.replace('/');
        }
    } else {
        alert('You must enter in your username and password to login!');
    }
}

async function signup() {
    const username = $('#usernameSignup').val();
    const password = $('#passwordSignup').val();
    const confirmPass = $('#passwordSignupConfirm').val();

    if (password === confirmPass) {
        const response = await fetch('/api/user/signup', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (!response.ok) {
            alert('A user with that username already exists! Please enter different username or login!')
        } else {
            window.location.replace('/');
        }
    } else {
        alert('Your passwords do not match!')
    }

}

$('#login').submit(function(event) {
    event.preventDefault();
    login();
});

$('#signup').submit(function(event) {
    event.preventDefault();
    signup();
});