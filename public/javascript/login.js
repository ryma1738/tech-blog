const { response } = require("express");

async function login() {
    const username = $('#usernameLogin').val();
    const password = $('#passwordLogin').val();

    if (username && password) {
        const data = await fetch('/api/user/login',  {
            method: 'post',
            body: JSON.stringify({
                username,
                password
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

function signup() {
    console.log('Worked')
    const username = $('#usernameSignup').val();
    const password = $('#passwordSignup').val();
    const confirmPass = $('#passwordSignupConfirm').val();

    if (username && password && confirmPass) {
        if (password === confirmPass) {

        } else {
            const confirm = $('#passwordSignupConfirm')
            confirm.setCustomValidity('Your passwords do not match!')
            alert('Your passwords do not match!')
        }
    }
}

$('#login').submit( function(event) {
    login();
    event.preventDefault();
});

$('#signup').submit(function(event) {
    event.preventDefault();
    signup();
    
});