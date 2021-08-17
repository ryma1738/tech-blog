
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
        if (data.ok) {
            console.log('User logged in.')
        } else  {
            alert(data.statusText)
        }
    } else {
        alert('You must enter in your username and password to login!');
    }
}

async function signup() {
    const username = $('#usernameSignup').val();
    const password = $('#passwordSignup').val();
    const confirmPass = $('#passwordSignupConfirm').val();

    if (username && password && confirmPass) {
        if (password === confirmPass) {
            const response = await fetch('/api/user/signup', {
                method: 'post',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
        } else {
            const confirm = $('#passwordSignupConfirm')
            alert('Your passwords do not match!')
        }
    } else {
        console.log('did not find all values')
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